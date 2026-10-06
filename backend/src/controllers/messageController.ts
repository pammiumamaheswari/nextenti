import { Response } from 'express';
import { Conversation, Message, User } from '../models/index.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { AuthRequest } from '../middleware/auth.js';
import { io } from '../server.js';

export class MessageController {
  public static async getConversations(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return ApiResponse.error(res, 'Unauthorized', 401);

      const conversations = await Conversation.find({ participants: req.user.userId })
        .populate('participants', 'name email avatar role')
        .sort({ updatedAt: -1 });

      return ApiResponse.success(res, conversations, 'Conversations loaded');
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async getMessages(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return ApiResponse.error(res, 'Unauthorized', 401);
      const { conversationId } = req.params;

      const messages = await Message.find({ conversationId })
        .populate('senderId', 'name avatar role')
        .sort({ createdAt: 1 });

      return ApiResponse.success(res, messages, 'Messages fetched');
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }

  public static async sendMessage(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return ApiResponse.error(res, 'Unauthorized', 401);
      const { conversationId, receiverId, content, attachments } = req.body;

      let convId = conversationId;
      if (!convId) {
        // Create new conversation
        const newConv = await Conversation.create({
          participants: [req.user.userId, receiverId],
          lastMessage: content,
          lastMessageAt: new Date()
        });
        convId = newConv._id;
      } else {
        await Conversation.findByIdAndUpdate(convId, {
          lastMessage: content,
          lastMessageAt: new Date()
        });
      }

      const message = await Message.create({
        conversationId: convId,
        senderId: req.user.userId,
        receiverId,
        content,
        attachments: attachments || []
      });

      const populated = await Message.findById(message._id).populate('senderId', 'name avatar role');

      if (io) {
        io.to(`conversation_${convId.toString()}`).emit('new_message', populated);
        io.to(`user_${receiverId}`).emit('message_notification', populated);
      }

      return ApiResponse.success(res, populated, 'Message sent', 201);
    } catch (err: any) {
      return ApiResponse.error(res, err.message, 500);
    }
  }
}
