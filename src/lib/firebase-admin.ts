
import * as admin from 'firebase-admin';
import type { Job } from './types';

const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
let serviceAccount: admin.ServiceAccount | undefined;

if (serviceAccountString) {
  try {
    serviceAccount = JSON.parse(serviceAccountString);
  } catch (e) {
    console.error('Error parsing FIREBASE_SERVICE_ACCOUNT JSON:', e);
  }
} else {
    console.warn('FIREBASE_SERVICE_ACCOUNT environment variable is not set. Admin features will be disabled.');
}


if (!admin.apps.length && serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'global-talent-bridge',
  });
} else if (!serviceAccount) {
    console.warn('Firebase Admin SDK not initialized. Service Account credentials are not configured.');
}

const db = admin.apps.length ? admin.firestore() : null;
const auth = admin.apps.length ? admin.auth() : null;

export async function getUsers() {
  if (!auth) {
      console.error('Firebase Admin Auth is not initialized.');
      return [];
  }
  try {
    const listUsersResult = await auth.listUsers();
    return listUsersResult.users.map(user => user.toJSON());
  } catch (error) {
    console.error('Error listing users:', error);
    return [];
  }
}

export async function addJob(job: Omit<Job, 'id'>) {
    if (!db) {
        throw new Error('Firebase Admin Firestore is not initialized.');
    }
    try {
        const docRef = await db.collection('jobs').add(job);
        return docRef.id;
    } catch(error) {
        console.error("Error adding job: ", error);
        throw new Error("Could not add job to database.");
    }
}
