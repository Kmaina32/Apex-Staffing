
import type { Job, Application } from '@/lib/types';

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Registered Nurse',
    company: 'HealthCare Germany',
    country: 'Germany',
    countryCode: 'de',
    salary: '€55,000 - €65,000 per year',
    contractDuration: '2 years',
    qualifications: ['BSc in Nursing', '3+ years experience', 'German B2 Level'],
    languageRequirements: ['German', 'English'],
    visaSponsored: true,
    description: 'Seeking experienced registered nurses to join our team in Berlin. Visa sponsorship and relocation package available for qualified candidates.'
  },
  {
    id: '2',
    title: 'Software Engineer (React)',
    company: 'Tech Innovate Dubai',
    country: 'United Arab Emirates',
    countryCode: 'ae',
    salary: 'AED 20,000 - 25,000 per month',
    contractDuration: 'Permanent',
    qualifications: ['BSc in Computer Science', '5+ years with React/Next.js', 'Experience with cloud services'],
    languageRequirements: ['English'],
    visaSponsored: true,
    description: 'Join our fast-growing tech team in Dubai. We are looking for a senior frontend developer to build world-class applications.'
  },
  {
    id: '3',
    title: 'Construction Manager',
    company: 'BuildRight Canada',
    country: 'Canada',
    countryCode: 'ca',
    salary: 'CAD 90,000 - 110,000 per year',
    contractDuration: '3 years',
    qualifications: ['Civil Engineering Degree', 'PMP Certification', '10+ years in construction management'],
    languageRequirements: ['English'],
    visaSponsored: true,
    description: 'Oversee large-scale construction projects in Toronto. Strong leadership and project management skills are a must.'
  },
  {
    id: '4',
    title: 'Hospitality Manager',
    company: 'Sun-kissed Resorts',
    country: 'Australia',
    countryCode: 'au',
    salary: 'AUD 75,000 - 85,000 per year',
    contractDuration: '1 year (extendable)',
    qualifications: ['Degree in Hospitality Management', '5+ years in a managerial role in a 5-star hotel'],
    languageRequirements: ['English'],
    visaSponsored: false,
    description: 'Manage our luxury resort in Queensland. Must have working rights in Australia.'
  }
];

export const applications: Application[] = [
    {
        id: 'app1',
        jobId: '1',
        jobTitle: 'Registered Nurse',
        company: 'HealthCare Germany',
        dateApplied: '2024-05-15',
        status: 'Under Review'
    },
    {
        id: 'app2',
        jobId: '2',
        jobTitle: 'Software Engineer (React)',
        company: 'Tech Innovate Dubai',
        dateApplied: '2024-05-10',
        status: 'Shortlisted'
    },
    {
      id: 'app3',
      jobId: '4',
      jobTitle: 'Hospitality Manager',
      company: 'Sun-kissed Resorts',
      dateApplied: '2024-05-20',
      status: 'Offer Made'
    }
];
