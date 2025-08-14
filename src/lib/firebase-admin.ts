
import * as admin from 'firebase-admin';
import type { Job } from './types';
import { config } from 'dotenv';

config();

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

export async function getUsersCount(): Promise<number> {
    if (!auth) {
        console.error('Firebase Admin Auth is not initialized.');
        return 0;
    }
    try {
        const listUsersResult = await auth.listUsers();
        return listUsersResult.users.length;
    } catch (error) {
        console.error('Error listing users:', error);
        return 0;
    }
}

export async function getJobsCount(): Promise<number> {
    if (!db) {
        console.error('Firebase Admin Firestore is not initialized.');
        return 0;
    }
    try {
        const snapshot = await db.collection('jobs').get();
        return snapshot.size;
    } catch (error) {
        console.error('Error getting jobs count:', error);
        return 0;
    }
}

export async function getApplicationsCount(): Promise<number> {
    if (!db) {
        console.error('Firebase Admin Firestore is not initialized.');
        return 0;
    }
    try {
        const snapshot = await db.collection('applications').get();
        return snapshot.size;
    } catch (error) {
        console.error('Error getting applications count:', error);
        return 0;
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

export async function createUser(data: { uid: string; email: string; displayName: string }) {
    if (!db) {
        throw new Error('Firebase Admin Firestore is not initialized.');
    }
    try {
        await db.collection('users').doc(data.uid).set({
            email: data.email,
            displayName: data.displayName,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
        console.error("Error creating user document: ", error);
        throw new Error("Could not create user document in database.");
    }
}


export async function updateUser(uid: string, data: { displayName?: string; photoURL?: string }) {
    if (!db || !auth) {
        throw new Error('Firebase Admin SDK is not initialized.');
    }
    try {
        // Update Firebase Auth
        await auth.updateUser(uid, {
            displayName: data.displayName,
            photoURL: data.photoURL,
        });

        // Update Firestore user document
        const userRef = db.collection('users').doc(uid);
        const updateData: Record<string, any> = {};
        if (data.displayName) {
            updateData.displayName = data.displayName;
        }
         if (data.photoURL) {
            updateData.photoURL = data.photoURL;
        }

        if (Object.keys(updateData).length > 0) {
           await userRef.update(updateData);
        }
    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Could not update user information.");
    }
}
