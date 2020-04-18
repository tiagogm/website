import fetch from "isomorphic-unfetch";
import config from "../config";
import urljoin from "urljoin";
import { logService } from "./logService";

//
// Types
//

//use contentful types (todo: import from somewhere)
interface IContentEntry<T> {
  items: {
    fields: T;
    //others
  }[];
  limit: number;
  skip: number;
  total: number;
  sys: {};
}

interface IContentResponse<T> {
  success: boolean;
  data?: T;
  error?: Error;
}

//
// Reusable func
//

//TODO: Improve this bit, abstract from vendor
const getEnvDomain = (preview: boolean) => (preview ? config.CMS_PREVIEW_DOMAIN : config.CMS_API_DOMAIN);
const getEnvToken = (preview: boolean) => (preview ? config.CMS_PREVIEW_API_TOKEN : config.CMS_API_TOKEN);
const getBaseUrl = (preview: boolean) => urljoin(getEnvDomain(preview), "spaces", config.CMS_SPACEID_SITE, "environments", config.CMS_ENV);

const createSuccessResponse = <T>(data?: T): IContentResponse<T> => ({
  data,
  success: true,
});

const createFailedResponse = <T>(error: Error): IContentResponse<T> => ({
  error,
  success: false,
});

const fetchWithAuth = async (url: string, preview?: boolean) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${getEnvToken(preview)}`,
    },
  });

/**
 * Fetch entries from content source (contentful)
 * @param preview - Preview mode / draft content
 * @param contentType
 * @param orderField
 */
const fetchEntries = async <T>(preview: boolean, contentType: string, orderField?: string): Promise<IContentResponse<T[]>> => {
  try {
    const orderQs = orderField ? `order=${orderField}` : ``;

    //todo use "buildQs" util
    const url = urljoin(getBaseUrl(preview), `entries?content_type=${contentType}&${orderQs}`);
    const response = await fetchWithAuth(url, preview);
    const responseJson = (await response.json()) as IContentEntry<T>;

    return createSuccessResponse(responseJson.items.map((i) => i.fields));
  } catch (e) {
    logService.exception(e);
    return createFailedResponse(e);
  }
};

/**
 * Fetch single content entry from slug
 * @param preview
 * @param contentType
 * @param slug
 */
const fetchEntryBySlug = async <T>(preview: boolean, contentType: string, slug: string): Promise<IContentResponse<T>> => {
  try {
    const url = urljoin(getBaseUrl(preview), `entries?content_type=${contentType}&fields.slug=${slug}`);
    const response = await fetchWithAuth(url, preview);
    const responseJson = (await response.json()) as IContentEntry<T>;

    const items = (responseJson.items || []).map((i) => i.fields);
    if (items.length <= 0) {
      return createFailedResponse(new Error(`contentService.fetchEntryBySlug - No results returned for slug:${slug}`));
    }
    return createSuccessResponse(items[0]);
  } catch (e) {
    logService.exception(e);
    return createFailedResponse(e);
  }
};

//
// Exports
//
export { fetchEntries, fetchEntryBySlug };
