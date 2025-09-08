import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.config({
  secure: true,
  cloud_name: CLOUDINARY.CLOUD_NAME,
  api_key: CLOUDINARY.API_KEY,
  api_secret: CLOUDINARY.API_SECRET,
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.uploader.upload(file.path, {
    folder: CLOUDINARY.FOLDER || 'contacts',
  });

  await fs.unlink(file.path);
  return response;
};
