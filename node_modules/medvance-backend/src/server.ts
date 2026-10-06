import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { Server as SocketIOServer } from 'socket.io';
import { ENV } from './config/env.js';
import { connectDatabase } from './config/db.js';
import apiRouter from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { registerSocketHandlers } from './sockets/socketHandler.js';

const app = express();
const server = http.createServer(app);

// Security & Parsing Middlewares
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  })
);
app.use(
  cors({
    origin: [ENV.CORS_ORIGIN, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads serving
app.use('/uploads', express.static(path.resolve(ENV.UPLOAD_DIR)));

// Socket.IO setup
export const io = new SocketIOServer(server, {
  cors: {
    origin: [ENV.CORS_ORIGIN, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true
  }
});
registerSocketHandlers(io);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'MedVance AI Healthcare Core API', timestamp: new Date() });
});

// Primary REST API v1 routes
app.use('/api/v1', apiRouter);

// Global Error Handler
app.use(errorHandler);

// Connect DB and Start Server
const startServer = async () => {
  await connectDatabase();
  server.listen(ENV.PORT, () => {
    console.log(`[MedVance Core] Server running smoothly on http://localhost:${ENV.PORT}`);
    console.log(`[MedVance Core] Real-time Socket.IO enabled`);
  });
};

startServer();
registerSocketHandlers(io);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'MedVance AI Healthcare Core API', timestamp: new Date() });
});

// Primary REST API v1 routes
app.use('/api/v1', apiRouter);

// Global Error Handler
app.use(errorHandler);

// Connect DB and Start Server
const startServer = async () => {
  await connectDatabase();
  server.listen(ENV.PORT, () => {
    console.log(`[MedVance Core] Server running smoothly on http://localhost:${ENV.PORT}`);
    console.log(`[MedVance Core] Real-time Socket.IO enabled`);
  });
};

startServer();
