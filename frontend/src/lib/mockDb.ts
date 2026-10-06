export interface IMockJob {
  _id: string;
  title: string;
  slug: string;
  organization: {
    _id: string;
    name: string;
    logo: string;
    slug: string;
    organizationType: string;
    locations: string[];
    verificationStatus: 'VERIFIED' | 'PENDING';
    accreditations: string[];
  };
  profession: string;
  specialization: string;
  department: string;
  location: string;
  workMode: 'On-site' | 'Hybrid' | 'Remote' | 'Shift-based';
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Locum' | 'Fellowship';
  experienceMin: number;
  experienceMax: number;
  salaryMin: number;
  salaryMax: number;
  salaryNegotiable: boolean;
  description: string;
  responsibilities: string[];
  requirements: string[];
  qualifications: string[];
  skills: string[];
  postedAt: string;
  applicationCount: number;
  viewCount: number;
  status: 'ACTIVE' | 'DRAFT' | 'CLOSED';
}

export const INITIAL_MOCK_JOBS: IMockJob[] = [
  {
    _id: 'job_001',
    title: 'Senior Interventional Cardiologist',
    slug: 'senior-interventional-cardiologist-novacare',
    organization: {
      _id: 'org_001',
      name: 'NovaCare Health Institute',
      logo: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=200&auto=format&fit=crop&q=80',
      slug: 'novacare-health',
      organizationType: 'Hospital',
      locations: ['Hyderabad', 'Bangalore'],
      verificationStatus: 'VERIFIED',
      accreditations: ['NABH Accredited', 'JCI Gold Seal', 'NABL Certified']
    },
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
    salaryNegotiable: true,
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
    skills: ['Coronary Angioplasty', 'Echocardiography', 'Cath Lab Protocols', 'CCU Management', 'TAVR', 'IVUS'],
    postedAt: '2026-04-10T10:00:00.000Z',
    applicationCount: 14,
    viewCount: 420,
    status: 'ACTIVE'
  },
  {
    _id: 'job_002',
    title: 'Lead Critical Care Staff Nurse (ICU)',
    slug: 'lead-critical-care-staff-nurse-medisphere',
    organization: {
      _id: 'org_002',
      name: 'Medisphere Hospitals & Research',
      logo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200&auto=format&fit=crop&q=80',
      slug: 'medisphere-hospitals',
      organizationType: 'Hospital',
      locations: ['Bangalore', 'Chennai'],
      verificationStatus: 'VERIFIED',
      accreditations: ['NABH Accredited', 'AERB Approved']
    },
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
    salaryNegotiable: true,
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
    skills: ['Mechanical Ventilation Support', 'ACLS Certified', 'Emergency Triage', 'Arterial Cannulation', 'NABH Protocols'],
    postedAt: '2026-04-12T14:30:00.000Z',
    applicationCount: 22,
    viewCount: 510,
    status: 'ACTIVE'
  },
  {
    _id: 'job_003',
    title: 'Senior Molecular Pathologist / Lab Technologist',
    slug: 'senior-molecular-pathologist-vitalis',
    organization: {
      _id: 'org_003',
      name: 'Vitalis Diagnostics & Genomics',
      logo: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=200&auto=format&fit=crop&q=80',
      slug: 'vitalis-diagnostics',
      organizationType: 'Diagnostic Center',
      locations: ['Mumbai', 'Pune'],
      verificationStatus: 'VERIFIED',
      accreditations: ['CAP Accredited', 'NABL Certified']
    },
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
    salaryNegotiable: true,
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
    skills: ['RT-PCR Diagnostics', 'Automated Immunoassays', 'Quality Control & NABL Auditing', 'Hematology Analyzers'],
    postedAt: '2026-04-08T09:15:00.000Z',
    applicationCount: 9,
    viewCount: 290,
    status: 'ACTIVE'
  },
  {
    _id: 'job_004',
    title: 'Senior Clinical Pharmacist',
    slug: 'senior-clinical-pharmacist-carebridge',
    organization: {
      _id: 'org_004',
      name: 'CareBridge Medical Centers',
      logo: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=200&auto=format&fit=crop&q=80',
      slug: 'carebridge-medical',
      organizationType: 'Clinic',
      locations: ['Chennai', 'Kochi'],
      verificationStatus: 'VERIFIED',
      accreditations: ['NABH Entry Level']
    },
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
    salaryNegotiable: true,
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
    skills: ['Pharmacotherapy Reviews', 'Antibiotic Stewardship', 'Adverse Drug Reaction Monitoring', 'HIS Software'],
    postedAt: '2026-04-11T16:45:00.000Z',
    applicationCount: 11,
    viewCount: 310,
    status: 'ACTIVE'
  },
  {
    _id: 'job_005',
    title: 'Clinical AI Solutions Lead & Health Informatics Specialist',
    slug: 'clinical-ai-solutions-lead-aurelia',
    organization: {
      _id: 'org_005',
      name: 'Aurelia Health Innovations',
      logo: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=200&auto=format&fit=crop&q=80',
      slug: 'aurelia-health',
      organizationType: 'Healthcare Startup',
      locations: ['Pune', 'Hyderabad', 'Bangalore'],
      verificationStatus: 'VERIFIED',
      accreditations: ['HIPAA Certified', 'ISO 27001']
    },
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
    salaryNegotiable: true,
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
    skills: ['HL7 / FHIR Standards', 'Health Informatics', 'Clinical Workflow Design', 'SaMD Compliance'],
    postedAt: '2026-04-13T11:00:00.000Z',
    applicationCount: 18,
    viewCount: 640,
    status: 'ACTIVE'
  }
];

export const INITIAL_CANDIDATES = [
  {
    _id: 'cand_001',
    name: 'Dr. Ananya Rao',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80',
    headline: 'Senior Interventional Cardiologist | MD, DM Cardiology (AIIMS)',
    profession: 'Doctor',
    specialization: 'Cardiology',
    location: 'Hyderabad',
    experienceYears: 8,
    skills: ['Coronary Angioplasty', 'Echocardiography', 'Heart Failure Management', 'TAVR', 'Clinical Research', 'ICU Care'],
    bio: 'Board-certified Interventional Cardiologist with extensive fellowship training in complex coronary interventions and structural heart disease.',
    verificationStatus: 'VERIFIED',
    profileCompletion: 95,
    availability: 'Immediate',
    expectedSalary: '₹35,00,000 / yr'
  },
  {
    _id: 'cand_002',
    name: 'Dr. Arjun Mehta',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&auto=format&fit=crop&q=80',
    headline: 'Consultant Neurologist & Stroke Specialist | DM Neurology (NIMHANS)',
    profession: 'Doctor',
    specialization: 'Neurology',
    location: 'Bangalore',
    experienceYears: 6,
    skills: ['Acute Stroke Thrombolysis', 'Epileptology', 'Electromyography (EMG)', 'Neurocritical Care'],
    bio: 'Practicing Neurologist focused on acute ischemic stroke interventions, neuro-telemetry, and neuro-degenerative disorders.',
    verificationStatus: 'VERIFIED',
    profileCompletion: 90,
    availability: '1 Month',
    expectedSalary: '₹28,00,000 / yr'
  },
  {
    _id: 'cand_003',
    name: 'Priya Nair',
    avatar: 'https://images.unsplash.com/photo-1594824813591-13723383a54b?w=200&auto=format&fit=crop&q=80',
    headline: 'Lead Critical Care Staff Nurse | B.Sc Nursing, Critical Care Fellowship',
    profession: 'Nurse',
    specialization: 'Critical Care / ICU',
    location: 'Mumbai',
    experienceYears: 5,
    skills: ['Mechanical Ventilation Support', 'Arterial Cannulation', 'Emergency Triage', 'ACLS Certified', 'Medication Safety'],
    bio: 'Senior Nursing Officer with over 5 years of intensive care experience in top multi-specialty ICUs and trauma emergency wards.',
    verificationStatus: 'VERIFIED',
    profileCompletion: 85,
    availability: '15 Days',
    expectedSalary: '₹7,50,000 / yr'
  },
  {
    _id: 'cand_004',
    name: 'Rahul Verma',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&auto=format&fit=crop&q=80',
    headline: 'Senior Medical Laboratory Technologist | M.Sc Medical Biochemistry',
    profession: 'Lab Technologist',
    specialization: 'Molecular Pathology & Biochemistry',
    location: 'Chennai',
    experienceYears: 4,
    skills: ['RT-PCR Diagnostics', 'Automated Immunoassays', 'Quality Control & NABL Auditing', 'Hematology Analyzers'],
    bio: 'Experienced diagnostic scientist managing high-throughput clinical laboratory operations and automated biochemistry lines.',
    verificationStatus: 'VERIFIED',
    profileCompletion: 88,
    availability: 'Immediate',
    expectedSalary: '₹8,50,000 / yr'
  },
  {
    _id: 'cand_005',
    name: 'Sneha Iyer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    headline: 'Senior Clinical Pharmacist | Pharm.D, Hospital Clinical Pharmacy Specialist',
    profession: 'Pharmacist',
    specialization: 'Clinical Pharmacology & Oncology Therapeutics',
    location: 'Pune',
    experienceYears: 4,
    skills: ['Pharmacotherapy Reviews', 'Antibiotic Stewardship', 'Adverse Drug Reaction Monitoring', 'Chemotherapy Compounding'],
    bio: 'Doctor of Pharmacy specialist focused on rational drug use, inpatient prescription audits, and bedside patient drug counseling.',
    verificationStatus: 'VERIFIED',
    profileCompletion: 92,
    availability: '1 Month',
    expectedSalary: '₹6,50,000 / yr'
  }
];

export const INITIAL_BLOGS = [
  {
    _id: 'blog_1',
    title: '2026 Healthcare Compensation Report: In-Demand Specialties in Indian Metros',
    slug: '2026-healthcare-compensation-report',
    excerpt: 'An in-depth analysis of salary benchmarks, sign-on bonuses, and retention trends across cardiology, critical care nursing, and digital health.',
    content: `Healthcare talent dynamics have witnessed unprecedented shifts over the past 24 months. Tertiary hospital networks in Bangalore, Hyderabad, Mumbai, and Delhi-NCR are competing aggressively for board-certified super-specialists and certified ICU nursing officers.

### Key Takeaways for 2026:
1. **Critical Care Specialization Premium**: Critical care nursing officers with ACLS and ventilator certifications command a 28% salary premium over general ward nurses.
2. **Surge in Clinical Pharmacist Integration**: NABH guidelines mandating clinical pharmacologists for antibiotic stewardship have increased hospital hiring targets by 42%.
3. **Dual Clinician-Tech Profiles**: Telemedicine and clinical AI firms are offering top compensation for physicians proficient in healthcare informatics and FHIR protocols.`,
    category: 'Career Insights',
    tags: ['Salaries', 'Hiring Trends', 'Doctors', 'Nurses'],
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
    authorName: 'Dr. Rajesh Sharma',
    authorRole: 'Chief Medical Advisory Editor',
    readTime: '6 min read',
    publishedAt: '2026-04-05'
  },
  {
    _id: 'blog_2',
    title: 'Mastering the Hospital Medical Board Interview: Clinical & Ethical Scenario Guide',
    slug: 'mastering-hospital-medical-board-interview',
    excerpt: 'How to structure your responses using the SBAR technique and present your clinical case audits with confidence.',
    content: `When sitting before a tertiary hospital selection board, technical clinical questions are only half the assessment. The selection panel evaluates your decision-making agility, team communication under acute stress, and commitment to institutional patient safety metrics.

### High-Yield Preparation Strategies:
- Always structure complex patient management cases chronologically: Initial presentation, immediate stabilization, diagnostic workup, targeted intervention, and discharge care continuum.
- Highlight your compliance with hospital infection control committee (HICC) guidelines and antibiotic stewardship protocols.`,
    category: 'Interview Preparation',
    tags: ['Interviews', 'Doctor Careers', 'Clinical Skills'],
    coverImage: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&auto=format&fit=crop&q=80',
    authorName: 'Priya Nair',
    authorRole: 'Senior Clinical Educator',
    readTime: '4 min read',
    publishedAt: '2026-04-09'
  }
];
