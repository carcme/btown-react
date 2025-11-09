import { AdvancedImage } from "@cloudinary/react";
import cld from "@/lib/cloudinary";
import { fill } from "@cloudinary/url-gen/actions/resize";

interface CloudinaryImageProps {
  publicId: string;
  width?: number;
  height?: number;
  alt: string;
  className?: string;
}

const CloudinaryImage = ({ publicId, width, height, alt, className }: CloudinaryImageProps) => {
  const myImage = cld.image(publicId);

  if (width && height) {
    myImage.resize(fill().width(width).height(height));
  } else if (width) {
    myImage.resize(fill().width(width));
  }

  return <AdvancedImage cldImg={myImage} alt={alt} className={className} />;
};

export default CloudinaryImage;