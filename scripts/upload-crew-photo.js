import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadCrewPhoto() {
  const photoPath = '/Users/dada/Downloads/TheEuropaProject/P1000814.jpg';
  if (!fs.existsSync(photoPath)) {
    console.error(`Crew photo not found at ${photoPath}`);
    return;
  }

  try {
    console.log(`Uploading ${photoPath} to Cloudinary...`);
    const result = await cloudinary.uploader.upload(photoPath, {
      folder: 'europa-project',
      public_id: 'crew_photo_p1000814',
    });
    const crewPhotoUrl = result.secure_url;
    console.log(`✓ Uploaded crew photo. URL: ${crewPhotoUrl}`);

    // Update src/data/cloudinary-assets.json
    const jsonPath = path.join(__dirname, '..', 'src', 'data', 'cloudinary-assets.json');
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      data.crewPhotoP1000814 = crewPhotoUrl;
      fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`✓ Updated ${jsonPath} with the crew photo URL.`);
    } else {
      console.error(`Assets JSON not found at ${jsonPath}`);
    }
  } catch (err) {
    console.error('Error uploading crew photo:', err.message || err);
  }
}

uploadCrewPhoto();
