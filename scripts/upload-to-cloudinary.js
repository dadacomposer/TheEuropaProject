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

async function uploadFile(filePath, options) {
  try {
    console.log(`Uploading ${filePath}...`);
    const result = await cloudinary.uploader.upload(filePath, options);
    console.log(`✓ Uploaded ${options.public_id || result.public_id}. URL: ${result.secure_url}`);
    return result.secure_url;
  } catch (err) {
    console.error(`✗ Error uploading ${filePath}:`, err.message || err);
    return null;
  }
}

async function uploadVideo(filePath, options) {
  try {
    console.log(`Uploading video ${filePath} (this might take a minute)...`);
    const result = await cloudinary.uploader.upload(filePath, {
      ...options,
      resource_type: 'video',
    });
    console.log(`✓ Uploaded video ${options.public_id || result.public_id}. URL: ${result.secure_url}`);
    return result.secure_url;
  } catch (err) {
    console.error(`✗ Error uploading video ${filePath}:`, err.message || err);
    return null;
  }
}

async function run() {
  const assets = {
    trailer: '',
    crew: [],
    logos: {},
  };

  // 1. Upload Video Trailer
  const trailerPath = '/Users/dada/Downloads/TheEuropaProject/EuropaProjectTrailer.mp4';
  if (fs.existsSync(trailerPath)) {
    const url = await uploadVideo(trailerPath, {
      folder: 'europa-project',
      public_id: 'europa_trailer',
    });
    assets.trailer = url;
  } else {
    console.error(`Trailer not found at ${trailerPath}`);
  }

  // 2. Upload Crew Images
  const brainDir = '/Users/dada/.gemini/antigravity/brain/4d8d6cd9-fdc9-4ab4-881c-30d3139c1c59';
  const crewFiles = [
    { file: 'media__1781431848646.png', name: 'rowena' },
    { file: 'media__1781431854303.png', name: 'crew_1' },
    { file: 'media__1781431856824.png', name: 'crew_2' },
    { file: 'media__1781431860587.png', name: 'crew_3' },
  ];

  for (const crew of crewFiles) {
    const fullPath = path.join(brainDir, crew.file);
    if (fs.existsSync(fullPath)) {
      const url = await uploadFile(fullPath, {
        folder: 'europa-project/crew',
        public_id: crew.name,
      });
      assets.crew.push({ name: crew.name, url });
    } else {
      console.error(`Crew image not found at ${fullPath}`);
    }
  }

  // 3. Upload Partner & Press Logos
  const logoDir = '/Users/dada/Downloads/TheEuropaProject';
  const logoFiles = [
    { file: 'logo ACT government.png', key: 'act_government' },
    { file: 'logo GO 2025 nova gorica.png', key: 'go2025_nova_gorica' },
    { file: 'logo rtv slo.png', key: 'rtv_slo' },
    { file: 'logo walk of peace.png', key: 'walk_of_peace' },
    { file: 'Ulvang_logo-black_RGB.webp', key: 'ulvang' },
    { file: 'durston logo.webp', key: 'durston' },
  ];

  for (const logo of logoFiles) {
    const fullPath = path.join(logoDir, logo.file);
    if (fs.existsSync(fullPath)) {
      const url = await uploadFile(fullPath, {
        folder: 'europa-project/logos',
        public_id: logo.key,
      });
      assets.logos[logo.key] = url;
    } else {
      console.error(`Logo not found at ${fullPath}`);
    }
  }

  // Save urls to src/data/cloudinary-assets.json
  const dataDir = path.join(__dirname, '..', 'src', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const jsonPath = path.join(dataDir, 'cloudinary-assets.json');
  fs.writeFileSync(jsonPath, JSON.stringify(assets, null, 2), 'utf8');
  console.log(`\nAssets JSON created successfully at ${jsonPath}`);
}

run();
