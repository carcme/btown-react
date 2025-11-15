import { useIqPlaces } from "@/state/wiki";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DivIconToSvgIcon } from "@/components/icons/DivIconToSvg";
import { useUserLocation } from "@/state/location-provider";
import { getDist } from "@/lib/utils";
import { ArrowLeft, Map, XCircle } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import axios from "axios";
import type { LocationIQPlaceType } from "@/types/LocationIQ";
import AlertBox from "@/components/AlertBox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CommonsImage } from "@/components/CommonsImage";
import { ImageZoom } from "@/components/ui/image-zoom";

const dummy = [
  {
    place_id: "144736527",
    licence: "https://locationiq.com/attribution",
    osm_type: "way",
    osm_id: "556435241",
    boundingbox: ["52.5206838", "52.5209557", "13.4091976", "13.409645"],
    lat: "52.5208279",
    lon: "13.409421365810083",
    display_name:
      "Fernsehturm Berlin, 1a, Panoramastraße, Nikolaiviertel, Mitte, Berlin, 10178, Germany",
    class: "tourism",
    type: "attraction",
    importance: 1,
    icon: "https://locationiq.org/static/images/mapicons/poi_point_of_interest.p.20.png",
    extratags: {
      ele: "40",
      image: "https://photos.app.goo.gl/U7sc3WznysabM3ox5",
      layer: "2",
      height: "368",
      building: "tower",
      man_made: "communications_tower",
      nickname: "Telespargel",
      operator: "Deutsche Funkturm GmbH",
      wikidata: "Q151356",
      viewpoint: "yes",
      wikipedia: "de:Berliner Fernsehturm",
      start_date: "1969",
      "tower:type": "communication",
      wheelchair: "no",
      "seamark:name": "Fernsehturm",
      "seamark:type": "landmark",
      "contact:website": "https://www.tv-turm.de/",
      "contact:facebook": "https://www.facebook.com/BerlinerFernsehturm",
      "contact:instagram": "https://www.instagram.com/berliner_fernsehturm/",
      wikimedia_commons: "Category:Berliner Fernsehturm",
      "toilets:wheelchair": "no",
      "communication:radio": "yes",
      "seamark:light:range": "8",
      "seamark:light:colour": "red",
      "seamark:light:height": "205",
      "seamark:light:category": "vertical",
      "communication:microwave": "yes",
      "seamark:light:character": "F",
      "communication:television": "yes",
      "seamark:landmark:category": "tower",
      "seamark:landmark:function": "communication",
      "communications_transponder:service": "DAB+",
    },
  },
];
/* 
  isImage = https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Urania-Weltzeituhr_auf_dem_Alexanderplatz_in_Berlin_2015.jpg/800px-Urania-Weltzeituhr_auf_dem_Alexanderplatz_in_Berlin_2015.jpg

 isCommonsPage = https://commons.wikimedia.org/wiki/File:Berlin-Volksbuehne_am_Rosa-Luxemburg-Platz-06-2006-gje.jpg

 isGoogleImage = "https://photos.app.goo.gl/z7Eax1mrm2Wafqpw8"

 https://commons.wikimedia.org/wiki/File:Berlin-Volksbuehne_am_Rosa-Luxemburg-Platz-06-2006-gje.jpg
*/

function SearchResultCard({ result }: { result: any }) {
  const { display_name, extratags, type, osm_id } = result;
  const { tourId, attractionId } = Route.useParams();

  const title = display_name.split(",")[0];

  const isGoogleImage = extratags?.image?.includes("photos.app.goo.");
  const isImage = extratags?.image?.includes("commons/thumb/");
  console.log(dummy);
  let commonsImage = undefined;
  let isCommonsPage = false;
  if (!isGoogleImage) {
    if (isImage) {
      // we have an image!!
      commonsImage = extratags?.image;
    }
  } else {
    isCommonsPage =
      extratags?.image?.toLowerCase().includes("file:") ||
      extratags?.wikimedia_commons?.toLowerCase().includes("category:");

    // we have an image!!
    commonsImage =
      (!isGoogleImage && extratags?.image) || extratags?.wikimedia_commons;
    if (!commonsImage && extratags.wikidata) {
      commonsImage = extratags.wikidata;
    }
  }

  return (
    <Card key={osm_id}>
      <CardHeader className="relative">
        <div className="absolute -top-4 right-2 justify-end flex w-full gap-1">
          <Badge variant="berlin" className="capitalize ">
            {extratags.cuisine ? extratags.cuisine : type}
          </Badge>
          {extratags["diet:vegan"] && (
            <Badge variant="berlin" className="capitalize ">
              vegan:{extratags["diet:vegan"]}
            </Badge>
          )}
          {extratags?.takeaway === "yes" && (
            <Badge variant="berlin" className="capitalize ">
              takeaway
            </Badge>
          )}
          {extratags?.artwork_type && (
            <Badge variant="berlin" className="capitalize ">
              {extratags.artwork_type}
            </Badge>
          )}
        </div>
        <CardTitle className="pt-4">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {!isGoogleImage && !isCommonsPage && extratags.image && (
          <ImageZoom>
            <img
              src={extratags.image}
              alt={title}
              className="w-full h-48 object-cover rounded-t-xl mb-2"
            />
          </ImageZoom>
        )}
        {isCommonsPage && (
          <CommonsImage
            url={commonsImage}
            width={400}
            alt=""
            className="w-full h-48 object-cover rounded-t-xl mb-2"
          />
        )}
        <p className="text-sm text-muted-foreground mb-4">{display_name}</p>
        <p className="text-sm text-muted-foreground mb-4">
          {extratags.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {extratags.wikipedia && (
            <a
              href={`https://en.wikipedia.org/wiki/${extratags.wikipedia}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm">
                Wikipedia
              </Button>
            </a>
          )}
          {(extratags["contact:website"] && (
            <a
              href={extratags["contact:website"]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm">
                Website
              </Button>
            </a>
          )) ||
            (extratags.website && (
              <a
                href={extratags.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  Website
                </Button>
              </a>
            ))}
          {(extratags.phone && (
            <a
              href={`tel:${extratags.phone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm">
                Phone
              </Button>
            </a>
          )) ||
            (extratags["contact:phone"] && (
              <a
                href={`tel:${extratags["contact:phone"]}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  Phone
                </Button>
              </a>
            ))}
          {extratags["contact:facebook"] && (
            <a
              href={extratags["contact:facebook"]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm">
                Facebook
              </Button>
            </a>
          )}
        </div>
        <dl className="text-sm grid grid-cols-2 gap-x-4 gap-y-2">
          {extratags.opening_hours && (
            <>
              <dt className="font-bold">Open Times</dt>
              <dd>{extratags.opening_hours}</dd>
            </>
          )}
          {extratags["payment:credit_cards"] && (
            <>
              <dt className="font-bold">Credit Cards</dt>
              <dd className="capitalize">
                {extratags["payment:credit_cards"]}
              </dd>
            </>
          )}
          {extratags["payment:debit_cards"] && (
            <>
              <dt className="font-bold">Debit Cards</dt>
              <dd className="capitalize">{extratags["payment:debit_cards"]}</dd>
            </>
          )}
          {extratags.outdoor_seating && (
            <>
              <dt className="font-bold">Outside Seating</dt>
              <dd className="capitalize">{extratags.outdoor_seating}</dd>
            </>
          )}
          {extratags.wheelchair && (
            <>
              <dt className="font-bold">Wheelchair</dt>
              <dd className="capitalize">{extratags.wheelchair}</dd>
            </>
          )}
          {extratags["toilets:wheelchair"] && (
            <>
              <dt className="font-bold">Wheelchair Toilet</dt>
              <dd className="capitalize">{extratags["toilets:wheelchair"]}</dd>
            </>
          )}
          {extratags.operator && (
            <>
              <dt className="font-bold">Operator</dt>
              <dd>{extratags.operator}</dd>
            </>
          )}
          {extratags.start_date && (
            <>
              <dt className="font-bold">Start Date</dt>
              <dd>{extratags.start_date}</dd>
            </>
          )}
          {extratags.height && (
            <>
              <dt className="font-bold">Height</dt>
              <dd>{extratags.height}m</dd>
            </>
          )}
          {extratags.sponsor && (
            <>
              <dt className="font-bold">Sponsor</dt>
              <dd className="capitalize">{extratags.sponsor}m</dd>
            </>
          )}
          {extratags["artwork:group"] && (
            <>
              <dt className="font-bold">Group</dt>
              <dd className="capitalize">
                {extratags["artwork:group"].replace("_", " ")}
              </dd>
            </>
          )}
          {extratags.animal && (
            <>
              <dt className="font-bold">Animal</dt>
              <dd className="capitalize">
                {extratags.animal.replace("_", " ")}
              </dd>
            </>
          )}
          {extratags.material && (
            <>
              <dt className="font-bold">Material</dt>
              <dd className="capitalize">
                {extratags.material.replace("_", " ")}
              </dd>
            </>
          )}
          {extratags.artist_name && (
            <>
              <dt className="font-bold">Artist</dt>
              <dd className="capitalize">
                {extratags.artist_name.replace("_", " ")}
              </dd>
            </>
          )}
        </dl>

        <div className="flex justify-end pt-10">
          <Link
            to="/attractions/$tourId/$attractionId"
            params={{ tourId, attractionId }}
            search={{ osm_id: osm_id, lat: result.lat, lng: result.lon }}
          >
            <Button
              className="absolute bottom-8 right-8"
              variant="berlin"
              size="icon"
            >
              <Map />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute("/places/$tourId/$attractionId")({
  component: RouteComponent,

  loader: async ({ params }) => {
    return {
      tour: Number(params.tourId),
      attraction: Number(params.attractionId),
    };
  },
  pendingComponent: () => {
    <div>Loading....</div>;
  },
  errorComponent: () => {
    <div>Error!!</div>;
  },
});

interface ErrorParams {
  title: string;
  desc: string;
}

function RouteComponent() {
  const { tourId, attractionId } = Route.useParams();
  const { location } = useUserLocation();
  const { data: locationIQPlaces } = useIqPlaces();
  const [filter, setFilter] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<any>([]);
  const [showResults, setShowResults] = useState(true);
  const [error, setError] = useState<ErrorParams | null>(null);

  if (!locationIQPlaces) {
    return <div className="p-4 max-w-3xl mx-auto">Loading places...</div>;
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [showResults]);

  const handlePlaceClick = async (place: LocationIQPlaceType) => {
    try {
      console.log(place);

      setError(null);
      setShowResults(false);

      // "https://api.locationiq.com/v1/search.php",
      // const searchStr = `${place.address.name},${place.address.road},${
      //   place.address.city
      // }`;
      // if (searchStr.includes("undefined")) {
      //   setError({
      //     title: "Search Failed",
      //     desc: "The search parameters are incomplete",
      //   });
      //   return;
      // }
      // console.log("🚀 ~ handlePlaceClick ~ searchStr:", searchStr);

      const searchStr = `${place.osm_type.charAt(0)}${place.osm_id}`;
      console.log(searchStr);

      //https:eu1.locationiq.com/v1
      const response = await axios.get("https://eu1.locationiq.com/v1/lookup", {
        params: {
          key: import.meta.env.VITE_LOCATION_IQ_API_KEY,
          osm_ids: searchStr,
          extratags: 1,
          format: "json",
          countrycodes: "de",
        },
      });
      setSearchResult(response.data);
      setShowResults(true);
      console.log("LocationIQ Search Result:", response.data);
    } catch (error) {
      console.error("Error fetching LocationIQ search:", error);
      setError({
        title: "Bad Request - 404",
        desc: "Error fetching LocationIQ search",
      });
    }
  };

  const tagTypes = [
    ...new Set(locationIQPlaces.map((place) => place.tag_type)),
  ];

  const filteredPlaces = filter
    ? locationIQPlaces.filter((place) => place.tag_type === filter)
    : locationIQPlaces;

  function onFilterHandler(filter: string | null) {
    setFilter(filter);
    setShowResults(false);
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="p-6 flex ">
        <Link
          to="/attractions/$tourId/$attractionId"
          params={{ tourId, attractionId }}
          search={{ osm_id: null, lat: null, lng: null }}
        >
          <Button
            className="absolute top-4 left-4 z-10 bg-background/80"
            variant="secondary"
            size="icon"
          >
            <ArrowLeft />
          </Button>
        </Link>
        <h3 className="absolute top-5 left-16 text-xl font-grotesk">
          Nearby Places
        </h3>
      </div>

      <Separator className="m-3 max-w-3/4 mx-auto" />

      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={filter === null ? "default" : "outline"}
          onClick={() => onFilterHandler(null)}
        >
          All
        </Button>
        {tagTypes.map((tag) => (
          <Button
            key={tag}
            variant={filter === tag ? "default" : "outline"}
            onClick={() => onFilterHandler(tag)}
          >
            {tag}
          </Button>
        ))}
      </div>

      {/* Use clicked list item, show details from search on 'display_name' */}
      {showResults && searchResult && (
        <div className="relative mt-4 p-4 border rounded-md ">
          <h4 className="font-bold mb-2">Search Result</h4>
          <XCircle
            className="absolute top-2 right-2 cursor-pointer"
            onClick={() => setShowResults(false)}
          />
          <div className="space-y-4">
            {searchResult.map((result: any) => (
              <SearchResultCard key={result.place_id} result={result} />
            ))}
          </div>
        </div>
      )}

      {error !== null && (
        <div className="pb-4">
          <AlertBox title={error.title} desc={error.desc} />
        </div>
      )}

      <ul className="space-y-4">
        {filteredPlaces.map((place) => (
          <li
            // place_id alone isn't always unique
            key={place.place_id + place.osm_id}
            className="flex items-center gap-4 p-2 border rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => handlePlaceClick(place)}
          >
            {place.icon?.options.html && (
              <DivIconToSvgIcon
                svg={place.icon?.options.html}
                className="w-8 h-8"
              />
            )}
            <div className="w-full text-sm">
              <p className="font-bold ">{place.name}</p>
              <p className="text-sm text-muted-foreground">
                {place.address.road}, {place.address.suburb}
              </p>
            </div>
            <p className="text-sm min-w-20">
              {getDist([place.lat, place.lon], location)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
