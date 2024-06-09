import UserList from "./UserList";
import BattleButtons from "./BattleButtons";
import { useBattle } from "@/hooks/useBattle";

export default function Battle() {
  const {
    isBattleAllow,
    users,
    handleButtonCancel,
    handleButtonClick,
    handleButtonAgree,
  } = useBattle();

  return (
    <div>
      {isBattleAllow && (
        <div className="m-4 w-full flex flex-col flex-wrap items-start gap-5">
          <h2 className="text-3xl font-semibold">All Battle Users</h2>
          <UserList users={users} onBattleClick={handleButtonClick} />
        </div>
      )}
      <BattleButtons
        isBattleAllow={isBattleAllow}
        onAgreeClick={handleButtonAgree}
        onCancelClick={handleButtonCancel}
      />
    </div>
  );
}
