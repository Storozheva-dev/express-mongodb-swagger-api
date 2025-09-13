import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs/promises';

const tempDir = path.join(process.cwd(), 'temp');

await fs.mkdir(tempDir, { recursive: true }).catch(() => {});

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, tempDir),
  filename: (_req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname || '');
    cb(null, `${unique}${ext}`.toLowerCase());
  },
});

const fileFilter = (_req, file, cb) => {
  const ok = /^image\/(jpe?g|png|webp|gif|bmp|tiff?)$/i.test(file.mimetype);
  cb(ok ? null : new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'photo'), ok);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 }, 
});
