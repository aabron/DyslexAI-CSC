import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export const forgotPasswordLogic = async (email) => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log("check email to successfully reset password.");
        })
}