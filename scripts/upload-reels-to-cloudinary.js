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

async function uploadVideo(filePath, options) {
  try {
    console.log(`Uploading video ${path.basename(filePath)} to Cloudinary...`);
    const result = await cloudinary.uploader.upload(filePath, {
      ...options,
      resource_type: 'video',
    });
    console.log(`✓ Uploaded. URL: ${result.secure_url}`);
    return result.secure_url;
  } catch (err) {
    console.error(`✗ Error uploading ${path.basename(filePath)}:`, err.message || err);
    return null;
  }
}

async function run() {
  const projectRoot = path.join(__dirname, '..');
  const instagramDir = path.join(projectRoot, 'public', 'instagram');
  const results = {};

  for (let i = 1; i <= 5; i++) {
    const videoPath = path.join(instagramDir, `reel_${i}.mp4`);
    if (fs.existsSync(videoPath)) {
      const url = await uploadVideo(videoPath, {
        folder: 'europa-project/reels',
        public_id: `reel_${i}`,
      });
      if (url) {
        results[`reel_${i}`] = url;
      }
    } else {
      console.warn(`File not found: ${videoPath}`);
    }
  }

  console.log('\n--- UPLOAD SUMMARY ---');
  console.log(JSON.stringify(results, null, 2));
}

run();
