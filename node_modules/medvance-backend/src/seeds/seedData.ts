import mongoose from 'mongoose';
import { User, ProfessionalProfile, Organization, Job, Blog } from '../models/index.js';
import { ENV } from '../config/env.js';

export const seedDatabase = async () => {
  try {
    console.log('[Seed] Connecting to MongoDB...');
    await mongoose.connect(ENV.MONGODB_URI);
    console.log('[Seed] Connected. Clearing existing collections...');

    await Promise.all([
      User.deleteMany({}),
      ProfessionalProfile.deleteMany({}),
      Organization.deleteMany({}),
      Job.deleteMany({}),
      Blog.deleteMany({})
    ]);

    // 1. CREATE SUPER ADMIN
    const adminUser = await User.create({
      name: 'Dr. Rajesh Sharma',
      email: 'admin@medvance.ai',
      phone: '+91 98765 43210',
      passwordHash: 'Admin@MedVance2026',
      role: 'SUPER_ADMIN',
      isEmailVerified: true,
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80'
    });

    // 2. CREATE HEALTHCARE ORGANIZATIONS & RECRUITERS
    const orgData = [
      {
        name: 'NovaCare Health Institute',
        slug: 'novacare-health',
        type: 'Hospital',
        email: 'careers@novacare.health',
        phone: '+91 40 4567 8900',
        city: 'Hyderabad',
        description: '550-bed quaternary care teaching hospital and research powerhouse specializing in oncology, cardiology, and robotic surgery.',
        logo: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=200&auto=format&fit=crop&q=80',
        bedCount: 550,
        accreditations: ['NABH Accredited', 'JCI Gold Seal', 'NABL Certified']
      },
      {
        name: 'Medisphere Hospitals & Research',
        slug: 'medisphere-hospitals',
        type: 'Hospital',
        email: 'talent@medisphere.org',
        phone: '+91 80 3988 1200',
        city: 'Bangalore',
        description: 'Multi-super specialty medical network with specialized centers of excellence for neurosciences, organ transplants, and trauma care.',
        logo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200&auto=format&fit=crop&q=80',
        bedCount: 750,
        accreditations: ['NABH Accredited', 'AERB Approved']
      },
      {
        name: 'Vitalis Diagnostics & Genomics',
        slug: 'vitalis-diagnostics',
        type: 'Diagnostic Center',
        email: 'recruitment@vitalis.in',
        phone: '+91 22 2654 3300',
        city: 'Mumbai',
        description: 'Next-generation molecular pathology, genetics laboratory and advanced imaging network across western and southern India.',
        logo: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=200&auto=format&fit=crop&q=80',
        accreditations: ['CAP Accredited', 'NABL Certified']
      },
      {
        name: 'CareBridge Medical Centers',
        slug: 'carebridge-medical',
        type: 'Clinic',
        email: 'hr@carebridge.co.in',
        phone: '+91 44 4233 1100',
        city: 'Chennai',
        description: 'Rapidly expanding network of ambulatory care clinics and pediatric centers dedicated to accessible primary and preventive care.',
        logo: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=200&auto=format&fit=crop&q=80',
        bedCount: 120,
        accreditations: ['NABH Entry Level']
      },
      {
        name: 'Aurelia Health Innovations',
        slug: 'aurelia-health',
        type: 'Healthcare Startup',
        email: 'people@aureliahealth.io',
        phone: '+91 20 6711 9000',
        city: 'Pune',
        description: 'Digital health and clinical AI telemedicine startup creating automated triage and remote intensive care monitoring suites.',
        logo: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=200&auto=format&fit=crop&q=80',
        accreditations: ['HIPAA Certified', 'ISO 27001']
      }
    ];

    const createdOrgs = [];
    for (const item of orgData) {
      const recruiterUser = await User.create({
        name: `${item.name} HR Team`,
        email: item.email,
        phone: item.phone,
        passwordHash: 'Recruiter@MedVance2026',
        role: 'ORGANIZATION_ADMIN',
        isEmailVerified: true
      });

      const org = await Organization.create({
        ownerId: recruiterUser._id,
        name: item.name,
        slug: item.slug,
        organizationType: item.type,
        description: item.description,
        logo: item.logo,
        contactEmail: item.email,
        phone: item.phone,
        locations: [item.city, 'Hyderabad', 'Bangalore'],
        specialties: ['Cardiology', 'Neurology', 'Oncology', 'Critical Care', 'Diagnostics'],
        bedCount: item.bedCount || 0,
        accreditations: item.accreditations,
        verificationStatus: 'VERIFIED',
        subscriptionPlan: 'Enterprise'
      });
      createdOrgs.push(org);
    }

    // 3. CREATE REALISTIC HEALTHCARE PROFESSIONALS
    const professionalProfiles = [
      {
        name: 'Dr. Ananya Rao',
        email: 'ananya.rao@medvance.demo',
        phone: '+91 94451 22345',
        headline: 'Senior Interventional Cardiologist | MD, DM Cardiology (AIIMS)',
        profession: 'Doctor',
        specialization: 'Cardiology',
        location: 'Hyderabad',
        experienceYears: 8,
        skills: ['Coronary Angioplasty', 'Echocardiography', 'Heart Failure Management', 'TAVR', 'Clinical Research', 'ICU Care'],
        bio: 'Board-certified Interventional Cardiologist with extensive fellowship training in complex coronary interventions and structural heart disease. Passionate about evidence-based clinical protocols and preventive cardiac health.',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80',
        verificationStatus: 'VERIFIED',
        profileCompletion: 95
      },
      {
        name: 'Dr. Arjun Mehta',
        email: 'arjun.mehta@medvance.demo',
        phone: '+91 98112 33456',
        headline: 'Consultant Neurologist & Stroke Specialist | DM Neurology (NIMHANS)',
        profession: 'Doctor',
        specialization: 'Neurology',
        location: 'Bangalore',
        experienceYears: 6,
        skills: ['Acute Stroke Thrombolysis', 'Epileptology', 'Electromyography (EMG)', 'Neurocritical Care', 'Botox for Migraine'],
        bio: 'Practicing Neurologist focused on acute ischemic stroke interventions, neuro-telemetry, and neuro-degenerative disorders with 14 peer-reviewed international publications.',
        avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&auto=format&fit=crop&q=80',
        verificationStatus: 'VERIFIED',
        profileCompletion: 90
      },
      {
        name: 'Priya Nair',
        email: 'priya.nair@medvance.demo',
        phone: '+91 97401 55678',
        headline: 'Lead Critical Care Staff Nurse | B.Sc Nursing, Critical Care Fellowship',
        profession: 'Nurse',
        specialization: 'Critical Care / ICU',
        location: 'Mumbai',
        experienceYears: 5,
        skills: ['Mechanical Ventilation Support', 'Arterial Cannulation', 'Emergency Triage', 'ACLS Certified', 'Medication Safety', 'NABH Protocols'],
        bio: 'Senior Nursing Officer with over 5 years of intensive care experience in top multi-specialty ICUs and trauma emergency wards.',
        avatar: 'https://images.unsplash.com/photo-1594824813591-13723383a54b?w=200&auto=format&fit=crop&q=80',
        verificationStatus: 'VERIFIED',
        profileCompletion: 85
      },
      {
        name: 'Rahul Verma',
        email: 'rahul.verma@medvance.demo',
        phone: '+91 98220 99881',
        headline: 'Senior Medical Laboratory Technologist | M.Sc Medical Biochemistry',
        profession: 'Lab Technologist',
        specialization: 'Molecular Pathology & Biochemistry',
        location: 'Chennai',
        experienceYears: 4,
        skills: ['RT-PCR Diagnostics', 'Automated Immunoassays', 'Quality Control & NABL Auditing', 'Hematology Analyzers', 'Biochemical Profiling'],
        bio: 'Experienced diagnostic scientist managing high-throughput clinical laboratory operations and automated biochemistry lines.',
        avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&auto=format&fit=crop&q=80',
        verificationStatus: 'VERIFIED',
        profileCompletion: 88
      },
      {
        name: 'Sneha Iyer',
        email: 'sneha.iyer@medvance.demo',
        phone: '+91 99341 77654',
        headline: 'Senior Clinical Pharmacist | Pharm.D, Hospital Clinical Pharmacy Specialist',
        profession: 'Pharmacist',
        specialization: 'Clinical Pharmacology & Oncology Therapeutics',
        location: 'Pune',
        experienceYears: 4,
        skills: ['Pharmacotherapy Reviews', 'Antibiotic Stewardship', 'Adverse Drug Reaction Monitoring', 'Chemotherapy Compounding', 'HIS Software'],
        bio: 'Doctor of Pharmacy specialist focused on rational drug use, inpatient prescription audits, and bedside patient drug counseling.',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
        verificationStatus: 'VERIFIED',
        profileCompletion: 92
      }
    ];

    for (const p of professionalProfiles) {
      const user = await User.create({
        name: p.name,
        email: p.email,
        phone: p.phone,
        passwordHash: 'Professional@MedVance2026',
        role: 'PROFESSIONAL',
        avatar: p.avatar,
        isEmailVerified: true
      });

      await ProfessionalProfile.create({
        userId: user._id,
        headline: p.headline,
        profession: p.profession,
        specialization: p.specialization,
        bio: p.bio,
        location: p.location,
        experienceYears: p.experienceYears,
        skills: p.skills,
        languages: ['English', 'Hindi', 'Regional Language'],
        education: [
          {
            degree: p.headline.split('|')[1]?.trim() || 'Medical Degree',
            institution: 'Premier Medical Institute',
            yearOfPassing: 2018
          }
        ],
        licenses: [
          {
            council: 'State Medical Council / Pharmacy Council',
            registrationNumber: `REG-${Math.floor(100000 + Math.random() * 900000)}`,
            stateOrCountry: 'India',
            validUntil: '2030-12-31',
            isVerified: true
          }
        ],
        expectedSalary: {
          min: 1200000,
          max: 2400000,
          currency: 'INR',
          period: 'yearly'
        },
        preferredLocations: [p.location, 'Hyderabad', 'Bangalore'],
        availability: 'Immediate',
        profileCompletion: p.profileCompletion,
        verificationStatus: p.verificationStatus
      });
    }

    // 4. CREATE PRODUCTION HEALTHCARE JOB OPPORTUNITIES
    const jobsData = [
      {
        orgIndex: 0,
        title: 'Senior Interventional Cardiologist',
        slug: 'senior-interventional-cardiologist-novacare',
        profession: 'Doctor',
        specialization: 'Cardiology',
        department: 'Department of Cardiology & Cardiac Catheterization',
        location: 'Hyderabad',
        workMode: 'On-site',
        jobType: 'Full-time',
        experienceMin: 5,
        experienceMax: 12,
        salaryMin: 2800000,
        salaryMax: 4500000,
        description: 'NovaCare Health Institute is seeking an accomplished Senior Interventional Cardiologist to lead cardiac intervention procedures in our state-of-the-art biplane Cath lab suite.',
        responsibilities: [
          'Perform diagnostic coronary angiographies and primary/elective angioplasties (PCI).',
          'Oversee Coronary Care Unit (CCU) management and clinical protocols.',
          'Lead academic rounds and mentor cardiology fellows and resident medical officers.',
          'Participate in interdisciplinary clinical tumor and heart team reviews.'
        ],
        requirements: [
          'DM or DNB in Cardiology from an NMC-recognized institution.',
          'Active state medical council registration in good standing.',
          'Demonstrated expertise in complex bifurcations, radial artery interventions, and IVUS/OCT.',
          'Commitment to continuous quality improvement and patient safety standards.'
        ],
        qualifications: ['MBBS', 'MD / DNB General Medicine', 'DM / DNB Cardiology'],
        skills: ['Coronary Angioplasty', 'Echocardiography', 'Cath Lab Protocols', 'CCU Management', 'TAVR', 'IVUS']
      },
      {
        orgIndex: 1,
        title: 'Lead Critical Care Staff Nurse (ICU)',
        slug: 'lead-critical-care-staff-nurse-medisphere',
        profession: 'Nurse',
        specialization: 'Critical Care / ICU',
        department: 'Medical Intensive Care Unit (MICU)',
        location: 'Bangalore',
        workMode: 'Shift-based',
        jobType: 'Full-time',
        experienceMin: 3,
        experienceMax: 8,
        salaryMin: 550000,
        salaryMax: 850000,
        description: 'Join Medisphere Hospitals as Lead Critical Care Nursing Officer to manage high-acuity medical and surgical ICU patients adhering to international NABH safety protocols.',
        responsibilities: [
          'Provide direct hemodynamic monitoring, continuous renal replacement therapy (CRRT), and ventilator management.',
          'Administer critical medications, vasoactive infusions, and strict infection control protocols.',
          'Coordinate closely with intensivists and duty medical officers during emergency code activations.',
          'Guide and orient junior nursing personnel.'
        ],
        requirements: [
          'B.Sc Nursing or Post-Basic B.Sc Nursing with registered nurse credential.',
          'Minimum 3 years of continuous bedside experience in a tertiary ICU.',
          'Active ACLS / BLS certification.'
        ],
        qualifications: ['B.Sc Nursing', 'Post-Basic B.Sc Nursing', 'ICU Certification'],
        skills: ['Mechanical Ventilation Support', 'ACLS Certified', 'Emergency Triage', 'Arterial Cannulation', 'NABH Protocols']
      },
      {
        orgIndex: 2,
        title: 'Senior Molecular Pathologist / Lab Technologist',
        slug: 'senior-molecular-pathologist-vitalis',
        profession: 'Lab Technologist',
        specialization: 'Molecular Pathology & Biochemistry',
        department: 'Genomics & Molecular Diagnostics',
        location: 'Mumbai',
        workMode: 'On-site',
        jobType: 'Full-time',
        experienceMin: 3,
        experienceMax: 7,
        salaryMin: 600000,
        salaryMax: 1100000,
        description: 'Vitalis Diagnostics is hiring a Senior Medical Laboratory Technologist to supervise automated diagnostic instruments, molecular genetics assays, and NABL documentation.',
        responsibilities: [
          'Operate automated clinical chemistry, hematology, and real-time PCR instrumentation.',
          'Validate internal quality controls (IQC) and external quality assurance schemes (EQAS).',
          'Ensure strict compliance with NABL ISO 15189 laboratory standards.',
          'Release timely diagnostic reports and troubleshoot anomalous calibration curves.'
        ],
        requirements: [
          'M.Sc in Medical Laboratory Technology (MLT) or Biochemistry/Microbiology.',
          'Proficiency with Laboratory Information Systems (LIMS).',
          '3+ years of experience in an accredited clinical laboratory.'
        ],
        qualifications: ['B.Sc MLT', 'M.Sc Medical Biochemistry', 'NABL ISO 15189 Internal Auditor'],
        skills: ['RT-PCR Diagnostics', 'Automated Immunoassays', 'Quality Control & NABL Auditing', 'Hematology Analyzers']
      },
      {
        orgIndex: 3,
        title: 'Senior Clinical Pharmacist',
        slug: 'senior-clinical-pharmacist-carebridge',
        profession: 'Pharmacist',
        specialization: 'Clinical Pharmacology',
        department: 'Department of Pharmacy Practice',
        location: 'Chennai',
        workMode: 'On-site',
        jobType: 'Full-time',
        experienceMin: 2,
        experienceMax: 6,
        salaryMin: 450000,
        salaryMax: 750000,
        description: 'CareBridge Medical is recruiting a proactive Clinical Pharmacist to lead prescription drug monitoring, therapeutic drug level tracking, and antimicrobial stewardship.',
        responsibilities: [
          'Perform daily bedside inpatient chart audits to identify drug-drug interactions and dosage adjustments.',
          'Lead antimicrobial stewardship rounds alongside infectious disease physicians.',
          'Deliver comprehensive patient discharge medication counseling.',
          'Monitor adverse drug reactions (ADR) and maintain pharmacovigilance registries.'
        ],
        requirements: [
          'Pharm.D or M.Pharm in Clinical Pharmacy from a PCI-recognized university.',
          'Active state pharmacy council registration.',
          'Strong clinical pharmacology evaluation skills.'
        ],
        qualifications: ['Pharm.D', 'M.Pharm Clinical Pharmacy'],
        skills: ['Pharmacotherapy Reviews', 'Antibiotic Stewardship', 'Adverse Drug Reaction Monitoring', 'HIS Software']
      },
      {
        orgIndex: 4,
        title: 'Clinical AI Solutions Lead & Health Informatics Specialist',
        slug: 'clinical-ai-solutions-lead-aurelia',
        profession: 'Healthcare IT',
        specialization: 'Health Informatics & AI',
        department: 'Digital Health & Clinical Telemetry',
        location: 'Pune',
        workMode: 'Hybrid',
        jobType: 'Full-time',
        experienceMin: 4,
        experienceMax: 10,
        salaryMin: 1800000,
        salaryMax: 3200000,
        description: 'Aurelia Health is building next-gen remote ICU AI platforms. We are looking for a clinician-technologist with healthcare IT background to design clinical workflows for our algorithmic early-warning systems.',
        responsibilities: [
          'Bridge communication between practicing critical care physicians and machine learning engineers.',
          'Define HL7 / FHIR data models for continuous physiological telemetry streams.',
          'Validate AI decision support algorithms against clinical retrospective data.',
          'Oversee clinical safety protocols for software as a medical device (SaMD).'
        ],
        requirements: [
          'Degree in Medicine / Biomedical Informatics / Health IT.',
          'Demonstrated experience with FHIR, HL7, and electronic health record integration.',
          'Strong understanding of clinical workflow dynamics and regulatory pathways.'
        ],
        qualifications: ['MBBS / B.Tech BioMed', 'M.S Health Informatics'],
        skills: ['HL7 / FHIR Standards', 'Health Informatics', 'Clinical Workflow Design', 'SaMD Compliance']
      }
    ];

    for (const j of jobsData) {
      const org = createdOrgs[j.orgIndex];
      await Job.create({
        organizationId: org._id,
        title: j.title,
        slug: j.slug,
        profession: j.profession,
        specialization: j.specialization,
        department: j.department,
        description: j.description,
        responsibilities: j.responsibilities,
        requirements: j.requirements,
        qualifications: j.qualifications,
        skills: j.skills,
        experienceMin: j.experienceMin,
        experienceMax: j.experienceMax,
        salaryMin: j.salaryMin,
        salaryMax: j.salaryMax,
        salaryNegotiable: true,
        location: j.location,
        workMode: j.workMode as any,
        jobType: j.jobType as any,
        status: 'ACTIVE',
        applicationCount: Math.floor(Math.random() * 18) + 4,
        viewCount: Math.floor(Math.random() * 250) + 60,
        postedAt: new Date(Date.now() - Math.floor(Math.random() * 8) * 86400000)
      });
    }

    // 5. CREATE RICH HEALTHCARE CAREER ARTICLES & RESOURCES
    const blogs = [
      {
        title: '2026 Healthcare Compensation Report: In-Demand Specialties in Indian Metros',
        slug: '2026-healthcare-compensation-report',
        excerpt: 'An in-depth analysis of salary benchmarks, sign-on bonuses, and retention trends across cardiology, critical care nursing, and digital health.',
        content: `Healthcare talent dynamics have witnessed unprecedented shifts over the past 24 months. Tertiary hospital networks in Bangalore, Hyderabad, Mumbai, and Delhi-NCR are competing aggressively for board-certified super-specialists and certified ICU nursing officers.

### Key Insights:
1. **Critical Care Specialization Premium**: Critical care nursing officers with ACLS and ventilator certifications command a 28% salary premium over general ward nurses.
2. **Surge in Clinical Pharmacist Integration**: NABH guidelines mandating clinical pharmacologists for antibiotic stewardship have increased hospital hiring targets by 42%.
3. **Dual Clinician-Tech Profiles**: Telemedicine and clinical AI firms are offering top compensation for physicians proficient in healthcare informatics and FHIR protocols.`,
        category: 'Career Insights',
        tags: ['Salaries', 'Hiring Trends', 'Doctors', 'Nurses'],
        coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
        authorName: 'Dr. Rajesh Sharma',
        authorRole: 'Chief Medical Advisory Editor',
        readTime: '6 min read'
      },
      {
        title: 'Mastering the Hospital Medical Board Interview: Clinical & Ethical Scenario Guide',
        slug: 'mastering-hospital-medical-board-interview',
        excerpt: 'How to structure your responses using the SBAR technique and present your clinical case audits with confidence.',
        content: `When sitting before a tertiary hospital selection board, technical clinical questions are only half the assessment. The selection panel evaluates your decision-making agility, team communication under acute stress, and commitment to institutional patient safety metrics.

### Best Practices:
- Always structure complex patient management cases chronologically: Initial presentation, immediate stabilization, diagnostic workup, targeted intervention, and discharge care continuum.
- Highlight your compliance with hospital infection control committee (HICC) guidelines and antibiotic stewardship protocols.`,
        category: 'Interview Preparation',
        tags: ['Interviews', 'Doctor Careers', 'Clinical Skills'],
        coverImage: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&auto=format&fit=crop&q=80',
        authorName: 'Priya Nair',
        authorRole: 'Senior Clinical Educator',
        readTime: '4 min read'
      }
    ];

    for (const b of blogs) {
      await Blog.create(b);
    }

    console.log('Database seeded successfully with realistic healthcare professionals, organizations, jobs, and articles!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]', error);
    process.exit(1);
  }
};

if (process.argv[1] && process.argv[1].includes('seedData')) {
  seedDatabase();
}
