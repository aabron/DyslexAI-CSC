import { getAuth, updateProfile, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

export const usernameUpdate = async (newUsername, password) => {
    const auth = getAuth();
    const user = auth.currentUser;

    const credential = EmailAuthProvider.credential(user.email, verifiedPassword);

    reauthenticateWithCredential(user, credential)
        .then(() => {
            return updateProfile(user, {
                displayName: newDisplayName,
            });
        })
        .then(() => {
            console.log("Username is updated!");
        })
        .catch((error) => {
            console.log("Username is not updated:", error.message);
        });

}
