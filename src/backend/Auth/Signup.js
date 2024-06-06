// sign up
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";

export const signUpLogic = async (email, username, password, firstName, lastName) => {
    const db = getDatabase();
    const auth = getAuth();
    const userInfo = await createUserWithEmailAndPassword(auth, email, password);
    const user = userInfo.user;

    await updateProfile(user, { displayName: username });
    const response = await set(ref(db, 'users/' + user.uid), {
        firstname: firstName,
        lastname: lastName,
    });
    console.log("Sign up completed");
};

export const googleSignIn = async () => {
    try {
        const db = getDatabase();
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Save user info in the database
        await set(ref(db, 'users/' + user.uid), {
            firstName: user.displayName.split(' ')[0],
            lastName: user.displayName.split(' ')[1],
        });

        return { message: 'Google Sign-In successful', user };
    } catch (error) {
        throw new Error(error.message);
    }
};