import fetch from "isomorphic-unfetch";
import config from "../config";
import urljoin from "urljoin";
import { logService } from "./logService";

/**
 * @see https://app.contentful.com/spaces/xxx/content_types/blogPost/fields
 */
export interface IBlogArticle {
  title: string;
  slug: string;
  body: string;
  description: string;
  publishDate: string;
}

const getEnvDomain = (preview: boolean) => (preview ? config.CMS_PREVIEW_DOMAIN : config.CMS_API_DOMAIN);
const getEnvToken = (preview: boolean) => (preview ? config.CMS_PREVIEW_API_TOKEN : config.CMS_API_TOKEN);
const getBaseUrl = (preview: boolean) => urljoin(getEnvDomain(preview), "spaces", config.CMS_SPACEID_SITE, "environments", config.CMS_ENV);

const ContentType = "blogPost";

const fetchWithAuth = async (url, preview?: boolean) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${getEnvToken(preview)}`,
    },
  });
/**
 * It would be nicer to use a graphQL api to optimize the payload size returned,
 * but it's not available for free tier :(
 */
const getArticles = async (preview?: boolean): Promise<IBlogArticle[]> => {
  try {
    logService.log(`blogService.getArticles Call - preview: ${preview} | ${getBaseUrl(preview)}`);

    const url = urljoin(getBaseUrl(preview), `entries?content_type=${ContentType}&order=-fields.publishDate`);
    logService.log(`blogService.getArticles - Fetching from ${url}`);
    const response = await fetchWithAuth(url, preview);
    const responseJson = await response.json();
    const items = responseJson.items || [];

    logService.log("blogService.getArticles - fetched", items.length);
    return items.map((i) => i.fields);
  } catch (e) {
    logService.exception(e);
    return [];
  }
};

const getArticleBySlug = async (slug: string, preview?: boolean): Promise<IBlogArticle> => {
  const url = urljoin(getBaseUrl(preview), `entries?content_type=${ContentType}&fields.slug=${slug}`);

  try {
    const response = await fetchWithAuth(url, preview);
    const responseJson = await response.json();
    return (responseJson.items || []).map((i) => i.fields)[0];
  } catch (e) {
    logService.exception(e);
    return null;
  }
};

export default {
  getArticles,
  getArticleBySlug,
};
