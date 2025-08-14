
import { NextResponse } from 'next/server';
import { addJob } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

const exampleJobs = [
  {
    "title": "Senior Registered Nurse (ICU)",
    "company": "Berlin Central Hospital",
    "country": "Germany",
    "countryCode": "de",
    "salary": "€68,000 - €75,000 per year",
    "contractDuration": "Permanent",
    "qualifications": ["BSc in Nursing", "5+ years ICU experience", "Critical Care Certification (ICCN)", "German B2 Level"],
    "languageRequirements": ["German (fluent)", "English (professional)"],
    "visaSponsored": true,
    "description": "Leading hospital in Berlin seeks a highly experienced ICU nurse. Responsibilities include advanced patient monitoring, ventilator management, and emergency response. Relocation package includes language course sponsorship."
  },
  {
    "title": "Lead Frontend Engineer (FinTech)",
    "company": "Innovate Finance UK",
    "country": "United Kingdom",
    "countryCode": "gb",
    "salary": "£85,000 - £95,000 per year",
    "contractDuration": "Permanent",
    "qualifications": ["Expertise in React & TypeScript", "Experience leading a team", "Strong understanding of financial markets", "GraphQL and Apollo Client proficiency"],
    "languageRequirements": ["English"],
    "visaSponsored": true,
    "description": "Lead the development of a next-gen trading platform. You will mentor junior developers, architect new features, and work closely with product managers. Generous stock options available."
  },
  {
    "title": "Site Superintendent (Infrastructure)",
    "company": "Maple Leaf Construction",
    "country": "Canada",
    "countryCode": "ca",
    "salary": "CAD 110,000 - 130,000 per year",
    "contractDuration": "4-year project",
    "qualifications": ["15+ years in civil construction", "Experience with public infrastructure projects (bridges, highways)", "P.Eng or C.E.T. designation"],
    "languageRequirements": ["English"],
    "visaSponsored": true,
    "description": "Oversee all on-site activities for a major bridge construction project in Vancouver, BC. Responsible for safety, scheduling, and subcontractor management. LMIA sponsorship available for the right candidate."
  },
  {
    "title": "Executive Chef",
    "company": "The Oasis Grand Hotel",
    "country": "United Arab Emirates",
    "countryCode": "ae",
    "salary": "AED 30,000 - 35,000 per month (tax-free)",
    "contractDuration": "2 years",
    "qualifications": ["Michelin-star restaurant experience", "Team leadership of 20+ staff", "Expertise in menu costing and design", "HACCP Certified"],
    "languageRequirements": ["English"],
    "visaSponsored": true,
    "description": "A 5-star luxury hotel in Dubai requires an Executive Chef to manage three fine-dining outlets. You will have full creative control over menus. Full expatriate package including housing and transport allowance."
  },
  {
    "title": "AI Research Scientist (NLP)",
    "company": "Sakura AI Labs",
    "country": "Japan",
    "countryCode": "jp",
    "salary": "¥12,000,000 - ¥15,000,000 per year",
    "contractDuration": "Permanent",
    "qualifications": ["PhD in Computer Science or related field", "Published research in top-tier conferences (ACL, EMNLP)", "Deep experience with transformer models", "Proficiency in PyTorch"],
    "languageRequirements": ["English (business level)", "Japanese (conversational is a plus)"],
    "visaSponsored": true,
    "description": "Join a world-renowned AI research team in Tokyo. Work on foundational models and publish your findings. This role offers the chance to collaborate with leading academics and engineers."
  },
  {
    "title": "Farm Manager (Dairy)",
    "company": "Kiwi Pastures Ltd.",
    "country": "New Zealand",
    "countryCode": "nz",
    "salary": "NZD 90,000 - 105,000 per year + accommodation",
    "contractDuration": "Permanent",
    "qualifications": ["Degree in Agriculture or related field", "10+ years managing large-scale dairy farms (500+ cows)", "Proficient in pasture management"],
    "languageRequirements": ["English"],
    "visaSponsored": false,
    "description": "Manage a large dairy operation in the Canterbury region. Must have valid New Zealand work rights. Responsible for herd health, milk production targets, and staff management."
  },
  {
    "title": "Senior UX/UI Designer",
    "company": "Aussie HealthTech",
    "country": "Australia",
    "countryCode": "au",
    "salary": "AUD 130,000 - 150,000 per year",
    "contractDuration": "Permanent",
    "qualifications": ["Strong portfolio of mobile and web apps", "Expertise in Figma", "Experience with user research and testing", "Knowledge of accessibility standards (WCAG)"],
    "languageRequirements": ["English"],
    "visaSponsored": true,
    "description": "Design user-centric digital health solutions from our Sydney office. You will own the design process from discovery to high-fidelity prototypes. Sponsorship available for exceptional candidates."
  }
];

export async function GET() {
    try {
        // Clear existing jobs to prevent duplicates if seeding multiple times
        // This is a simple approach; in a real app, you might want a more sophisticated check.
        // For this prototype, we assume we can clear and re-seed.
        // NOTE: Clearing collections from a client-triggered API is not recommended for production.
        // This is simplified for the prototype's purpose.
        
        // As we can't easily clear a collection from here without complex logic,
        // we'll just add the jobs. The admin can manage duplicates if they re-seed.

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
