import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const scratchDir = '/Users/dada/.gemini/antigravity/brain/4d8d6cd9-fdc9-4ab4-881c-30d3139c1c59/scratch';

const fileMapping = {
  reel_1: 'SnapInsta.to_AQNm30Jjlv-_CZAfImKS8jrSFokj8iabuZjixanLUwQiLXD-363TwBQG2v1sDwGnj4gFIniex6A5yy_UwarOeuEh61vRYrvryxXb_EQ_frame.jpg',
  reel_2: 'SnapInsta.to_AQP1Kxb_LwTknkAyJbTXbIcKMGq_eSl0E4CJsWo2gwtgWLF3jbyQhGNzQsHFAYhrstc2w9Q5Gjzxs6jCqG4gIZ1oTBPCIpNRAD4Rw34_frame.jpg',
  reel_3: 'SnapInsta.to_AQOBQng3BywqSyJ92_U-itdr5uUI05bW2ZORmXMkWr7Fh9DfE5Rn_i3BwAsZHUJYZ_JSx7qqBCaLzh-xfPKQVzL5GWCgz3GdGmiHYPU_frame.jpg',
  reel_4: 'SnapInsta.to_AQNSQA87oYVxKJLKNerMdSkm-KPpK3AjR2HH1qfj3-ilOOjkjekmL7pPxnNBpvQy3HV53vJKXz2RJ-o7xaASf0-DBGaT5N0v3K3-I0U_frame.jpg',
  reel_5: 'SnapInsta.to_AQMwBnCPbyoLD_y6Nu44h6lgZ32-dArq6_ZpIGCS37KdBT9ACPraLB0LgogYkj8rPKogSFZrj_-oHEmnaCYKNlIsAH0n-mmZH34cT54_frame.jpg',
};

async function uploadImage(filePath, publicId) {
  try {
    console.log(`Uploading actual thumbnail ${path.basename(filePath)} to Cloudinary as ${publicId}...`);
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'europa-project/reels',
      public_id: publicId,
      overwrite: true,
      invalidate: true,
      resource_type: 'image',
    });
    console.log(`✓ Uploaded. URL: ${result.secure_url}`);
    return result.secure_url;
  } catch (err) {
    console.error(`✗ Error uploading ${path.basename(filePath)}:`, err.message || err);
    return null;
  }
}

async function run() {
  const results = {};

  for (const [reelKey, filename] of Object.entries(fileMapping)) {
    const fullPath = path.join(scratchDir, filename);
    if (fs.existsSync(fullPath)) {
      const secureUrl = await uploadImage(fullPath, `${reelKey}_actual_thumb`);
      if (secureUrl) {
        results[reelKey] = secureUrl;
      }
    } else {
      console.warn(`File not found: ${fullPath}`);
    }
  }

  console.log('\n--- UPLOAD SUMMARY ---');
  console.log(JSON.stringify(results, null, 2));
}

run();
