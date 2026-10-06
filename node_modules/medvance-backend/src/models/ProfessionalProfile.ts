import mongoose, { Schema, Document } from 'mongoose';

export interface IProfessionalProfileDocument extends Document {
  userId: mongoose.Types.ObjectId;
  headline: string;
  profession: string;
  specialization: string;
  bio: string;
  location: string;
  experienceYears: number;
  skills: string[];
  languages: string[];
  education: {
    degree: string;
    institution: string;
    yearOfPassing: number;
    gradeOrScore?: string;
  }[];
  licenses: {
    council: string;
    registrationNumber: string;
    stateOrCountry: string;
    validUntil: string;
    isVerified: boolean;
  }[];
  certifications: string[];
  workExperience: {
    title: string;
    hospitalOrCompany: string;
    location: string;
    startDate: string;
    endDate?: string;
    isCurrent: boolean;
    description: string;
  }[];
  expectedSalary: {
    min: number;
    max: number;
    currency: string;
    period: 'yearly' | 'monthly';
  };
  preferredLocations: string[];
  availability: string;
  profileCompletion: number;
  verificationStatus: 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED';
  resumeUrl?: string;
  calculateCompletion(): number;
}

const ProfessionalProfileSchema = new Schema<IProfessionalProfileDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    headline: { type: String, default: '' },
    profession: { type: String, required: true, index: true },
    specialization: { type: String, default: '', index: true },
    bio: { type: String, default: '' },
    location: { type: String, default: '', index: true },
    experienceYears: { type: Number, default: 0, index: true },
    skills: [{ type: String, index: true }],
    languages: [{ type: String }],
    education: [
      {
        degree: String,
        institution: String,
        yearOfPassing: Number,
        gradeOrScore: String
      }
    ],
    licenses: [
      {
        council: String,
        registrationNumber: String,
        stateOrCountry: String,
        validUntil: String,
        isVerified: { type: Boolean, default: false }
      }
    ],
    certifications: [{ type: String }],
    workExperience: [
      {
        title: String,
        hospitalOrCompany: String,
        location: String,
        startDate: String,
        endDate: String,
        isCurrent: Boolean,
        description: String
      }
    ],
    expectedSalary: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
      currency: { type: String, default: 'INR' },
      period: { type: String, enum: ['yearly', 'monthly'], default: 'yearly' }
    },
    preferredLocations: [{ type: String }],
    availability: { type: String, default: '1 Month' },
    profileCompletion: { type: Number, default: 20 },
    verificationStatus: { 
      type: String, 
      enum: ['UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED'], 
      default: 'UNVERIFIED',
      index: true 
    },
    resumeUrl: { type: String }
  },
  { timestamps: true }
);

ProfessionalProfileSchema.methods.calculateCompletion = function (): number {
  let score = 20; // baseline
  if (this.headline) score += 10;
  if (this.bio) score += 10;
  if (this.skills && this.skills.length >= 3) score += 15;
  if (this.education && this.education.length > 0) score += 15;
  if (this.workExperience && this.workExperience.length > 0) score += 15;
  if (this.licenses && this.licenses.length > 0) score += 10;
  if (this.resumeUrl) score += 5;
  this.profileCompletion = Math.min(score, 100);
  return this.profileCompletion;
};

export const ProfessionalProfile = mongoose.model<IProfessionalProfileDocument>(
  'ProfessionalProfile',
  ProfessionalProfileSchema
);
