import { logService } from "./logService";
import { fetchEntries, fetchEntryBySlug } from "./contentService";

export interface IBlogArticle {
  title: string;
  slug: string;
  body: string;
  description: string;
  publishDate: string;
}

const BlogContentType = "blogPost";
const BlogOrderField = "-fields.publishDate";

/**
 * Fetch Articles
 *
 * It would be nicer to use a graphQL api to optimize the payload size returned,
 * but it's not available for free tier :(
 */
const fetchArticles = async (preview?: boolean): Promise<IBlogArticle[]> => {
  const response = await fetchEntries<IBlogArticle>(preview, BlogContentType, BlogOrderField);
  if (!response.success) {
    logService.log(`blogService.fetchArticles - Failed to fetch - ${response.error?.message}`);
    return [];
  }

  return response.data;
};

/**
 * Fetch single article by slug
 * @param slug
 * @param preview
 */
const fetchArticleBySlug = async (slug: string, preview?: boolean): Promise<IBlogArticle> => {
  const response = await fetchEntryBySlug<IBlogArticle>(preview, BlogContentType, slug);
  if (!response.success) {
    logService.log(`blogService.fetchArticleBySlug - Failed to fetch - ${response.error?.message}`);
    return null;
  }

  return response.data;
};

export default {
  fetchArticles,
  fetchArticleBySlug,
};
