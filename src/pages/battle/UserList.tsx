import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Swords } from "lucide-react";

interface User {
  username: string;
  isBattleAllow: boolean;
  image: string;
  isOnline: boolean;
  battleResult: { number: number };
}

interface UserListProps {
  users: User[];
  onBattleClick: (user: User) => void;
}

const UserList: FC<UserListProps> = ({ users, onBattleClick }) => (
  <ul className="flex gap-2">
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
          <p className="capitalize text-2xl">{user.username}</p>
          <p>Wins: {user.battleResult.number}</p>
        </div>
        <Button className="mt-3" onClick={() => onBattleClick(user)}>
          Battle <Swords className="w-5 h-5 ms-3" />
        </Button>
      </li>
    ))}
  </ul>
);

export default UserList;
