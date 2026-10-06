import { Server as SocketIOServer, Socket } from 'socket.io';

export const registerSocketHandlers = (io: SocketIOServer) => {
  io.on('connection', (socket: Socket) => {
    console.log(`[Socket.IO] Client connected: ${socket.id}`);

    // Join authenticated user personal room for private notifications
    socket.on('join_user_channel', (userId: string) => {
      socket.join(`user_${userId}`);
      console.log(`[Socket.IO] Socket ${socket.id} joined personal room user_${userId}`);
    });

    // Join active conversation room
    socket.on('join_conversation', (conversationId: string) => {
      socket.join(`conversation_${conversationId}`);
      console.log(`[Socket.IO] Socket ${socket.id} joined conversation_${conversationId}`);
    });

    socket.on('typing_start', ({ conversationId, userName }: { conversationId: string; userName: string }) => {
      socket.to(`conversation_${conversationId}`).emit('user_typing', { userName, isTyping: true });
    });

    socket.on('typing_stop', ({ conversationId }: { conversationId: string }) => {
      socket.to(`conversation_${conversationId}`).emit('user_typing', { isTyping: false });
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
    });
  });
};
