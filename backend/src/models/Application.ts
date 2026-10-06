import mongoose, { Schema, Document } from 'mongoose';

export interface IApplicationDocument extends Document {
  jobId: mongoose.Types.ObjectId;
  professionalId: mongoose.Types.ObjectId;
  organizationId: mongoose.Types.ObjectId;
  status: 'APPLIED' | 'UNDER_REVIEW' | 'SHORTLISTED' | 'INTERVIEW' | 'OFFER' | 'HIRED' | 'REJECTED';
  coverLetter?: string;
  resumeUrl?: string;
  matchScore: number;
  matchDetails?: {
    matchedSkills: string[];
    missingSkills: string[];
    reasons: string[];
  };
  notes: string[];
  appliedAt: Date;
}

const ApplicationSchema = new Schema<IApplicationDocument>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true, index: true },
    professionalId: { type: Schema.Types.ObjectId, ref: 'ProfessionalProfile', required: true, index: true },
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
    status: {
      type: String,
      enum: ['APPLIED', 'UNDER_REVIEW', 'SHORTLISTED', 'INTERVIEW', 'OFFER', 'HIRED', 'REJECTED'],
      default: 'APPLIED',
      index: true
    },
    coverLetter: { type: String, default: '' },
    resumeUrl: { type: String },
    matchScore: { type: Number, default: 0 },
    matchDetails: {
      matchedSkills: [{ type: String }],
      missingSkills: [{ type: String }],
      reasons: [{ type: String }]
    },
    notes: [{ type: String }],
    appliedAt: { type: Date, default: Date.now, index: true }
  },
  { timestamps: true }
);

ApplicationSchema.index({ jobId: 1, professionalId: 1 }, { unique: true });

export const Application = mongoose.model<IApplicationDocument>('Application', ApplicationSchema);
