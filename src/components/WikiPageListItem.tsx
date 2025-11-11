import { Link, useLocation } from "@tanstack/react-router";
import type { WikiPage } from "./map/WikiType";
import { useEffect } from "react";

const WikiPageListItem = ({
  item,
  pages,
  tourId,
  attractionId,
}: {
  item: WikiPage;
  tourId: number;
  attractionId: number;
}) => {
  const location = useLocation();
  if (!item) {
    console.log("No page data found. Please navigate from the map");
    return <div>No page data found. Please navigate from the map.</div>;
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location]);

  return (
    <>
      <Link
        to="/wikipedia/$tourId/$attractionId"
        state={{ pages: pages, page: item }}
        params={{
          tourId: tourId.toString(),
          attractionId: attractionId.toString(),
        }}
      >
        <div className="border border-muted border-opacity-60 shadow-md rounded p-2 mb-2 flex">
          <div className="shrink-0 flex items-center ">
            <img
              className="rounded-full size-20 object-cover"
              src={item.thumbnail.source}
              alt={item.title}
            />
          </div>
          <div className="ml-4 flex flex-col justify-between">
            <div className="flex items-center mb-2">
              <div className="bg-green-500 w-4 h-4 flex items-center justify-center rounded mr-2"></div>
              <h2 className="">{item.title}</h2>
            </div>
            <div className="flex ">
              <p className=" text-sm text-muted-foreground line-clamp-3">
                {item.extract}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default WikiPageListItem;
