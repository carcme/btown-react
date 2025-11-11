import { WikiIcon } from "@/assets/svgIcons";
import { Button } from "@/components/ui/button";
import { ImageZoom } from "@/components/ui/image-zoom";
import { ImageSlider } from "@/components/v0/image-slider";
import { useLanguage } from "@/state/lang-provider";
import {
  createFileRoute,
  Link,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

const temp = {
  pageid: 158898,
  ns: 0,
  title: "Nikolaiviertel",
  index: -1,
  extract:
    "The Nikolaiviertel (; 'Nicholas Quarter') is an old quarter of the German capital of Berlin, founded c. 1200. Together with nearby Cölln, they jointly make up Alt-Berlin, the reconstructed historical heart of the city. Located in the Mitte locality (in the homonymous district), it is five minutes away from Alexanderplatz and Berlin Palace.",
  coordinates: [
    {
      lat: 52.51666667,
      lon: 13.40722222,
      primary: true,
      type: "landmark",
      dim: "1000",
      globe: "earth",
      dist: 90.9,
    },
  ],
  terms: {
    description: ["old quarter of the German capital of Berlin"],
  },
  thumbnail: {
    source:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/View_Berlin_TV_Tower_Jan2015_img4.jpg/500px-View_Berlin_TV_Tower_Jan2015_img4.jpg",
    width: 480,
    height: 320,
  },
};

export const Route = createFileRoute("/wikipage")({
  component: WikiPage,
});

function WikiPage() {
  const { page } = useLocation().state;
  const navigate = useNavigate();
  const { lang } = useLanguage();

  const extract = page?.extract.split(". ");

  const linkUrl = `https://${lang}.wikipedia.org/wiki?curid=${page?.pageid}`;

  return (
    <div>
      {page && (
        <div className="max-w-4xl mx-auto md:pt-4">
          <div>
            <ImageZoom>
              <img
                className="h-96 w-full md:rounded-xl rounded-b-lg"
                src={page?.thumbnail.source}
              />
            </ImageZoom>

            <Link
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 z-1000 rounded-full shadow-lg bg-background p-2 hover:scale-110"
            >
              <ArrowLeft className="size-4" />
            </Link>
          </div>

          <div className="p-4 font-spinnaker space-y-5">
            <div className="w-full flex justify-between">
              <h3 className="text-2xl">{page.title}</h3>

              <Link
                to={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-2 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80  hover:shadow-sm transition-colors text-sm font-medium"
              >
                <WikiIcon className="size-6 fill-foreground" />
                Visit Wikipedia
              </Link>
            </div>
            <h4 className="text-lg capitalize">
              Type:{" "}
              <span className="text-primary capitalize italic">
                {page.coordinates[0].type}
              </span>
            </h4>

            {extract.map((line) => {
              return (
                <p key={line} className="py-2 last:pb-4">
                  {line}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
