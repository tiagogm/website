import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import { Layout } from "@/components/layout/Layout";
import blogService, { IBlogArticle } from "@/services/blogService";
import { markdownUtils } from "@/utils/markdown";
import { DateUtils } from "@/utils/date";

interface INotesPageProps extends IBlogArticle {}

/**
 * dangerouslySetInnerHTML is not ideal, improve later
 */
const RenderMarkdown: React.FC<{ content: string }> = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: markdownUtils.parseToHTML(content) }}></div>;
};

const NotesPage: React.FC<INotesPageProps> = ({ slug, title, body, publishDate }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return (
      <Layout space={0}>
        <p>Looking for those notes...</p>
      </Layout>
    );
  }

  if (!slug) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  return (
    <Layout space={0}>
      <Layout.Title space={8}>{title}</Layout.Title>
      <Layout.Subtitle space={40}>{DateUtils.IsoToStr(publishDate)}</Layout.Subtitle>
      <Layout.Main>
        <RenderMarkdown content={body} />
      </Layout.Main>
      <Layout.LinkBack to="/notes" />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<INotesPageProps> = async ({ params, preview }) => {
  const { slug } = params;
  const article = await blogService.fetchArticleBySlug(slug as string, preview);
  return {
    props: {
      ...article,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await blogService.fetchArticles();
  const paths = articles.map(({ slug }) => `/notes/${slug}`);

  return {
    paths,
    fallback: true,
  };
};

export default NotesPage;
