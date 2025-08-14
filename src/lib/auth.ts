
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    type Auth
} from 'firebase/auth';
import { app } from '@/lib/firebase';

export const auth: Auth = getAuth(app);

export const signUp = async (email: string, password: string, fullName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (userCredential.user) {
        await updateProfile(userCredential.user, {
            displayName: fullName,
        });
    }
    return userCredential;
}

export const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const logout = () => {
    return signOut(auth);
}
