import { useState } from "react";
import axios from "axios";
import cld from "@/lib/cloudinary";

const ImageUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    // Replace 'YOUR_UPLOAD_PRESET' with your actual Cloudinary upload preset.
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD;
    const url = `https://api.cloudinary.com/v1_1/${cld.cloudinaryConfig.cloud.cloudName}/image/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(url, formData);
      setImageUrl(response.data.secure_url);
      setError(null);
    } catch (err) {
      setError("Image upload failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {imageUrl && (
        <div>
          <p>Image uploaded successfully!</p>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "300px" }} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
