import { Layout } from "../components/layout/Layout";
import blogService, { IBlogArticle } from "../services/blogService";
import { GetStaticProps } from "next";
import { LinkRainbow } from "../components/layout/LinkRainbow";
import { DateUtils } from "../utils/date";
import { Spacer } from "../components/layout/Spacer";

interface IBlogPageProps {
  articles: IBlogArticle[];
}

const ArticleLink: React.FC<IBlogArticle> = ({ slug, title, publishDate }) => (
  <div key={slug} className="article-link">
    <h4>
      <LinkRainbow to={`blog/${slug}`}>
        <span className="article-link__date">{DateUtils.IsoToStr(publishDate)}</span>
        <span className="article-link__title">{title}</span>
      </LinkRainbow>
    </h4>
    <style jsx>{`
      .article-link__date {
        width: 120px;
        display: inline-block;
        color: #c0c0c0;
      }
    `}</style>
  </div>
);

const BlogPage = ({ articles }) => (
  <Layout>
    <Layout.Title space={64}>Articles</Layout.Title>
    <Layout.Main space={128}>{articles.map(ArticleLink)}</Layout.Main>
    <Layout.LinkBack to="/" />
  </Layout>
);

export const getStaticProps: GetStaticProps<IBlogPageProps> = async ({ params, preview, previewData }) => {
  const articles = await blogService.getArticles(preview);

  return {
    props: {
      articles,
    },
  };
};

export default BlogPage;
