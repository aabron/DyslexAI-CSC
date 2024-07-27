import { get, getDatabase, ref, set } from "firebase/database";

export const getUserReadingHistory = (userId) => {
    const db = getDatabase();
    const userRef = ref(db, 'users/' + userId + '/readingHistory');
    get(userRef)
        .then((snapshot) => {
            console.log(snapshot.val());
            return snapshot.val();
        })
        .catch((error) => {
            console.error('Error getting reading history: ', error);
        });
};

export const updateReadingHistory = (userId, bookId, title, description) => {
    const db = getDatabase();
    const userRef = ref(db, 'users/' + userId);
    const newEntry = {
        bookId: bookId,
        title: title,
        description: description
    };

    const readingHistoryRef = ref(db, 'users/' + userId + '/readingHistory');
    get(readingHistoryRef)
        .then((snapshot) => {
            let readingHistory = snapshot.val() || [];
            readingHistory.push(newEntry);
            set(readingHistoryRef, readingHistory)
                .then(() => {
                    console.log('Reading history updated successfully');
                })
                .catch((error) => {
                    console.error('Error updating reading history: ', error);
                });
        })
        .catch((error) => {
            console.error('Error getting reading history: ', error);
        });
};


