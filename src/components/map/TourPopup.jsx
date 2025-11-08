import React from "react";

import NoImage from "@/assets/no_image.png";
import { Footprints, Link } from "lucide-react";
import { firebaseImage } from "@/lib/utils";

/**
 * 
 * @param {*} page
{
    "pageid": 17476683,
    "ns": 0,
    "title": "Invalidenstraße",
    "index": 6,
    "extract": "Invalidenstraße, or Invalidenstrasse (see ß), is a street in Berlin, Germany. It runs east to west for three kilometers (1.9 mi) through the districts of Mitte and Moabit. The street originally connected three important railway stations in the northern city centre: the Stettiner Bahnhof (today Nordbahnhof), the Hamburger Bahnhof and the Lehrter Bahnhof, the present-day Berlin Hauptbahnhof.",
    "coordinates": [
        {
            "lat": 52.5286,
            "lon": 13.3764,
            "primary": "",
            "type": "landmark",
            "dim": "1000",
            "globe": "earth",
            "dist": 217.6
        }
    ],
    "terms": {
        "description": [
            "street in Berlin, Germany"
        ]
    },
    "thumbnail": {
        "source": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Mitte_Invalidenstra%C3%9Fe_Chausseestra%C3%9Fe.JPG/960px-Mitte_Invalidenstra%C3%9Fe_Chausseestra%C3%9Fe.JPG",
        "width": 960,
        "height": 720
    }
}
 * @returns 
 */

const TourPopup = ({ attr }) => {
  const stopImage = firebaseImage(attr?.stopImageFile);

  return (
    <div className="max-w-2xl mx-auto py-1">
      <div className="flex gap-2 bg-background border border-muted-foreground rounded-xl overflow-hidden items-center justify-start">
        <div className="relative pl-2 size-24 shrink-0">
          <img
            className="rounded-md size-24 object-cover object-center transition duration-500"
            alt="thumbnail"
            src={stopImage ? stopImage : NoImage}
          />
        </div>

        <div className="flex flex-col gap-2 p-1">
          <h4 className="text-md text-muted-foreground font-bold">
            {attr.stopInfo.title}
          </h4>
          <p className="text-muted-foreground text-xs line-clamp-3">
            {attr.stopInfo.teaser}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex justify-start">
              <span className="flex items-center gap-1 bg-muted rounded-full px-3 py-1 text-xs mr-2 mb-2 hover:bg-primary hover:text-foreground">
                <Link size={12} />
                <a href={attr.wikiLink} target="_blank">
                  Read More
                </a>
              </span>
            </div>
            <div className="flex justify-end">
              <span className="flex items-center gap-1 bg-muted rounded-full px-3 py-1 text-xs mr-2 mb-2">
                <Footprints size={16} />
                DISTANCE m
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className=" rounded-lg overflow-hidden shadow-md border bg-background mx-auto my-4">
    //   <div className="px-3 py-1">
    //     <div className="font-bold mb-2">{page.title}</div>
    //     <p className="text-text-muted text-xs line-clamp-3">{page.extract}</p>
    //   </div>
    //   <div className="px-6 pt-4 pb-2">
    //     <span className="inline-block bg-primary rounded-full px-3 py-1 text-xs font-semibold text-primary-foreground mr-2 mb-2">
    //       #example
    //     </span>
    //     <span className="inline-block bg-secondary rounded-full px-3 py-1 text-xsfont-semibold text-secondary-foreground mr-2 mb-2">
    //       #tailwindcss
    //     </span>
    //   </div>
    // </div>
  );
};

export default TourPopup;
