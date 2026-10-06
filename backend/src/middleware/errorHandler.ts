import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { ApiResponse } from '../utils/apiResponse.js';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[Global Error]', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error occurred';
  const code = err.code || 'SERVER_ERROR';
  const errors = err.errors || [];

  return ApiResponse.error(res, message, statusCode, code, errors);
};

// Safe Multer storage configuration with 10MB limits & MIME filtering
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file format. Allowed: PDF, JPG, PNG, WEBP, DOC, DOCX'));
    }
  }
});
