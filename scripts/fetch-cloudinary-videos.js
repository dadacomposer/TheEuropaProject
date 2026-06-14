import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function fetchVideos() {
  console.log('Fetching video resources from Cloudinary...');
  try {
    const result = await cloudinary.api.resources({
      resource_type: 'video',
      max_results: 100,
    });

    const videos = result.resources.map(r => ({
      public_id: r.public_id,
      secure_url: r.secure_url,
      format: r.format,
      width: r.width,
      height: r.height,
      created_at: r.created_at,
      duration: r.duration || 0,
      title: r.public_id.split('/').pop().replace(/[-_]/g, ' '),
    }));

    const dataDir = path.join(__dirname, '..', 'src', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const jsonPath = path.join(dataDir, 'cloudinary-videos.json');
    fs.writeFileSync(jsonPath, JSON.stringify(videos, null, 2), 'utf8');
    console.log(`Successfully fetched ${videos.length} videos and wrote to ${jsonPath}`);
  } catch (err) {
    console.error('Error fetching videos from Cloudinary:', err.message || err);
    const dataDir = path.join(__dirname, '..', 'src', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const jsonPath = path.join(dataDir, 'cloudinary-videos.json');
    if (!fs.existsSync(jsonPath)) {
      fs.writeFileSync(jsonPath, JSON.stringify([], null, 2), 'utf8');
    }
  }
}

fetchVideos();
