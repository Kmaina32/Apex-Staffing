
export type Job = {
  id: string;
  title: string;
  company: string;
  country: string;
  countryCode: string; // e.g., 'gb' for flag icons
  salary: string;
  contractDuration: string;
  qualifications: string[];
  languageRequirements: string[];
  visaSponsored: boolean;
  description: string;
};

export type Application = {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  dateApplied: string;
  status: 'Submitted' | 'Under Review' | 'Shortlisted' | 'Interview Scheduled' | 'Offer Made' | 'Rejected';
};

export type CandidateProfile = {
  fullName: string;
  nationality: string;
  currentLocation: string;
  email: string;
  phone: string;
  jobSector: string;
  preferredCountries: string[];
  languages: string[];
  workExperience: string;
  education: string;
  cvUrl: string;
  passportUrl: string;
  willingToRelocate: boolean;
  hasCriminalRecord: boolean; // assuming false is no
  availability: string;
};
