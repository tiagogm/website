import { Layout } from "../components/layout/Layout";
import blogService, { IBlogArticle } from "../services/blogService";
import { GetStaticProps } from "next";
import { LinkRainbow } from "../components/layout/LinkRainbow";
import { DateUtils } from "../utils/date";
import { logService } from "../services/logService";

interface IBlogPageProps {
  articles: IBlogArticle[];
}

interface IBlogArticleProps extends IBlogArticle {
  source?: string;
}

const ArticleLink: React.FC<IBlogArticleProps> = ({ slug, title, publishDate, externalSource, externalLink }) => (
  <div key={slug} className="article-link">
    <h4>
      <LinkRainbow to={externalLink || `notes/${slug}`}>
        <span className="article-link__date">{DateUtils.IsoToStr(publishDate)}</span>
        {externalSource && (
          <span className="article-link__source">
            <b>{externalSource} //</b>
          </span>
        )}
        <span className="article-link__title">{title}</span>
      </LinkRainbow>
    </h4>
    <style jsx>{`
      .article-link__date {
        width: 120px;
        display: inline-block;
        color: #c0c0c0;
      }
      .article-link__source {
        margin-right: 0.5rem;
      }
    `}</style>
  </div>
);

const BlogPage: React.FC<IBlogPageProps> = ({ articles }) => (
  <Layout>
    <Layout.Title space={64}>Notes</Layout.Title>
    <Layout.Main space={128}>{articles.map(ArticleLink)}</Layout.Main>
    <Layout.LinkBack to="/" />
  </Layout>
);

export const getStaticProps: GetStaticProps<IBlogPageProps> = async ({ preview }) => {
  const articles = await blogService.fetchArticles(preview);

  logService.log(`Blog.getStaticProps - Fetched articles| preview: ${preview} | items: ${articles?.length}`);
  return {
    props: {
      articles,
    },
  };
};

export default BlogPage;
