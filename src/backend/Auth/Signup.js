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
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ 
        prompt: 'select_account'
    });
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        
        const firstName = result.user.displayName.split(' ')[0];
        const lastName = result.user.displayName.split(' ')[1];

        const db = getDatabase();
        const userRef = ref(db, 'users/' + result.user.uid);

        set(userRef, {
            firstName: firstName,
            lastName: lastName
        });
        
    }) .catch((error) => {
        const errorCode = error.code;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

/*
export const googleSignIn = async () => {
    try {
        const db = getDatabase();
        const auth = getAuth();
        const provider = await new GoogleAuthProvider();
        // const result = await 
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // const user = result.user;

        // // Save user info in the database
        // await set(ref(db, 'users/' + user.uid), {
        //     firstName: user.displayName.split(' ')[0],
        //     lastName: user.displayName.split(' ')[1],
        // });

        return signInWithPopup(auth, provider);
    } catch (error) {
        throw new Error(error.message);
    }
};
*/
