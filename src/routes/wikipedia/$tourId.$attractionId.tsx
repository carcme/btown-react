import { createFileRoute, Link, useLocation } from "@tanstack/react-router";
import { WikiIcon } from "@/assets/svgIcons";
import { ImageZoom } from "@/components/ui/image-zoom";
import { useLanguage } from "@/state/lang-provider";
import { ArrowLeft } from "lucide-react";
import type { WikiPage } from "@/components/map/WikiType";
import WikiPageListItem from "@/components/WikiPageListItem";

export const Route = createFileRoute("/wikipedia/$tourId/$attractionId")({
  loader: async ({ params }) => {
    return {
      tour: Number(params.tourId),
      attraction: Number(params.attractionId),
    };
  },
  component: RouteComponent,
});

interface WikipediaState {
  page: WikiPage;
  pages: WikiPage[];
}

function RouteComponent() {
  const { tour, attraction } = Route.useLoaderData();
  const location = useLocation();
  const { page, pages } = (location.state as unknown as WikipediaState) || {};
  const { lang } = useLanguage();

  console.log("🚀 ~ RouteComponent ~ pages:", pages);

  if (!page) {
    console.log("No page data found. Please navigate from the map");
    return <div>No page data found. Please navigate from the map.</div>;
  }

  const extract = page?.extract.split(". ");

  const linkUrl = `https://${lang}.wikipedia.org/wiki?curid=${page?.pageid}`;

  return (
    <div>
      {page && (
        <div className="max-w-4xl mx-auto md:pt-4">
          <div>
            <ImageZoom>
              <img
                className="h-96 w-full md:rounded-xl rounded-b-lg object-cover"
                src={page?.thumbnail.source}
              />
            </ImageZoom>

            <Link
              to="/attractions/$tourId/$attractionId"
              params={{
                tourId: tour.toString(),
                attractionId: attraction.toString(),
              }}
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
      {pages?.map((p) => {
        return (
          <WikiPageListItem
            key={p.pageid}
            item={p}
            pages={pages}
            tourId={tour}
            attractionId={attraction}
          />
        );
      })}
    </div>
  );
}
