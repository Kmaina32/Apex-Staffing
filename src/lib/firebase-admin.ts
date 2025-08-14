
import * as admin from 'firebase-admin';
import type { Job } from './types';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : undefined;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'global-talent-bridge',
  });
}

const db = admin.firestore();
const auth = admin.auth();

export async function getUsers() {
  try {
    const listUsersResult = await auth.listUsers();
    return listUsersResult.users.map(user => user.toJSON());
  } catch (error) {
    console.error('Error listing users:', error);
    return [];
  }
}

export async function addJob(job: Omit<Job, 'id'>) {
    try {
        const docRef = await db.collection('jobs').add(job);
        return docRef.id;
    } catch(error) {
        console.error("Error adding job: ", error);
        throw new Error("Could not add job to database.");
    }
}
