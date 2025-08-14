
import { NextResponse } from 'next/server';
import { addJob } from '@/lib/firebase-admin';

// Example jobs data to be added to Firestore:
const exampleJobs = [
  {
    "title": "Registered Nurse",
    "company": "HealthCare Germany",
    "country": "Germany",
    "countryCode": "de",
    "salary": "€55,000 - €65,000 per year",
    "contractDuration": "2 years",
    "qualifications": ["BSc in Nursing", "3+ years experience", "German B2 Level"],
    "languageRequirements": ["German", "English"],
    "visaSponsored": true,
    "description": "Seeking experienced registered nurses to join our team in Berlin. Visa sponsorship and relocation package available for qualified candidates."
  },
  {
    "title": "Software Engineer (React)",
    "company": "Tech Innovate Dubai",
    "country": "United Arab Emirates",
    "countryCode": "ae",
    "salary": "AED 20,000 - 25,000 per month",
    "contractDuration": "Permanent",
    "qualifications": ["BSc in Computer Science", "5+ years with React/Next.js", "Experience with cloud services"],
    "languageRequirements": ["English"],
    "visaSponsored": true,
    "description": "Join our fast-growing tech team in Dubai. We are looking for a senior frontend developer to build world-class applications."
  },
  {
    "title": "Construction Manager",
    "company": "BuildRight Canada",
    "country": "Canada",
    "countryCode": "ca",
    "salary": "CAD 90,000 - 110,000 per year",
    "contractDuration": "3 years",
    "qualifications": ["Civil Engineering Degree", "PMP Certification", "10+ years in construction management"],
    "languageRequirements": ["English"],
    "visaSponsored": true,
    "description": "Oversee large-scale construction projects in Toronto. Strong leadership and project management skills are a must."
  },
  {
    "title": "Hospitality Manager",
    "company": "Sun-kissed Resorts",
    "country": "Australia",
    "countryCode": "au",
    "salary": "AUD 75,000 - 85,000 per year",
    "contractDuration": "1 year (extendable)",
    "qualifications": ["Degree in Hospitality Management", "5+ years in a managerial role in a 5-star hotel"],
    "languageRequirements": ["English"],
    "visaSponsored": false,
    "description": "Manage our luxury resort in Queensland. Must have working rights in Australia."
  },
  {
    "title": "Data Scientist",
    "company": "QuantumLeap AI",
    "country": "United Kingdom",
    "countryCode": "gb",
    "salary": "£60,000 - £75,000 per year",
    "contractDuration": "Permanent",
    "qualifications": ["MSc or PhD in a quantitative field", "Proficiency in Python/R", "Experience with ML frameworks"],
    "languageRequirements": ["English"],
    "visaSponsored": true,
    "description": "We are looking for a Data Scientist to join our team in London and work on cutting-edge AI problems."
  },
  {
    "title": "Marketing Director",
    "company": "GlobalReach Inc.",
    "country": "United States",
    "countryCode": "us",
    "salary": "$120,000 - $150,000 per year",
    "contractDuration": "Permanent",
    "qualifications": ["Bachelor’s in Marketing or related field", "10+ years of marketing experience", "Proven leadership skills"],
    "languageRequirements": ["English"],
    "visaSponsored": false,
    "description": "Lead our marketing efforts from our New York office. This role requires a strategic thinker with a passion for global markets."
  },
  {
    "title": "Mechanical Engineer",
    "company": "Precision Robotics",
    "country": "Japan",
    "countryCode": "jp",
    "salary": "¥7,000,000 - ¥9,000,000 per year",
    "contractDuration": "Permanent",
    "qualifications": ["Degree in Mechanical Engineering", "Experience with CAD software", "Robotics experience a plus"],
    "languageRequirements": ["Japanese (Business Level)", "English (Conversational)"],
    "visaSponsored": true,
    "description": "Join our innovative team in Tokyo to design and build next-generation robotics."
  }
];


export async function GET() {
    try {
        const results = await Promise.all(
            exampleJobs.map(job => addJob(job))
        );
        return NextResponse.json({
            message: "Database seeded successfully!",
            jobIds: results,
        });
    } catch (error: any) {
        console.error("Error seeding database:", error);
        return NextResponse.json({ 
            message: "Error seeding database.",
            error: error.message 
        }, { status: 500 });
    }
}
