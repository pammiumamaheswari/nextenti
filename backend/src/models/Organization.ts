import mongoose, { Schema, Document } from 'mongoose';

export interface IOrganizationDocument extends Document {
  ownerId: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  logo?: string;
  description: string;
  organizationType: string;
  specialties: string[];
  locations: string[];
  website?: string;
  contactEmail: string;
  phone: string;
  bedCount?: number;
  accreditations?: string[];
  verificationStatus: 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED';
  subscriptionPlan: 'Starter' | 'Growth' | 'Enterprise';
  isActive: boolean;
}

const OrganizationSchema = new Schema<IOrganizationDocument>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true, index: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    logo: { type: String, default: '' },
    description: { type: String, default: '' },
    organizationType: { type: String, required: true, index: true },
    specialties: [{ type: String, index: true }],
    locations: [{ type: String, index: true }],
    website: { type: String, default: '' },
    contactEmail: { type: String, required: true },
    phone: { type: String, required: true },
    bedCount: { type: Number, default: 0 },
    accreditations: [{ type: String }],
    verificationStatus: { 
      type: String, 
      enum: ['UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED'], 
      default: 'UNVERIFIED',
      index: true 
    },
    subscriptionPlan: {
      type: String,
      enum: ['Starter', 'Growth', 'Enterprise'],
      default: 'Starter'
    },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Organization = mongoose.model<IOrganizationDocument>('Organization', OrganizationSchema);
