import { useEffect, useState } from "react";

async function getCommonsThumbnailByFilename(filename, width = 330) {
  const apiUrl = new URL("https://commons.wikimedia.org/w/api.php");
  apiUrl.searchParams.set("action", "query");
  apiUrl.searchParams.set("titles", filename);
  apiUrl.searchParams.set("prop", "imageinfo");
  apiUrl.searchParams.set("iiprop", "url");
  apiUrl.searchParams.set("iiurlwidth", width);
  apiUrl.searchParams.set("format", "json");
  apiUrl.searchParams.set("origin", "*"); // For CORS

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];

    if (pageId === "-1") {
      throw new Error(`File "${filename}" not found on Wikimedia Commons.`);
    }

    const imageInfo = pages[pageId].imageinfo?.[0];
    if (!imageInfo?.thumburl) {
      throw new Error(`No thumbnail URL found for "${filename}".`);
    }
    return imageInfo.thumburl;
  } catch (e) {
    console.error("Failed to fetch thumbnail from Wikimedia Commons API", e);
    throw new Error("API request failed for thumbnail");
  }
}

async function getThumbnailFromWikidata(qid, width) {
  const apiUrl = new URL("https://www.wikidata.org/w/api.php");
  apiUrl.searchParams.set("action", "wbgetclaims");
  apiUrl.searchParams.set("entity", qid);
  apiUrl.searchParams.set("property", "P18"); // P18 is the "image" property
  apiUrl.searchParams.set("format", "json");
  apiUrl.searchParams.set("origin", "*"); // For CORS

  const response = await fetch(apiUrl);
  if (!response.ok) throw new Error("Wikidata API request failed");
  const data = await response.json();

  const claim = data.claims?.P18?.[0];
  if (!claim) throw new Error(`No image (P18) found for Wikidata item ${qid}`);

  const filename = "File:" + claim.mainsnak.datavalue.value;
  return getCommonsThumbnailByFilename(filename, width);
}

async function getThumbnailFromCategory(category, width) {
  const apiUrl = new URL("https://commons.wikimedia.org/w/api.php");
  apiUrl.searchParams.set("action", "query");
  apiUrl.searchParams.set("list", "categorymembers");
  apiUrl.searchParams.set("cmtitle", category);
  apiUrl.searchParams.set("cmtype", "file");
  apiUrl.searchParams.set("cmlimit", "1");
  apiUrl.searchParams.set("format", "json");
  apiUrl.searchParams.set("origin", "*"); // For CORS

  const response = await fetch(apiUrl);
  if (!response.ok) throw new Error("Commons Category API request failed");
  const data = await response.json();

  const member = data.query?.categorymembers?.[0];
  if (!member) throw new Error(`No files found in category "${category}"`);

  const filename = member.title;
  return getCommonsThumbnailByFilename(filename, width);
}


export function useCommonsImage(fileUrl, width = 330) {
  const [src, setSrc] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!fileUrl) {
      setSrc(null);
      setError(null);
      return;
    };

    let isCancelled = false;

    async function fetchImage() {
      setSrc(null);
      setError(null);
      try {
        let thumb;
        // Check for Wikidata Q-ID (e.g., "Q12345")
        if (/^Q\d+$/.test(fileUrl)) {
          console.log("We have a wikiData item: ", fileUrl);
          thumb = await getThumbnailFromWikidata(fileUrl, width);
        } 
        // Check for Category (e.g., "Category:Some_Category")
        else if (fileUrl.toLowerCase().startsWith("category:")) {
          console.log("We have a wiki Category item: ", fileUrl);
          thumb = await getThumbnailFromCategory(fileUrl, width);
        } 
        // Assume it's a direct File URL
        else if (fileUrl.includes("File:")) {
           const match = fileUrl.match(/File:(.*)$/);
           if (!match) throw new Error("Invalid Commons File: URL");
           const filename = "File:" + decodeURIComponent(match[1]);
           thumb = await getCommonsThumbnailByFilename(filename, width);
        }
        else {
          throw new Error("Unsupported URL or identifier format");
        }

        if (!isCancelled) {
          setSrc(thumb);
        }
      } catch (e) {
        console.error(e);
        if (!isCancelled) {
          setError(e.message);
        }
      }
    }

    fetchImage();

    return () => {
      isCancelled = true;
    };
  }, [fileUrl, width]);

  return { src, error };
}