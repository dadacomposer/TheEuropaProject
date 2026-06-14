import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

cloudinary.uploader.upload('./public/P1000660.jpg', {
  folder: 'europa-project',
  public_id: 'P1000660',
  resource_type: 'image'
}).then(result => {
  console.log("Uploaded successfully. URL:", result.secure_url);
}).catch(error => {
  console.error("Error uploading:", error);
});
