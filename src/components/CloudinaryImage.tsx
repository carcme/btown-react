import { AdvancedImage } from "@cloudinary/react";
import cld from "@/lib/cloudinary";
import { fill } from "@cloudinary/url-gen/actions/resize";

interface CloudinaryImageProps {
  publicId: string | undefined;
  w?: number;
  h?: number;
  alt: string;
  className?: string;
}

const CloudinaryImage = ({
  publicId,
  w,
  h,
  alt,
  className,
}: CloudinaryImageProps) => {
  if (publicId === undefined) return null;

  const myImage = cld.image(publicId);

  if (w && h) {
    myImage.resize(fill().width(w).height(h));
  } else if (w) {
    myImage.resize(fill().width(w));
  }

  return <AdvancedImage cldImg={myImage} alt={alt} className={className} />;
};

export default CloudinaryImage;
