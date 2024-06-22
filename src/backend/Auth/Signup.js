// sign up
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
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
    const db = getDatabase();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: 'select_account'
    });
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            const user = result.user;

            // Get additional user info
        const additionalUserInfo = getAdditionalUserInfo(result);
        const firstName = additionalUserInfo.profile.given_name;
        const lastName = additionalUserInfo.profile.family_name;

        // Save the user's first name and last name in Firebase Realtime Database
        //const userRef = ref(db, 'users/' + user.uid);
        set(ref(db, 'users/' + user.uid), {
            firstname: firstName,
            lastname: lastName,
        });
        }) .catch((error) => {
            const errorCode = error.code;
            const email = error.customData ? error.customData.email : null;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        })
};


