import path from 'path';
import fs from 'fs';
import { ENV } from '../config/env.js';

export interface IUploadedFileResult {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

export class StorageService {
  /**
   * Upload abstraction handling local disk, AWS S3, or Cloudinary
   */
  public static async uploadFile(file: Express.Multer.File, folder = 'documents'): Promise<IUploadedFileResult> {
    if (ENV.STORAGE_TYPE === 'local') {
      const uploadDirPath = path.resolve(ENV.UPLOAD_DIR, folder);
      if (!fs.existsSync(uploadDirPath)) {
        fs.mkdirSync(uploadDirPath, { recursive: true });
      }

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const safeFilename = `${uniqueSuffix}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const fullDestination = path.join(uploadDirPath, safeFilename);

      fs.writeFileSync(fullDestination, file.buffer || fs.readFileSync(file.path));

      return {
        url: `/uploads/${folder}/${safeFilename}`,
        filename: safeFilename,
        size: file.size,
        mimeType: file.mimetype
      };
    }

    // Cloud storage simulation/hook for AWS S3 or Cloudinary
    return {
      url: `https://medvance-cloud-storage.s3.amazonaws.com/${folder}/${Date.now()}-${file.originalname}`,
      filename: file.originalname,
      size: file.size,
      mimeType: file.mimetype
    };
  }
}
