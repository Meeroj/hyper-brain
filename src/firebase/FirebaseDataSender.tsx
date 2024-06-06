import { db } from "@/firebaseConfig";
import { collection, doc, serverTimestamp, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

interface FirebaseDataSenderProps {
  userInputNumbers: number[];
  randomNumbers: number[];
}

const FirebaseDataSender: React.FC<FirebaseDataSenderProps> = ({ userInputNumbers, randomNumbers }) => {
  const { user } = useUser();

  useEffect(() => {
    const correctCount = userInputNumbers.reduce((count, num, index) => {
      return count + (Number(num) === Number(randomNumbers[index]) ? (num.toString() != '' ? 1 : 0) : 0);
    }, 0);

    const saveData = async () => {
      try {
        if (user) {
          const nickname = user.username || user.firstName || 'Unknown';
          const docRef = doc(collection(db, 'speedNumber'), nickname);

          const docSnap = await getDoc(docRef);
          const currentDate = new Date();
          const day = currentDate.getDate().toString().padStart(2, '0');
          const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
          const year = currentDate.getFullYear();
          const currentDateString = `${day}${month}${year}`;

          if (docSnap.exists()) {
            const existingData = docSnap.data();
            let updatedNumbers;

            if (existingData.correctNumbers && existingData.correctNumbers[currentDateString]) {
              updatedNumbers = {
                ...existingData.correctNumbers,
                [currentDateString]: [...existingData.correctNumbers[currentDateString], correctCount]
              };
            } else {
              updatedNumbers = {
                ...existingData.correctNumbers,
                [currentDateString]: [correctCount]
              };
            }

            await updateDoc(docRef, {
              correctNumbers: updatedNumbers,
              timestamp: serverTimestamp()
            });
          } else {
            await setDoc(docRef, {
              correctNumbers: {
                [currentDateString]: [correctCount]
              },
              timestamp: serverTimestamp()
            });
          }
          console.log("Training result saved for user:", nickname);
        } else {
          console.error("No user information available");
        }
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    };

    saveData();
  }, [userInputNumbers, randomNumbers, user]);

  return null;
};

export default FirebaseDataSender;
