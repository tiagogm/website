import { Layout } from "../../components/layout/Layout";
import { GetStaticProps, GetStaticPaths } from "next";
import blogService, { IBlogArticle } from "../../services/blogService";
import { markdownUtils } from "../../utils/markdown";
import { DateUtils } from "../../utils/date";

interface IBlogPageProps extends IBlogArticle {}

/**
 * dangerouslySetInnerHTML is not ideal, improve later
 */
const RenderMarkdown: React.FC<{ content: string }> = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: markdownUtils.parseToHTML(content) }}></div>;
};

const BlogPage: React.FC<IBlogPageProps> = ({ slug, title, body, publishDate }) => {
  return (
    <Layout space={0}>
      <Layout.Title space={8}>{title}</Layout.Title>
      <Layout.Subtitle space={40}>{DateUtils.IsoToStr(publishDate)}</Layout.Subtitle>
      <Layout.Main>
        <RenderMarkdown content={body} />
      </Layout.Main>
      <Layout.LinkBack to="/blog" />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<IBlogPageProps> = async ({ params, preview }) => {
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
  const paths = articles.map(({ slug }) => `/blog/${slug}`);

  return {
    paths,
    fallback: false,
  };
};

export default BlogPage;
