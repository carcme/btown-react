import { useEffect, useState } from "react";
import { useUserLocation } from "@/state/location-provider";
import { useLanguage } from "@/state/lang-provider";
import { getTour } from "@/state/tours";
import { createFileRoute, Link } from "@tanstack/react-router";

import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { TourTimeline, type TimelineItem } from "@/components/v0/timeline";
import { ImageSlider } from "@/components/v0/image-slider";
import { Rating, RatingButton } from "@/components/ui/rating";
import { AboutTour } from "@/components/AboutTour";
import { Button } from "@/components/ui/button";

import {
  ArrowLeft,
  Footprints,
  Clock,
  MapPin,
  CalendarCheck,
  Dot,
  ChevronRight,
} from "lucide-react";
import { getCloudImage } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/tour/$tourId")({
  component: RouteComponent,

  loader: async ({ params }) => {
    return {
      tourId: Number(params.tourId),
    };
  },

  pendingComponent: () => {
    <div>Loading....</div>;
  },
  errorComponent: () => {
    <div>Error!!</div>;
  },
});

function RouteComponent() {
  const { tourId } = Route.useLoaderData();
  const { lang } = useLanguage();

  const { location } = useUserLocation();

  const tour = getTour(tourId, lang);
  const [rating, setRating] = useState<number>(4);

  // add the path to the images
  const imageArr = tour?.coverImages?.map((img) => {
    return {
      ...img,
      url: getCloudImage(img.url, 600),
    };
  });

  const timelineArr = tour?.attractions.map((attr) => ({
    tourId: tourId,
    id: attr.id,
    title: attr.stopName,
    address: attr.address,
    busStop: attr.busStop,
    hours: attr.hours,
    cost: attr.stopCost,
    rating: attr.stopRating,
    userLocation: location,
    location: attr.location,
    icon: MapPin,
  }));

  useEffect(() => {
    if (tour) setRating(tour.tourRating);
  }, [tour, lang]);

  return (
    <div>
      <div className="max-w-4xl mx-auto md:pt-4">
        <ImageSlider
          className="h-96 w-full md:rounded-xl rounded-b-lg"
          images={imageArr}
          buttonClassName=""
        >
          <Button
            variant="scale"
            size="icon"
            className="absolute top-4 left-4 z-1000 rounded-full shadow-lg "
          >
            <Link to="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
        </ImageSlider>
      </div>

      <div className="p-4 font-grotesk max-w-4xl mx-auto">
        <div className="text-2xl">{tour?.tourName}</div>
        <div className="text-lg text-muted-foreground">{tour?.tourDesc}</div>

        <div className="flex w-full justify-between">
          <div className="flex flex-col items-start gap-2 py-4">
            <Rating value={rating} readOnly>
              {Array.from({ length: 5 }).map((_, index) => (
                <RatingButton
                  size={16}
                  className="text-[#f6c600]"
                  key={index}
                />
              ))}
            </Rating>
            <p className="text-xs text-muted-foreground">Rating: {rating}</p>
          </div>
          <div className="grid grid-cols-3 auto-cols-min gap-2 py-4 text-muted-foreground">
            <span className="col-span-2 text-sm xs:text-base">
              <p>{tour?.tourTime} min</p>
            </span>
            <Clock className="size-5" />
            <span className="col-span-2 text-sm">
              <p>{tour?.tourDistance} km </p>
            </span>
            <Footprints className="size-5" />
          </div>
        </div>

        {tour && (
          <div className="text-center pb-4">
            <Button asChild variant="berlin">
              <Link
                to="/attractions/$tourId/$attractionId"
                params={{
                  tourId: tourId.toString(),
                  attractionId: tour.attractions[0].id.toString(),
                }}
              >
                Just Start Already
                <ChevronRight />
              </Link>
            </Button>
          </div>
        )}
        <div className="text-md text-pretty font-grotesk">
          {tour?.tourBrief.map((line, i) => {
            return (
              <p key={i} className="py-2">
                {line}
              </p>
            );
          })}
        </div>

        {tour?.highlights?.tips && (
          <div className=" mt-4">
            <h3 className="text-base ">Tips</h3>
            <div className="flex flex-col md:grid grid-cols-2">
              {tour?.highlights?.tips.map((tip) => {
                return (
                  <Item
                    key={tip}
                    variant="outline"
                    className="border-b-0 last:border-b even:md:border-b"
                  >
                    <ItemMedia variant="icon">
                      <CalendarCheck />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{tip} </ItemTitle>
                    </ItemContent>
                  </Item>
                );
              })}
            </div>
          </div>
        )}

        {tour?.highlights?.stops && (
          <div className="ml-4 mt-8">
            <ul className="text-sm mt-4">
              <h3 className="text-base underline m-3">Highlights</h3>
              <div className="flex flex-col md:grid grid-cols-2">
                {tour?.highlights?.stops.split(",").map((stop) => {
                  return (
                    <li key={stop} className="flex gap-2 last:mb-2">
                      <Dot /> {stop}
                    </li>
                  );
                })}
              </div>
              {tour?.highlights?.text && (
                <div className="text-sm text-pretty ">
                  {tour?.highlights?.text.map((line, i) => {
                    return (
                      <p key={i} className="py-2">
                        {line}
                      </p>
                    );
                  })}
                </div>
              )}
            </ul>
          </div>
        )}

        <Separator className="mt-4 max-w-3/4 mx-auto" />

        {tour && (
          <div className="p-4 w-full flex flex-col">
            <div className="flex justify-center">
              <Button asChild variant="berlin">
                <Link
                  to="/attractions/$tourId/$attractionId"
                  params={{
                    tourId: tourId.toString(),
                    attractionId: tour.attractions[0].id.toString(),
                  }}
                >
                  Begin
                  <ChevronRight />
                </Link>
              </Button>
            </div>
            <h3 className="pt-4">
              Or choose a destination from the Itinerary below
            </h3>
          </div>
        )}

        <TourTimeline items={timelineArr as TimelineItem[]} />

        <AboutTour
          length={tour?.attractions.length}
          duration={tour?.tourTime}
        />
      </div>

      {/* <div className="p-4">
        {tour?.attractions.map((poi) => {
          return <SummaryListItem key={poi.id} tourID={tourId} poi={poi} />;
        })}
      </div> */}
    </div>
  );
}
