// sign up

import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";



export const signUpLogic = async (email, username, password, extraUserData) => {
    const auth = getAuth();

    const userInfo = await
    createUserWithEmailAndPassword(auth, email, password);
    const user = userInfo.user;

    
    await updateProfile(user, {displayName: username});
    await db.collection('users').doc(user.uid).set({
        firstName,
        lastName,
        username,
    });

};