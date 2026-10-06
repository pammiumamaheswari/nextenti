import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000', 10),
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/medvance_ai',
  JWT_SECRET: process.env.JWT_SECRET || 'medvance_super_secret_jwt_key_2026_production',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'medvance_refresh_secret_token_key_2026',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '15m',
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  STORAGE_TYPE: (process.env.STORAGE_TYPE || 'local') as 'local' | 's3' | 'cloudinary',
  UPLOAD_DIR: process.env.UPLOAD_DIR || './uploads',
  AI_API_KEY: process.env.AI_API_KEY || '',
  AI_PROVIDER: process.env.AI_PROVIDER || 'mock-fallback', // 'openai' | 'gemini' | 'mock-fallback'
  EMAIL_PROVIDER: process.env.EMAIL_PROVIDER || 'smtp', // 'smtp' | 'resend' | 'sendgrid'
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.mailtrap.io',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '2525', 10),
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  EMAIL_FROM: process.env.EMAIL_FROM || 'MedVance AI <noreply@medvance.ai>',
  PAYMENT_PROVIDER: process.env.PAYMENT_PROVIDER || 'stripe', // 'stripe' | 'razorpay'
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || '',
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || ''
};
