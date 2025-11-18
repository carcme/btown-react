import { useCommonsImage } from "@/lib/useCommonsImage";
import { cn } from "@/lib/utils";
import AlertBox from "./AlertBox";
import { ImageZoom } from "./ui/image-zoom";

interface CommonsImageProps {
  url: string;
  width: number;
  alt?: string;
  className: string;
}

export function CommonsImage({
  url,
  width = 330,
  alt,
  className,
}: CommonsImageProps) {
  const { src, error } = useCommonsImage(url, width);

  if (error) {
    return <AlertBox title={"Unable to load Wikimedia image"} desc={error} />;
  }

  if (!src) {
    return (
      <div
        className={cn(
          "animate-pulse bg-muted-foreground rounded-md",
          className
        )}
        // style={{ width, height: width * 0.65 }}
      />
    );
  }

  const fallbackAlt =
    alt ||
    decodeURIComponent(url.split("File:")[1] || "Wikimedia Commons image");

  return (
    <ImageZoom>
      <img
        src={src}
        width={width}
        alt={fallbackAlt}
        className={cn("", className)}
        loading="lazy"
      />
    </ImageZoom>
  );
}
