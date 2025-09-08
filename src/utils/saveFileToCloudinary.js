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
  const filePath = file?.path;
  if (!filePath) {
    throw new Error('No file path provided to saveFileToCloudinary');
  }

  try {
    const upload = await cloudinary.uploader.upload(filePath, {
      folder: CLOUDINARY.FOLDER || 'contacts',
      overwrite: true,
    });
    return upload.secure_url; 
  } finally {
    await fs.rm(filePath, { force: true }).catch(() => {});
  }
};
