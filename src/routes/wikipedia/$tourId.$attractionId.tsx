import { createFileRoute, useLocation, Link } from "@tanstack/react-router";
import type { WikiPageType } from "@/types/WikiType";
import { useWikiPages } from "@/state/storeCreate";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Map } from "lucide-react";
import { useEffect } from "react";
import { ImageZoom } from "@/components/ui/image-zoom";
import { useLanguage } from "@/state/lang-provider";
import { WikiIcon } from "@/assets/svgIcons";
import { getDist } from "@/lib/utils";
import { useUserLocation } from "@/state/location-provider";
import NoImage from "@/assets/no_image.png";

export const Route = createFileRoute("/wikipedia/$tourId/$attractionId")({
  component: WikipediaComponent,
});

interface WikipediaState {
  page: WikiPageType;
}

function WikipediaComponent() {
  const { tourId, attractionId } = Route.useParams();
  const { lang } = useLanguage();
  const location = useLocation();
  const { location: userLocation } = useUserLocation();

  const { page } = (location.state as unknown as WikipediaState) || {};
  const { data: wikiPages } = useWikiPages();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location]);

  if (!page) {
    return <div>No page data found. Please navigate from the map.</div>;
  }
  const extract = page.extract.split(". ");

  const linkUrl = `https://${lang}.wikipedia.org/wiki?curid=${page.pageid}`;

  const latlng = {
    lat: page.coordinates[0].lat,
    lng: page.coordinates[0].lon,
  };

  const distance = getDist(latlng, userLocation);

  return (
    <div className="max-w-3xl mx-auto">
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
      {page.thumbnail && (
        <ImageZoom>
          <img
            src={page.thumbnail.source}
            alt={page.title}
            className="w-full h-96 max-w-3xl rounded-b-md object-cover mx-auto"
          />
        </ImageZoom>
      )}

      <div className="p-4">
        <div className="w-full flex justify-between items-center gap-2">
          <h3 className="text-2xl">{page.title}</h3>

          <Link to={linkUrl} target="_blank" rel="noopener noreferrer">
            <Button variant={"secondary"}>
              <WikiIcon className="size-6 fill-foreground" />
              Wikipedia
            </Button>
          </Link>
        </div>

        {extract.map((line) => {
          return (
            <p key={line} className="text-base py-2">
              {line}
            </p>
          );
        })}
        <div className="flex justify-end">
          <Link
            to="/attractions/$tourId/$attractionId"
            search={{
              osm_id: page.pageid.toString(),
              lat: latlng.lat.toString(),
              lng: latlng.lng.toString(),
            }}
            params={{ tourId, attractionId }}
          >
            <Button className="" variant="berlin" size="sm">
              <Map /> Map
            </Button>
          </Link>
        </div>
        <hr className="my-8" />

        <h2 className="text-xl font-bold py-2">Nearby Pages</h2>

        {wikiPages?.map((p: WikiPageType) => (
          <div key={p.pageid} className="py-2">
            <Link
              to="/wikipedia/$tourId/$attractionId"
              state={(prevState) => ({ ...prevState, page: p })}
              params={{ tourId, attractionId }}
            >
              <div className="flex items-start gap-2 ">
                <div className="shrink-0">
                  <div className="text-center py-2 ">
                    <img
                      className="size-20 object-cover rounded-md bg-muted-foreground"
                      src={p?.thumbnail ? p?.thumbnail.source : NoImage}
                      alt={p.title}
                    />
                  </div>
                </div>

                <div className="flex-1 ext-campaignevents-events-list-details">
                  <h4 className="text-lg leading-tight mb-1">{p.title}</h4>

                  <p className="text-sm mb-3 line-clamp-3 text-muted-foreground">
                    {p.extract}
                  </p>

                  <div className="flex items-center justify-end text-xs text-gray-500">
                    <div className="text-right">
                      <span className="px-2 py-1 bg-muted-foreground text-background rounded">
                        {distance}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          // <Link
          //   to="/wikipedia/$tourId/$attractionId"
          //   state={(prevState) => ({ ...prevState, page: p })}
          //   params={{ tourId, attractionId }}
          //   className=""
          // >
          //   <div className="border border-muted border-opacity-60 shadow-md rounded p-2 mb-2 flex no-underline">
          //     {p.thumbnail && (
          //       <div className="shrink-0 flex items-center ">
          //         <img
          //           className="rounded-full size-20 object-cover"
          //           src={p.thumbnail.source}
          //           alt={p.title}
          //         />
          //       </div>
          //     )}
          //     <div className="ml-4 flex flex-col justify-between">
          //       <div className="flex items-center mb-2">
          //         <div className="bg-green-500 w-4 h-4 flex items-center justify-center rounded mr-2"></div>
          //         <h2 className="">{p.title}</h2>
          //       </div>
          //       <div className="flex ">
          //         <p className=" text-sm text-muted-foreground line-clamp-3">
          //           {p.extract}
          //         </p>
          //       </div>
          //   </div>
          // </Link>
        ))}
      </div>
    </div>
  );
}
