import React from "react";
import { Item, ItemContent, ItemMedia, ItemTitle } from "./ui/item";
import {
  Accessibility,
  CalendarCheck,
  ClockFading,
  MapPin,
} from "lucide-react";

export const AboutTour = ({
  length,
  duration,
}: {
  length: number | undefined;
  duration: number | undefined;
}) => {
  return (
    <div>
      <h2 className="text-xl py-2 mt-8">About This Tour</h2>
      <div className="grid md:grid-cols-2 max-w-4xl md:gap-3 mx-auto">
        <Item variant="outline" className="border-b-0 md:border-y">
          <ItemMedia variant="icon">
            <CalendarCheck />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Cancel Anytime... It's free </ItemTitle>
          </ItemContent>
        </Item>
        <Item variant="outline" className="border-y-0 md:border-y">
          <ItemMedia variant="icon">
            <MapPin />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>This tour has {length} stops</ItemTitle>
          </ItemContent>
        </Item>
        <Item variant="outline" className="border-y-0 md:border-y">
          <ItemMedia variant="icon">
            <ClockFading />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Tour duration {duration} mins</ItemTitle>
          </ItemContent>
        </Item>
        <Item variant="outline" className="border-t-0 md:border-y">
          <ItemMedia variant="icon">
            <Accessibility />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Wheelchair accessible</ItemTitle>
          </ItemContent>
        </Item>
      </div>
    </div>
  );
};
