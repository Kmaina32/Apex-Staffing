
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import type { Job, Application } from '@/lib/types';
import { getAuth } from 'firebase/auth';
import { listAllUsers } from 'firebase/auth/admin';

const firebaseConfig = {
  "projectId": "global-talent-bridge",
  "appId": "1:364901720215:web:05efc1fa4f760d050609d2",
  "storageBucket": "global-talent-bridge.firebasestorage.app",
  "apiKey": "AIzaSyDKo4bXFxJOHmBC_Qpgsk8-LIE2HEXYABs",
  "authDomain": "global-talent-bridge.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "364901720215"
};

// Initialize Firebase
export const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

const jobsCollection = collection(db, 'jobs');
const applicationsCollection = collection(db, 'applications');


export async function getJobs(): Promise<Job[]> {
    const snapshot = await getDocs(jobsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job));
}

export async function getJob(id: string): Promise<Job | null> {
    const docRef = doc(db, 'jobs', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Job;
    }
    return null;
}

export async function getApplicationsForUser(userId: string): Promise<Application[]> {
    const q = query(applicationsCollection, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Application));
}

// Note: This function requires admin privileges to list all users.
// It will only work when called from a secure server environment (like a Cloud Function)
// with admin SDK, not directly from the client.
// For the prototype, we are calling this on the client, which is not recommended for production
// due to security and performance reasons.
export async function getUsers() {
    // This is a placeholder and will not work in a client-side environment.
    // In a real app, you would have a Cloud Function that returns this data.
    // For now, we will return an empty array to avoid breaking the app.
    console.warn("getUsers() is a placeholder and will not fetch real user data from the client.");
    return [];
}


// NOTE: The following is example data.
// You should go to the Firebase console for the "global-talent-bridge" project
// and create a "jobs" and "applications" collection with your own data.
// I have included some data here to get you started.

// Example jobs data to be added to Firestore:
/*
[
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
  }
]
*/

// Example applications data to be added to Firestore:
/*
[
    {
        "userId": "user123", // Example user ID
        "jobId": "1", // Corresponds to job ID from jobs collection
        "jobTitle": "Registered Nurse",
        "company": "HealthCare Germany",
        "dateApplied": "2024-05-15",
        "status": "Under Review"
    },
    {
        "userId": "user123",
        "jobId": "2",
        "jobTitle": "Software Engineer (React)",
        "company": "Tech Innovate Dubai",
        "dateApplied": "2024-05-10",
        "status": "Shortlisted"
    },
    {
        "userId": "user123",
        "jobId": "4",
        "jobTitle": "Hospitality Manager",
        "company": "Sun-kissed Resorts",
        "dateApplied": "2024-05-20",
        "status": "Offer Made"
    }
]
*/
