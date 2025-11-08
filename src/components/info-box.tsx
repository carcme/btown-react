import type React from "react";
import { MapPin, Clock, Phone, Globe, Euro, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import type { Attraction } from "@/state/tours";

import {
  BerlinBus,
  BerlinSBahn,
  BerlinTram,
  BerlinUBahn,
  FacebookIcon,
} from "@/assets/svgIcons";
import WikiIcon from "./map/WikiIcon";

export function InfoBox({ infoData }: { infoData: Attraction | undefined }) {
  return (
    <Card className="w-full max-w-3xl mx-auto font-grotesk  ">
      <CardHeader className="space-y-2">
        <CardTitle className="text-base text-balance font-medium">
          {infoData?.stopName}
          <p className="text-xs">{infoData?.stopTag}</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 space-y-2">
          {infoData?.busStop && (
            <div>
              <InfoItem
                icon={<BerlinBus />}
                label="Bus"
                value={infoData.busStop}
              />
            </div>
          )}
          {infoData?.bahn && infoData?.bahn.charAt(0) === "S" ? (
            <div>
              <InfoItem
                icon={<BerlinSBahn />}
                label="S+U Bahn"
                value={infoData.bahn}
              />
            </div>
          ) : (
            infoData?.bahn && (
              <div>
                <InfoItem
                  icon={<BerlinUBahn />}
                  label="S+U Bahn"
                  value={infoData.bahn}
                />
              </div>
            )
          )}
          {infoData?.tram && (
            <div>
              <InfoItem
                icon={<BerlinTram />}
                label="Tram"
                value={infoData.tram}
              />
            </div>
          )}
        </div>
        {infoData?.address && (
          <div>
            <InfoItem
              icon={<MapPin className="size-5" />}
              label="Address"
              value={infoData?.address}
            />
          </div>
        )}
        {infoData?.tel && (
          <div>
            <InfoItem
              icon={<Phone className="size-5" />}
              label="Telephone"
              value={infoData.tel}
              link={`tel:${infoData?.tel.replace(/\D/g, "")}`}
            />
          </div>
        )}

        {/* Hours & cost */}
        {infoData?.hours && (
          <div>
            <InfoItem
              icon={<Clock className="size-5" />}
              label="Hours"
              value={infoData.hours}
              multiline
            />
          </div>
        )}
        {infoData?.stopCost && (
          <div>
            <InfoItem
              icon={<Euro className="size-5" />}
              label="Entrance Fee"
              value={infoData.stopCost.toString() + " €"}
            />
          </div>
        )}

        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Links
          </h3>
          <div className="flex flex-wrap gap-3">
            {infoData?.facebookPageId && (
              <LinkButton
                icon={<FacebookIcon className="fill-foreground size-4" />}
                label="Facebook"
                href={`https://www.facebook.com/${infoData.facebookPageId}`}
              />
            )}
            {infoData?.web && (
              <LinkButton
                icon={<Search className="size-4 fill-background " />}
                label="Website"
                href={infoData.web}
              />
            )}
            {infoData?.wikiLink && (
              <LinkButton
                icon={<WikiIcon className="size-4 fill-foreground" />}
                label="Wikipedia"
                href={infoData.wikiLink}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoItem({
  icon,
  label,
  value,
  link,
  multiline = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  link?: string;
  multiline?: boolean;
}) {
  return (
    <div className="flex gap-3 rounded-4xl">
      <div className="shrink-0 mt-2.5 text-muted-foreground">{icon}</div>
      <div className="flex-1 space-y-1">
        <h3 className="text-xs text-muted-foreground uppercase tracking-wide">
          {label}
        </h3>
        {link ? (
          <Link
            to={link}
            className="text-sm leading-relaxed text-foreground hover:text-primary transition-colors underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {value}
          </Link>
        ) : multiline ? (
          <p className="text-sm leading-relaxed text-foreground whitespace-pre-line">
            {value}
          </p>
        ) : (
          <p className="text-sm leading-relaxed text-foreground">{value}</p>
        )}
      </div>
    </div>
  );
}

function LinkButton({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <Link
      to={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-2 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80  hover:shadow-sm transition-colors text-sm font-medium"
    >
      {icon}
      {label}
    </Link>
  );
}
