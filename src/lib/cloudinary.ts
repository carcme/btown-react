import { Cloudinary } from "@cloudinary/url-gen";

// Replace 'YOUR_CLOUD_NAME' with your actual Cloudinary cloud name.
const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
  },
});

export default cld;
