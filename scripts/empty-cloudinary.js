import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function emptyCloudinary() {
  const resourceTypes = ['image', 'video', 'raw'];
  console.log('Starting Cloudinary cleanup...');
  
  for (const type of resourceTypes) {
    try {
      console.log(`Deleting all resources of type: ${type}...`);
      const result = await cloudinary.api.delete_all_resources({ resource_type: type });
      console.log(`Result for ${type}:`, result);
    } catch (err) {
      console.error(`Error deleting ${type} resources:`, err.message || err);
    }
  }
  console.log('Cloudinary cleanup complete!');
}

emptyCloudinary();
