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

async function uploadTeamPhoto() {
  const photoPath = '/Users/dada/Downloads/theEuropaProject/DSC03255.jpg';
  if (!fs.existsSync(photoPath)) {
    console.error(`Team photo not found at ${photoPath}`);
    return;
  }

  try {
    console.log(`Uploading ${photoPath} to Cloudinary...`);
    const result = await cloudinary.uploader.upload(photoPath, {
      folder: 'europa-project',
      public_id: 'team_photo',
    });
    const teamPhotoUrl = result.secure_url;
    console.log(`✓ Uploaded team photo. URL: ${teamPhotoUrl}`);

    // Update src/data/cloudinary-assets.json
    const jsonPath = path.join(__dirname, '..', 'src', 'data', 'cloudinary-assets.json');
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      data.team = teamPhotoUrl;
      fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`✓ Updated ${jsonPath} with the team photo URL.`);
    } else {
      console.error(`Assets JSON not found at ${jsonPath}`);
    }
  } catch (err) {
    console.error('Error uploading team photo:', err.message || err);
  }
}

uploadTeamPhoto();
