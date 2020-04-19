import fetch from "isomorphic-unfetch";
import config from "../config";
import urljoin from "urljoin";
import { logService } from "./logService";

/**
 * @todo Use contenful.js client to simplify all this
 */

//
// Types
//

interface IContentInfo {
  type: "Link";
  linkType: "Asset" | "Entry";
  id: string;
}

interface IContentItem<T> {
  fields: T & {
    sys: IContentInfo;
  };
  sys: IContentInfo;
}

interface IContentLinks<T> {
  Entry?: IContentItem<T>[];
  Asset?: IContentItem<T>[];
}

//use contentful types (todo: import from somewhere)
interface IContentEntry<T> {
  items: IContentItem<T>[];
  includes?: IContentLinks<T>;
  limit: number;
  skip: number;
  total: number;
  sys: {};
}

interface IContentResponse<T> {
  success: boolean;
  data?: T;
  links?: IContentLinks<any>;
  error?: Error;
}

//
// Util func
//

//TODO: Improve this bit, abstract from vendor
const getEnvDomain = (preview: boolean) => (preview ? config.CMS_PREVIEW_DOMAIN : config.CMS_API_DOMAIN);
const getEnvToken = (preview: boolean) => (preview ? config.CMS_PREVIEW_API_TOKEN : config.CMS_API_TOKEN);
const getBaseUrl = (preview: boolean) => urljoin(getEnvDomain(preview), "spaces", config.CMS_SPACEID_SITE, "environments", config.CMS_ENV);

//
const createSuccessResponse = <T>(data?: T, links?: IContentLinks<any>): IContentResponse<T> => ({
  data,
  links,
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

//
// Data wrangling
//

/**
 * Find links in "includes" and merged those link.fields into the origignal field
 * This flattens linked items together to simplify components
 */
const assignLinkToField = (field: IContentItem<any>, includes: IContentLinks<any>) => {
  if (!field.sys || field.sys.type !== "Link") {
    return field;
  }

  const linktype = field.sys.linkType;
  if (!includes[linktype]) {
    return field;
  }

  var link = includes[linktype].find((a) => a.sys.id === field.sys.id);
  if (!link) {
    return field;
  }

  return Object.assign(field, link.fields);
};

/**
 * Map over all items fields and merge their linked fields together
 */
const assignLinkToFieldItems = (itemsFields, includes: IContentLinks<any>) => {
  itemsFields.map((fields) => {
    for (const k in fields) {
      var field = fields[k];

      if (field instanceof Array) {
        field = field.map((dfk) => assignLinkToField(dfk, includes));
      } else {
        field = assignLinkToField(field, includes);
      }
    }
  });
  return itemsFields;
};

//
// Methods
//

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

    const itemsFields = (responseJson.items || []).map((i) => i.fields);
    const includes = responseJson.includes;

    if (itemsFields.length !== 1) {
      return createFailedResponse(new Error(`contentService.fetchEntryBySlug - results for slug:${slug} either empty or > 1`));
    }

    //assign linked fields
    const itemFields = assignLinkToFieldItems(itemsFields, responseJson.includes)[0];

    return createSuccessResponse(itemFields, includes);
  } catch (e) {
    logService.exception(e);
    return createFailedResponse(e);
  }
};

//
// Exports
//
export { fetchEntries, fetchEntryBySlug };
