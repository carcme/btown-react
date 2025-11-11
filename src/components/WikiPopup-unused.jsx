import React from "react";
import { Link } from "@tanstack/react-router";
import { firebaseImage } from "@/lib/utils";
import { AdvancedImage } from "@cloudinary/react";
import CloudinaryImage from "./CloudinaryImage";

const SummaryListItem = ({ tourID, poi }) => {
  const stopImage = firebaseImage(poi.stopImageFile);

  return (
    <>
      <Link to="/attraction" state={{ tourId: tourID, attractionId: poi.id }}>
        <div className="border border-muted border-opacity-60 shadow-md rounded p-2 mb-2 flex">
          <div className="shrink-0 flex items-center ">
            <CloudinaryImage
              publicId={poi.stopImageFile}
              w={600}
              alt={poi.stopName}
              className="rounded-full w-69 h-24 object-cover"
            />
            <img
              className="rounded-full w-24 h-24 object-cover"
              src={stopImage}
              alt={poi.stopName}
            />
          </div>
          <div className="ml-4 flex flex-col justify-between">
            <div className="flex items-center mb-2">
              <div className="bg-green-500 w-4 h-4 flex items-center justify-center rounded mr-2"></div>
              <h2 className="">{poi.stopName}</h2>
            </div>
            <div className="flex ">
              <div>
                {poi.stopInfo.teaser.map((txt, index) => {
                  return (
                    <p key={index} className=" text-xs text-muted-foreground">
                      {txt}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default SummaryListItem;
