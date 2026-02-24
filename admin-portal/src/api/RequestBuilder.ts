import { getLocale } from "next-intl/server";
import { ApiType } from "./ApiClient";
import { ContentType, shouldBeFormData } from "./ContentType";
import { TokenManager } from "./TokenManager";
import { FetchOption, HttpHeaders, HttpMethod } from "./Types";
const shouldAttachToken = (apiType: ApiType) => apiType !== "primary";
const buildFormData = (body: object) => {
  if (body instanceof FormData) return body;

  const data = new FormData();
  Object.entries(body).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v, i) => data.append(`${key}[${i}]`, v));
    } else {
      data.append(key, value);
    }
  });
  return data;
};

const buildPostData = (body: object, headers: HttpHeaders) => {
  return shouldBeFormData(body, headers)
    ? buildFormData(body)
    : JSON.stringify(body);
};

const addBearerHeader = (headers: HttpHeaders, token?: string): HttpHeaders => {
  if ("Authorization" in headers || !token) return headers;
  headers.Authorization = `Bearer ${token}`;
  return headers;
};

const addAuthHeader = async (headers?: HttpHeaders): Promise<HttpHeaders> => {

  return addBearerHeader(
    { ...(headers ?? {}) },
    String((await TokenManager.get()) || "")
  );
};

const getApiLanguage = (locale: string) => {

  switch (locale) {
    case 'bn':
      return 'ben';
    case 'en':
    default:
      return 'eng';
  }
};


export const getRefreshAuthHeader = async (): Promise<HttpHeaders> => {
  return addBearerHeader(
    {},
    String((await TokenManager.get()) || "")
  );
};

const buildHeader = async (
  headers: HttpHeaders,
  apiType: ApiType,
  body: object | undefined = undefined
) => {
  let header = ContentType.set(headers, body);
  const locale = await getLocale();

  if (shouldAttachToken(apiType)) {
    header = await addAuthHeader(header);
  }
  header["Accept-Language"] = "en";
  header["Accept"] = "application/json";
  header["requesterType"] = "agent";
  header["lang"] = getApiLanguage(locale);
  return header;
};

export const buildFetchOptions = async (
  method: HttpMethod,
  headers: HttpHeaders,
  apiType: ApiType,
  body: object | undefined = undefined

) => {
  const header = await buildHeader(headers,  apiType , body);
  
  const options: FetchOption = {
    method: method,
    headers: header,
  };
  if (body) {
    options.body = buildPostData(body, header);
  }
  return options;
};
