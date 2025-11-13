import { Cloudinary } from "@cloudinary/url-gen";

export const cloudName = import.meta.env.VITE_CLOUDINARY_NAME; // Replace 'YOUR_CLOUD_NAME' with your actual Cloudinary cloud name.

const cld = new Cloudinary({
  cloud: {
    cloudName: cloudName,
  },
});

export default cld;
