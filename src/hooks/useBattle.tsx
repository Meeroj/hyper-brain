import { useState, useEffect } from "react";
import { ref, set, onValue, get } from "firebase/database";
import { realtimeDB } from "@/firebaseConfig";
import { useUser } from "@clerk/clerk-react";

interface User {
  username: string;
  isBattleAllow: boolean;
  image: string;
  isOnline: boolean;
  haveBattle: boolean;
  battleResult: { number: number };
}

export const useBattle = () => {
  const { user } = useUser();
  const [isBattleAllow, setIsBattleAllow] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (user) {
      const username = user.username || user.id;
      const userRef = ref(realtimeDB, `Battle/users/${username}/isBattleAllow`);

      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setIsBattleAllow(snapshot.val());
          }
        })
        .catch((error) => {
          console.error("Error reading isBattleAllow:", error);
        });
    }
  }, [user]);

  useEffect(() => {
    const usersRef = ref(realtimeDB, "Battle/users");

    const unsubscribe = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const usersList = Object.keys(usersData).map((key) => ({
          username: usersData[key].username,
          isBattleAllow: usersData[key].isBattleAllow,
          image: usersData[key].image,
          isOnline: usersData[key].isOnline,
          haveBattle: usersData[key].haveBattle,
          battleResult: usersData[key].battleResult,
        }));
        setUsers(usersList);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleButtonCancel = async () => {
    if (user) {
      const username = user.username || user.id;
      const userRef = ref(realtimeDB, `Battle/users/${username}`);

      await set(userRef, {
        username,
        isBattleAllow: false,
        image: user.imageUrl,
        isOnline: false,
        haveBattle: false,
        battleResult: { number: 0 },
      });

      setIsBattleAllow(false);
      console.log("clicked");
    }
  };

  const handleButtonClick = async (calledUser: User) => {
    if (user) {
      const ownerUsername = user.username || user.id;
      const calledUsername = calledUser.username;

      await set(ref(realtimeDB, `Battle/currentBattles/${ownerUsername}`), {
        ownerUsername: {
          ownerUsername,
          image: user.imageUrl,
          battleResult: { number: 0 },
        },
        calledUsername: {
          calledUsername,
          image: calledUser.image,
          battleResult: { number: 0 },
        },
      });

      await set(
        ref(realtimeDB, `Battle/users/${ownerUsername}/haveBattle`),
        true
      );
      await set(
        ref(realtimeDB, `Battle/users/${calledUsername}/haveBattle`),
        true
      );

      setIsBattleAllow(true);
      console.log("clicked");
    }
  };

  const handleButtonAgree = async () => {
    if (user) {
      const username = user.username;

      await set(ref(realtimeDB, `Battle/users/${username}`), {
        username,
        isBattleAllow: false,
        image: user.imageUrl,
        isOnline: true,
        haveBattle: true,
        battleResult: { number: 0 },
      });

      setIsBattleAllow(true);
      console.log("clicked");
    }
  };

  return {
    isBattleAllow,
    users,
    handleButtonCancel,
    handleButtonClick,
    handleButtonAgree,
  };
};
