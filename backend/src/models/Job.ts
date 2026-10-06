import mongoose, { Schema, Document } from 'mongoose';

export interface IJobDocument extends Document {
  organizationId: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  profession: string;
  specialization: string;
  department: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  qualifications: string[];
  skills: string[];
  experienceMin: number;
  experienceMax: number;
  salaryMin: number;
  salaryMax: number;
  salaryNegotiable: boolean;
  location: string;
  workMode: 'On-site' | 'Hybrid' | 'Remote' | 'Shift-based';
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Locum' | 'Fellowship' | 'Residency';
  status: 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'CLOSED' | 'EXPIRED';
  applicationCount: number;
  viewCount: number;
  postedAt: Date;
  closingDate?: Date;
}

const JobSchema = new Schema<IJobDocument>(
  {
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
    title: { type: String, required: true, trim: true, index: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    profession: { type: String, required: true, index: true },
    specialization: { type: String, default: '', index: true },
    department: { type: String, default: '' },
    description: { type: String, required: true },
    responsibilities: [{ type: String }],
    requirements: [{ type: String }],
    qualifications: [{ type: String }],
    skills: [{ type: String, index: true }],
    experienceMin: { type: Number, default: 0, index: true },
    experienceMax: { type: Number, default: 20, index: true },
    salaryMin: { type: Number, default: 0, index: true },
    salaryMax: { type: Number, default: 0, index: true },
    salaryNegotiable: { type: Boolean, default: true },
    location: { type: String, required: true, index: true },
    workMode: { 
      type: String, 
      enum: ['On-site', 'Hybrid', 'Remote', 'Shift-based'], 
      default: 'On-site',
      index: true
    },
    jobType: { 
      type: String, 
      enum: ['Full-time', 'Part-time', 'Contract', 'Locum', 'Fellowship', 'Residency'], 
      default: 'Full-time',
      index: true
    },
    status: { 
      type: String, 
      enum: ['DRAFT', 'ACTIVE', 'PAUSED', 'CLOSED', 'EXPIRED'], 
      default: 'ACTIVE',
      index: true
    },
    applicationCount: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },
    postedAt: { type: Date, default: Date.now, index: true },
    closingDate: { type: Date }
  },
  { timestamps: true }
);

// Compound indexes for lightning fast search performance
JobSchema.index({ profession: 1, location: 1, status: 1 });
JobSchema.index({ title: 'text', description: 'text', skills: 'text' });

export const Job = mongoose.model<IJobDocument>('Job', JobSchema);
