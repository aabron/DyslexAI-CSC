import { getAuth, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

export const EmailUpdater = async (newEmail, password) => {
    const auth = getAuth();
    const user = auth.currentUser;

    const credential = EmailAuthProvider.credential(user.email, password);

    reauthenticateWithCredential(user, credential)
        .then(() => {
            return updateEmail(user,newEmail);
        })
        .then(() => {
            console.log("Email is updated!");
        })
        .catch((error) => {
            console.error("Email can't update", error.message);
        })
};