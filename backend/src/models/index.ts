import mongoose, { Schema, Document } from 'mongoose';

// SavedJob
export const SavedJob = mongoose.model(
  'SavedJob',
  new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
      jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true, index: true }
    },
    { timestamps: true }
  ).index({ userId: 1, jobId: 1 }, { unique: true })
);

// Interview
export interface IInterviewDocument extends Document {
  jobId: mongoose.Types.ObjectId;
  candidateId: mongoose.Types.ObjectId;
  organizationId: mongoose.Types.ObjectId;
  scheduledBy: mongoose.Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  type: string;
  meetingLink?: string;
  location?: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED';
  notes?: string;
}

export const Interview = mongoose.model<IInterviewDocument>(
  'Interview',
  new Schema<IInterviewDocument>(
    {
      jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true, index: true },
      candidateId: { type: Schema.Types.ObjectId, ref: 'ProfessionalProfile', required: true, index: true },
      organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
      scheduledBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      date: { type: String, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
      type: { type: String, default: 'Video Call' },
      meetingLink: { type: String, default: '' },
      location: { type: String, default: '' },
      status: {
        type: String,
        enum: ['SCHEDULED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED'],
        default: 'SCHEDULED',
        index: true
      },
      notes: { type: String, default: '' }
    },
    { timestamps: true }
  )
);

// Conversation
export const Conversation = mongoose.model(
  'Conversation',
  new Schema(
    {
      participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
      lastMessage: { type: String, default: '' },
      lastMessageAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
  )
);

// Message
export const Message = mongoose.model(
  'Message',
  new Schema(
    {
      conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true, index: true },
      senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
      receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
      content: { type: String, required: true },
      attachments: [
        {
          name: String,
          url: String,
          type: { type: String },
          size: Number
        }
      ],
      readAt: { type: Date }
    },
    { timestamps: true }
  )
);

// Notification
export const Notification = mongoose.model(
  'Notification',
  new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
      type: { type: String, required: true },
      title: { type: String, required: true },
      message: { type: String, required: true },
      data: { type: Schema.Types.Mixed },
      isRead: { type: Boolean, default: false, index: true }
    },
    { timestamps: true }
  )
);

// Verification
export const Verification = mongoose.model(
  'Verification',
  new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
      professionalId: { type: Schema.Types.ObjectId, ref: 'ProfessionalProfile' },
      organizationId: { type: Schema.Types.ObjectId, ref: 'Organization' },
      documents: [
        {
          type: { type: String, required: true },
          documentNumber: String,
          fileUrl: { type: String, required: true },
          issuedBy: String,
          validThrough: String
        }
      ],
      status: {
        type: String,
        enum: ['UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED'],
        default: 'PENDING',
        index: true
      },
      reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
      reviewNotes: { type: String, default: '' },
      submittedAt: { type: Date, default: Date.now },
      reviewedAt: { type: Date }
    },
    { timestamps: true }
  )
);

// AuditLog
export const AuditLog = mongoose.model(
  'AuditLog',
  new Schema(
    {
      actorId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
      action: { type: String, required: true, index: true },
      entityType: { type: String, required: true },
      entityId: { type: String, required: true },
      metadata: { type: Schema.Types.Mixed }
    },
    { timestamps: true }
  )
);

// Blog
export const Blog = mongoose.model(
  'Blog',
  new Schema(
    {
      title: { type: String, required: true },
      slug: { type: String, required: true, unique: true, index: true },
      excerpt: { type: String, required: true },
      content: { type: String, required: true },
      category: { type: String, required: true, index: true },
      tags: [{ type: String }],
      coverImage: { type: String, default: '' },
      authorName: { type: String, required: true },
      authorRole: { type: String, default: 'Medical Contributor' },
      readTime: { type: String, default: '5 min read' },
      published: { type: Boolean, default: true, index: true },
      publishedAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
  )
);

// Subscription & Payment
export const Subscription = mongoose.model(
  'Subscription',
  new Schema(
    {
      organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
      plan: { type: String, enum: ['Starter', 'Growth', 'Enterprise'], default: 'Starter' },
      status: { type: String, enum: ['ACTIVE', 'PAST_DUE', 'CANCELLED'], default: 'ACTIVE' },
      startDate: { type: Date, default: Date.now },
      endDate: { type: Date },
      paymentProvider: { type: String, default: 'stripe' },
      providerSubscriptionId: { type: String }
    },
    { timestamps: true }
  )
);

export const Payment = mongoose.model(
  'Payment',
  new Schema(
    {
      organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
      amount: { type: Number, required: true },
      currency: { type: String, default: 'INR' },
      status: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED'], default: 'PENDING' },
      provider: { type: String, default: 'stripe' },
      transactionId: { type: String, required: true, unique: true },
      invoiceUrl: { type: String }
    },
    { timestamps: true }
  )
);
