import { useQuery } from "@tanstack/react-query";
/**
 *
 */
const dummyQuery = () => {
  return useQuery({
    queryKey: ["null"],
    queryFn: () => {
      return null;
    },
  });
};
/**
 * useFetchWikiLookup
 * @param {*} lang
 * @param {*} latlng
 * @returns
 *
 * formatversion=2 = return an array of pages
 * ggslimit = result limit to 20 for a query
 *
 * eg:  https://en.wikipedia.org/w/api.php?format=json&action=query&formatversion=2&redirects=1&generator=geosearch&prop=extracts|coordinates|pageterms|pageimages&piprop=thumbnail&wbptterms=description&ggscoord=52.526998|13.378248&coprop=type|dim|globe&exlimit=20&pilimit=50&explaintext=1&ggsradius=1000&pithumbsize=960&codistancefrompoint=52.526998|13.378248&exintro=1&ggslimit=3&colimit=20
 *
 *
 * GEOSEARCH
 * https://en.wikipedia.org/w/api.php?action=help&modules=query%2Bgeosearch
 *
 * COORDINATES
 * https://en.wikipedia.org/w/api.php?action=help&modules=query%2Bcoordinates
 *
 * EXTRACTS
 * https://en.wikipedia.org/w/api.php?action=help&modules=query%2Bextracts
 *
 * IMAGES
 * https://en.wikipedia.org/w/api.php?action=help&modules=query%2Bpageimages
 *
 * SANDBOX
 * https://en.wikipedia.org/wiki/Special:ApiSandbox#action=query&format=json&prop=extracts%7Cpageterms%7Cdescription%7Cimages&generator=geosearch&formatversion=2&exintro=1&explaintext=1&wbptterms=label%7Cdescription&desccontinue=1&imlimit=2&ggscoord=52.526998%7C13.378248&ggsradius=1000&ggssort=distance&ggslimit=20&ggsprop=globe%7Ctype%7Cname
 *
 */

const HTTPS = "https://";
const BASE = ".wikipedia.org/w/api.php?";
const FORMAT = "format=json&";
const ACTION = "action=query&";
const FORMAT_VER = "formatversion=2&";
const REDIRECT = "redirects=1&";
const GENERATOR = "generator=geosearch&";
const GSCOORD = "ggscoord=";
const PROPS =
  "prop=extracts|coordinates|pageterms|pageimages&piprop=thumbnail&wbptterms=description&";
const COORDS_PROPS = "&coprop=type&";
const CORS = "origin=*&";
const PAGE_PROPS = "pilimit=max&";
const PLAIN_TEXT = "";
const RADIUS = "ggsradius=1000&ggslimit=20&";
const THUMBSIZE = "pithumbsize=480&";
const DISTANCE = "codistancefrompoint=";
const INTRO_ONLY =
  "&exintro=1&exlimit=max&explaintext=0&exsectionformat=plain&";
const NUM_COORDS = "colimit=20"; // last param - no ending '&'

export const buildWikiQuery = (lang, latlng, radius = 300, articles = 2) => {
  const latlngStr = latlng.lat + "|" + latlng.lng;

  const url =
    HTTPS +
    lang +
    BASE +
    FORMAT +
    ACTION +
    FORMAT_VER +
    REDIRECT +
    GENERATOR +
    PROPS +
    GSCOORD +
    latlngStr +
    COORDS_PROPS +
    CORS +
    PAGE_PROPS +
    PLAIN_TEXT +
    RADIUS.replace("1000", radius) +
    THUMBSIZE +
    DISTANCE +
    latlngStr +
    INTRO_ONLY +
    "colimit=" +
    articles;
  console.log("🚀 ~ useFetchWikiLookup ~ url:", url);

  return url;
};

export const useFetchWikiLookup = (lang, latlng) => {
  if (latlng === null) return dummyQuery();

  const radius = 500;

  const url = buildWikiQuery(lang, latlng);

  return useQuery({
    enabled: latlng != null,
    staleTime: Infinity,
    cacheTime: Infinity,
    queryKey: [latlng],
    queryFn: () => {
      return axios.get(url);
    },
  });
};

/**
 * useReveseNominatimLookup
 *
 * @param {*} latlng
 * @returns
 */
export const useReveseNominatimLookup = (latlng) => {
  if (latlng === null) return dummyQuery();

  const url =
    "https://nominatim.openstreetmap.org/reverse?format=json&&lat=" +
    latlng.lat +
    "&lon=" +
    latlng.lng;

  return useQuery({
    enabled: latlng != null,
    staleTime: Infinity,
    queryKey: [latlng],
    queryFn: () => {
      return axios.get(url);
    },
  });
};
