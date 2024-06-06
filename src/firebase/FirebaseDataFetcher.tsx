import { db } from "@/firebaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";

interface FirebaseDataFetcherProps {
  onFetch: (data: any) => void;
}

const FirebaseDataFetcher: React.FC<FirebaseDataFetcherProps> = ({ onFetch }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const nickname = user.username || user.firstName || 'Unknown';
          const docRef = doc(collection(db, 'speedNumber'), nickname);

          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            onFetch(data);
          } else {
            console.log("No data found");
          }
        } else {
          console.error("No user information available");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, onFetch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return null;
};

export default FirebaseDataFetcher;
