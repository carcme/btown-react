import {
  CheckCircle2,
  Circle,
  Minus,
  Star,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Link } from "@tanstack/react-router";
import type { LatLngExpression } from "leaflet";
import type { Location } from "@/state/tours";
import { getDistance } from "geolib";

export interface TimelineItem {
  tourId: number;
  id: number;
  title: string;
  description: string;
  address?: string | undefined;
  busStop?: string | undefined;
  hours?: string | undefined;
  cost?: number | undefined;
  rating?: number | undefined;
  userLocation: LatLngExpression;
  location: Location;
  icon?: LucideIcon | undefined;
  isCompleted?: boolean | undefined;
}

interface TimelineProps {
  items: TimelineItem[] | undefined;
  className?: string;
}

function distance(latlng1: LatLngExpression, latlng2: Location) {
  let meters = getDistance(latlng1, latlng2);
  if (meters > 1000) {
    return (meters / 1000).toFixed(1) + " km";
  }
  return meters + " m";
}

export const TourTimeline = ({ items }: { items: TimelineItem[] }) => {
  return (
    <section className="p-4 pt-2">
      <h2 className="text-2xl font-bold text-start mb-8">Itinerary</h2>
      <div className="max-w-2xl mx-auto">
        <Timeline items={items} className="" />
      </div>
    </section>
  );
};

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("relative space-y-8", className)}>
      {items?.map((item, index) => {
        const Icon = item?.icon || (item?.isCompleted ? CheckCircle2 : Circle);
        const isLast = index === items.length - 1;

        return (
          <Link
            key={item.id}
            to="/attractions/$tourId/$attractionId"
            params={{
              tourId: item.tourId.toString(),
              attractionId: item.id.toString(),
            }}
            // search={{ tour: 0, attr: item.id }}
          >
            <div className="relative flex gap-4 space-y-12">
              {/* Timeline line */}
              {!isLast && (
                <div className="absolute left-[19px] top-10 h-[calc(100%+0rem)] w-1 bg-border" />
              )}

              {/* Icon container */}
              <div
                className={cn(
                  "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2",
                  item?.isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-1 pt-1">
                <div className="flex items-center justify-between ">
                  <div className="flex gap-4">
                    <h3 className="font-semibold leading-none">{item.title}</h3>
                    <h3 className="text-xs">
                      {distance(item?.userLocation, item.location)}
                    </h3>
                  </div>
                  <div className="relative w-fit">
                    <Avatar className="size-5 rounded-full">
                      <AvatarFallback className="rounded-sm">
                        <Star className="size-5 " color="#f6c600" />
                      </AvatarFallback>
                    </Avatar>
                    <Badge className="absolute -top-3 -right-4 h-5 min-w-5 rounded-full px-1 tabular-nums bg-transparent text-muted-foreground">
                      {item?.rating != 0 ? (
                        item?.rating?.toFixed(1)
                      ) : (
                        <Minus className="" />
                      )}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item?.busStop || item?.address}
                </p>
                <p className="text-xs text-muted-foreground mb-8">
                  {item?.hours}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
