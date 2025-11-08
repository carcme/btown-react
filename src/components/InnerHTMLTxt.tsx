import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronUp } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { ImageZoom } from "@/components/ui/image-zoom";
import type { AccordionProps } from "./AttractionAccordion";

const InnerHTMLTxt = ({ array, title }: AccordionProps) => {
  return (
    <div className="sm:flex sm:justify-center sm:max-w-3xl sm:mx-auto max-w-2xl">
      <AccordionItem value={title} className="flex flex-col max-w-4xl w-full">
        <AccordionTrigger className="text-xl ">{title}</AccordionTrigger>

        <AccordionContent className="font-spinnaker text-base text-pretty">
          {array.map((txt, index) => {
            if (txt.includes("src")) {
              const split = txt.split("<img src=");
              split[1] = split[1].substring(0, split[1].length - 1);

              return (
                <div key={index} className="p-2 ">
                  <Separator className="mb-6 max-w-56 mx-auto " />
                  <ImageZoom>
                    <img
                      className="w-3xl h-96 object-cover"
                      src={split[1]}
                      alt={split[0]}
                    />
                  </ImageZoom>
                  <div className="flex items-center py-1 text-sm gap-2">
                    <ChevronUp size={16} />
                    <p>{split[0]}</p>
                  </div>
                </div>
              );
            } else {
              return (
                <p
                  className="p-2 object-cover flex-col flex [&>ul]:pl-8"
                  key={index}
                  dangerouslySetInnerHTML={{ __html: txt }}
                ></p>
              );
            }
          })}
        </AccordionContent>
        {/* <hr className="h-px my-8 mx-8 bg-gray-200 border-0 " /> */}
      </AccordionItem>
    </div>
  );
};

export default InnerHTMLTxt;
