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

async function uploadLogo() {
  const logoPath = '/Users/dada/Downloads/TheEuropaProject/The Europa Project logo.png';
  if (!fs.existsSync(logoPath)) {
    console.error(`Logo not found at ${logoPath}`);
    return;
  }

  try {
    console.log(`Uploading ${logoPath} to Cloudinary...`);
    const result = await cloudinary.uploader.upload(logoPath, {
      folder: 'europa-project',
      public_id: 'europa_project_logo',
    });
    const logoUrl = result.secure_url;
    console.log(`✓ Uploaded project logo. URL: ${logoUrl}`);

    // Update src/data/cloudinary-assets.json
    const jsonPath = path.join(__dirname, '..', 'src', 'data', 'cloudinary-assets.json');
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      data.logo = logoUrl;
      fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`✓ Updated ${jsonPath} with the logo URL.`);
    } else {
      console.error(`Assets JSON not found at ${jsonPath}`);
    }
  } catch (err) {
    console.error('Error uploading logo:', err.message || err);
  }
}

uploadLogo();
