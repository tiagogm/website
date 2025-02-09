import { LinkRainbow } from "@/components/layout/LinkRainbow";
import { IBlogArticle } from "@/services/blogService";
import { DateUtils } from "@/utils/date";
import styles from "./ArticleLink.module.scss";

interface IBlogArticleProps extends IBlogArticle {
  source?: string;
}

export function ArticleLink(article: IBlogArticleProps) {
  return (
    <div className="article-link">
      <h4>
        <LinkRainbow to={article.externalLink || `notes/${article.slug}`}>
          <span className={styles.articlelink__date}>{DateUtils.IsoToStr(article.publishDate)}</span>
          {article.externalSource && (
            <span className={styles.articlelink__source}>
              <b>{article.externalSource} //</b>
            </span>
          )}
          <span className="article-link__title">{article.title}</span>
        </LinkRainbow>
      </h4>
    </div>
  );
}
