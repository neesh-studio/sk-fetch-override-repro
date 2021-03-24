import { browser } from "$app/env";

export const baseURL = "https://staging.cms.urbanekuensteruhr.de";
const apiUrl = baseURL + "/api";

export function buildQuery(queryString) {
  let queryUrl = apiUrl;
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: queryString }),
  };
  return { url: queryUrl, options: fetchOptions };
}

export const query = async function (queryString, fetchApi) {
  const { url, options } = buildQuery(queryString);
  //   if (typeof window !== "undefined") fetchApi = fetch;
  const rawResp = await fetchApi(url, options);
  let resp = await rawResp.json();
  // console.debug(parsedResp);
  // console.log("query response", { query: queryString }, resp, resp);
  if (resp.errors) {
    console.error("error requesting", resp);
  } else {
    if (resp.data.entry) {
      return resp.data.entry;
    } else if (resp.data.entries) {
      return resp.data.entries;
    } else if (resp.data.globalSet) {
      return resp.data.globalSet;
    } else if (resp.data.category) {
      return resp.data.category;
    } else if (resp.data.categories) {
      return resp.data.categories;
    } else {
      console.error("Respones data format not known.", resp);
      return null;
    }
  }
};

const mediaFragment = `#graphql
  media {
    ...on upload_Asset {
      kind
      title
      url
      copyright
      width
      height
    }
  }
`;

export const getFestival = (lang, slug) => `#graphql
  query {
    entry(type: "festival", site: "${lang}", slug: "${slug}"){
      ...on festival_festival_Entry {
        title
        infoText
        visitDetails
        ${mediaFragment}
        artists {
          ...on artist_artist_Entry {
            title
            infoText
            ${mediaFragment}
          }
        }
      }
    }
  }
`;
