
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    type Auth
} from 'firebase/auth';
import { app } from '@/lib/firebase';

export const auth: Auth = getAuth(app);

export const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const logout = () => {
    return signOut(auth);
}
