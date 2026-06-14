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

async function uploadLogo(filePath, publicId) {
  try {
    console.log(`Uploading transparent logo: ${filePath}...`);
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'europa-project/logos',
      public_id: publicId,
      overwrite: true,
      invalidate: true,
    });
    console.log(`✓ Uploaded. URL: ${result.secure_url}`);
    return result.secure_url;
  } catch (err) {
    console.error(`✗ Error uploading ${publicId}:`, err.message || err);
    return null;
  }
}

async function run() {
  const jsonPath = path.join(__dirname, '..', 'src', 'data', 'cloudinary-assets.json');
  if (!fs.existsSync(jsonPath)) {
    console.error(`Error: Assets JSON file not found at ${jsonPath}`);
    return;
  }

  // Load current assets data
  const assets = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  const logoDir = '/Users/dada/Downloads/TheEuropaProject/transparent_logos';
  const logoFiles = [
    { file: 'act_government.png', key: 'act_government' },
    { file: 'go2025_nova_gorica.png', key: 'go2025_nova_gorica' },
    { file: 'rtv_slo.png', key: 'rtv_slo' },
    { file: 'walk_of_peace.png', key: 'walk_of_peace' },
    { file: 'ulvang.png', key: 'ulvang' },
    { file: 'durston.png', key: 'durston' },
  ];

  console.log('Starting transparent logo upload to Cloudinary...');
  
  if (!assets.logos) {
    assets.logos = {};
  }

  for (const logo of logoFiles) {
    const fullPath = path.join(logoDir, logo.file);
    if (fs.existsSync(fullPath)) {
      const secureUrl = await uploadLogo(fullPath, logo.key);
      if (secureUrl) {
        assets.logos[logo.key] = secureUrl;
      }
    } else {
      console.error(`Transparent logo not found at local path: ${fullPath}`);
    }
  }

  // Write updated asset data back to JSON
  fs.writeFileSync(jsonPath, JSON.stringify(assets, null, 2), 'utf8');
  console.log(`\n✓ Updated cloudinary-assets.json successfully at ${jsonPath}`);
}

run();
