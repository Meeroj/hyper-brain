import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { realtimeDB } from "@/firebaseConfig";
import { ref, set, onValue, get } from "firebase/database";
import { useEffect, useState } from "react";
import { Swords } from "lucide-react";

export default function Battle() {
  const { user } = useUser();
  const [isBattleAllow, setIsBattleAllow] = useState(false);
  const [users, setUsers] = useState<
    {
      username: string;
      isBattleAllow: boolean;
      image: string;
      isOnline: boolean;
      battleResult: { number: number };
    }[]
  >([]);

  useEffect(() => {
    if (user) {
      const username = user.username || user.id; // Use username if available, otherwise fallback to user ID
      const userRef = ref(realtimeDB, `Battle/users/${username}/isBattleAllow`);

      // Read the isBattleAllow property for the user from the database
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

    // Set up a real-time listener for users' data
    const unsubscribe = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const usersList = Object.keys(usersData).map((key) => ({
          username: usersData[key].username,
          isBattleAllow: usersData[key].isBattleAllow,
          image: usersData[key].image,
          isOnline: usersData[key].isOnline,
          battleResult: usersData[key].battleResult,
        }));
        setUsers(usersList);
      }
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  const handleButtonCancel = async () => {
    if (user) {
      const username = user.username || user.id; // Use username if available, otherwise fallback to user ID
      const userRef = ref(realtimeDB, `Battle/users/${username}`);

      // Save the isBattleAllow property for the user
      await set(userRef, {
        username,
        isBattleAllow: false,
        image: user.imageUrl,
        isOnline: false,
        battleResult: { number: 0 },
      });

      setIsBattleAllow(false);
      console.log("clicked");
    }
  };

  const handleButtonClick = async (calledUser: any) => {
    if (user) {
      const ownerUsername = user.username || user.id; // Use username if available, otherwise fallback to user ID
      const calledUsername = calledUser.username;

      // Save the battle data in the Firebase Realtime Database
      await set(ref(realtimeDB, `Battle/currentBattles/${ownerUsername}`), {
        ownerUsername: {
          ownerUsername,
          image: user.imageUrl,
          battleResult: { number: 0 },
        },
        calledUsername: {
          calledUsername,
          image: user.imageUrl,
          battleResult: { number: 0 },
        },
      });

      // Update the isBattleAllow property for both users
      await set(
        ref(realtimeDB, `Battle/users/${ownerUsername}/isBattleAllow`),
        true
      );
      await set(
        ref(realtimeDB, `Battle/users/${calledUsername}/isBattleAllow`),
        true
      );

      setIsBattleAllow(true);
      console.log("clicked");
    }
  };

  return (
    <div>
      {!isBattleAllow ? (
        <Button>I Agree</Button>
      ) : (
        <div className="m-4 w-full flex flex-col flex-wrap items-start gap-5">
          <h2 className="text-3xl font-semibold te">All Battle Users</h2>
          <ul className=" flex gap-2 ">
            {users.map((user, index) => (
              <li
                key={index}
                className="w-[170px] p-3 flex flex-col border rounded-xl justify-between relative"
              >
                <span
                  className={`absolute w-5 h-5 rounded-full top-36 right-9 ${
                    user.isOnline ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
                <img
                  src={user.image}
                  alt={user.username}
                  className="rounded-full w-[150px] h-[150px]"
                />
                <div>
                  <p className=" capitalize text-2xl">{user.username}</p>
                  <p>Wins: {user.battleResult.number}</p>
                </div>
                <Button
                  className="mt-3"
                  onClick={() => handleButtonClick(user)}
                >
                  Battle <Swords className="w-5 h-5 ms-3" />
                </Button>
              </li>
            ))}
          </ul>
          <Button onClick={handleButtonCancel}>I Disagree</Button>
        </div>
      )}
    </div>
  );
}
