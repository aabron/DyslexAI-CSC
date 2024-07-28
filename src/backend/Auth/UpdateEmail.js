import { getAuth, updateEmail, sendEmailVerification } from "firebase/auth";

export const EmailUpdater = async (newEmail) => {
    const auth = getAuth();

    return sendEmailVerification(auth.currentUser)
        .then(() => {
            return updateEmail(auth.currentUser,newEmail)
        })
        .then(() => {
            console.log("Email sucessfully updated", newEmail);
        }).catch((error) => {
            if(error.code === 'auth/invalid-email') {
                console.error("Invalid email format!", error.code);
            } else {
                console.error("error occured for update email", error.message);
            }
        })
};