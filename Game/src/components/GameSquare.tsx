import React from "react";
import { BoardSection } from "./BoardSection";
import { SquareConfigData } from "./SquareData";
import { SquareInfo } from "./SquareInfo";
import { SquareType } from "./SquareType";
import { BusinessEmpireData } from "./Theme";
interface Props {
  id: number;
}

export const GameSquare: React.FC<Props> = ({ id }) => {

  const section: BoardSection = SquareConfigData.get(id)?.section!;
  const squareType: SquareType = SquareConfigData.get(id)?.type!;
  const property = BusinessEmpireData.get(id);
  const style = {
    backgroundColor: property && property.ownerColor ? property.ownerColor : 'transparent',
  };
  const sectionMap = new Map<BoardSection, string>([
    [BoardSection.Top, "top"], [BoardSection.Right, "right"], [BoardSection.Left, "left"], [BoardSection.Bottom, "bottom"]
  ]);

  const squareTypeClass = new Map<SquareType, string>([
    [SquareType.Lotnisko, "airport"], [SquareType.Szansa, "chance"], [SquareType.Start, "passgo"],
    [SquareType.DoWiezienia, "go-to-jail"], [SquareType.Wiezienie, "jail"], [SquareType.Pole, "property"],
    [SquareType.Odpoczynek, "central-park"], [SquareType.Podatek, "tax"]
  ]);

  const getContainerClassName = () => {
    return "container container-" + sectionMap.get(section);
  };

  const getSquareClassName = () => {
    return "square " + squareTypeClass.get(squareType);
  };

  const getSquareId = () => {
    return "game-square-" + id;
  };



  return (
    <div className={getSquareClassName()} id={getSquareId()}>
      <div className={getContainerClassName()} style={style}>
        <SquareInfo id={id} />
      </div>
    </div>

  );

};
