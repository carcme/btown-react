import { Cloudinary } from "@cloudinary/url-gen";

// Replace 'YOUR_CLOUD_NAME' with your actual Cloudinary cloud name.
const cld = new Cloudinary({
  cloud: {
    cloudName: "YOUR_CLOUD_NAME",
  },
});

export default cld;
