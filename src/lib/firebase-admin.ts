
import admin from 'firebase-admin';
import type { App } from 'firebase-admin/app';
import type { Auth } from 'firebase-admin/auth';
import type { Firestore } from 'firebase-admin/firestore';
import type { Job } from './types';

let app: App;
let auth: Auth;
let db: Firestore;

if (!admin.apps.length) {
  try {
    app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error: any) {
    console.error('Firebase Admin SDK initialization error:', error.stack);
    throw error;
  }
} else {
  app = admin.app();
}

auth = admin.auth(app);
db = admin.firestore(app);

export { app, auth, db };


export async function getUsers(): Promise<admin.auth.UserInfo[]> {
  try {
    const listUsersResult = await auth.listUsers();
    return listUsersResult.users.map(user => user.toJSON() as admin.auth.UserInfo);
  } catch (error) {
    console.error('Error listing users:', error);
    return [];
  }
}

export async function getUsersCount(): Promise<number> {
  try {
    const listUsersResult = await auth.listUsers();
    return listUsersResult.users.length;
  } catch (error) {
    console.error('Error listing users:', error);
    return 0;
  }
}

export async function getJobsCount(): Promise<number> {
  try {
    const snapshot = await db.collection('jobs').get();
    return snapshot.size;
  } catch (error) {
    console.error('Error getting jobs count:', error);
    return 0;
  }
}

export async function getApplicationsCount(): Promise<number> {
  try {
    const snapshot = await db.collection('applications').get();
    return snapshot.size;
  } catch (error) {
    console.error('Error getting applications count:', error);
    return 0;
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

export async function createUser(data: { uid: string; email: string; displayName: string }) {
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

export async function updateSettings(documentId: string, settings: any) {
  try {
    const settingsRef = db.collection('settings').doc(documentId);
    await settingsRef.set(settings, { merge: true });
  } catch (error) {
    console.error("Error updating settings: ", error);
    throw new Error("Could not update settings in database.");
  }
}
