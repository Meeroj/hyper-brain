import { FC } from "react";
import { Button } from "@/components/ui/button";

interface BattleButtonsProps {
  isBattleAllow: boolean;
  onAgreeClick: () => void;
  onCancelClick: () => void;
}

const BattleButtons: FC<BattleButtonsProps> = ({
  isBattleAllow,
  onAgreeClick,
  onCancelClick,
}) => (
  <div>
    {!isBattleAllow ? (
      <Button onClick={onAgreeClick}>I Agree</Button>
    ) : (
      <Button onClick={onCancelClick}>I Disagree</Button>
    )}
  </div>
);

export default BattleButtons;
