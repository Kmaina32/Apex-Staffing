
import * as admin from 'firebase-admin';
import type { Job } from './types';

// This is a singleton pattern to ensure we only initialize Firebase Admin once.
// This is crucial for serverless environments like Vercel or Firebase Functions.
const initializeFirebaseAdmin = () => {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!serviceAccountString) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is not set.');
  }
  
  try {
    const serviceAccount = JSON.parse(serviceAccountString);
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: 'global-talent-bridge',
    });
  } catch (e: any) {
    console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT or initialize Firebase Admin SDK:', e);
    throw new Error(`Failed to parse FIREBASE_SERVICE_ACCOUNT: ${e.message}`);
  }
};

const getFirebaseAdmin = () => {
    try {
        return initializeFirebaseAdmin();
    } catch (error) {
        console.error('Firebase Admin SDK initialization error:', error);
        // We throw the error to be caught by the calling functions,
        // which can then handle it gracefully (e.g., return a 500 error).
        throw error;
    }
}

const adminAuth = admin.auth;
const adminDb = admin.firestore;


export async function getUsers(): Promise<admin.auth.UserInfo[]> {
  try {
    const app = getFirebaseAdmin();
    const listUsersResult = await adminAuth(app).listUsers();
    return listUsersResult.users.map(user => user.toJSON() as admin.auth.UserInfo);
  } catch (error) {
    console.error('Error listing users:', error);
    return [];
  }
}

export async function getUsersCount(): Promise<number> {
  try {
    const app = getFirebaseAdmin();
    const listUsersResult = await adminAuth(app).listUsers();
    return listUsersResult.users.length;
  } catch (error) {
    console.error('Error listing users:', error);
    return 0;
  }
}

export async function getJobsCount(): Promise<number> {
  try {
    const app = getFirebaseAdmin();
    const snapshot = await adminDb(app).collection('jobs').get();
    return snapshot.size;
  } catch (error) {
    console.error('Error getting jobs count:', error);
    return 0;
  }
}

export async function getApplicationsCount(): Promise<number> {
  try {
    const app = getFirebaseAdmin();
    const snapshot = await adminDb(app).collection('applications').get();
    return snapshot.size;
  } catch (error) {
    console.error('Error getting applications count:', error);
    return 0;
  }
}

export async function addJob(job: Omit<Job, 'id'>) {
  try {
    const app = getFirebaseAdmin();
    const docRef = await adminDb(app).collection('jobs').add(job);
    return docRef.id;
  } catch(error) {
    console.error("Error adding job: ", error);
    throw new Error("Could not add job to database.");
  }
}

export async function createUser(data: { uid: string; email: string; displayName: string }) {
  try {
    const app = getFirebaseAdmin();
    await adminDb(app).collection('users').doc(data.uid).set({
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
  try {
    const app = getFirebaseAdmin();
    // Update Firebase Auth
    await adminAuth(app).updateUser(uid, {
      displayName: data.displayName,
      photoURL: data.photoURL,
    });

    // Update Firestore user document
    const userRef = adminDb(app).collection('users').doc(uid);
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

export async function updateSettings(documentId: string, settings: any) {
  try {
    const app = getFirebaseAdmin();
    const settingsRef = adminDb(app).collection('settings').doc(documentId);
    await settingsRef.set(settings, { merge: true });
  } catch (error) {
    console.error("Error updating settings: ", error);
    throw new Error("Could not update settings in database.");
  }
}
