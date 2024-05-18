import { SquareType } from "./SquareType";
import { BoardSection } from "./BoardSection";

interface SquareConfigData {
  readonly type: SquareType;
  readonly section: BoardSection;
  readonly groupId?: number;
}

const squareGroupColorMap = new Map<number, string>([
  [1, "dark-purple"], [2, "light-blue"], [3, "purple"], [4, "orange"], [5, "red"], [6, "yellow"], [7, "green"], [8, "dark-blue"],
  [15, "island-color"]
]);



const SquareConfigData = new Map<number, SquareConfigData>();
SquareConfigData.set(1, { type: SquareType.Start, section: BoardSection.Bottom });
SquareConfigData.set(2, { type: SquareType.Pole, section: BoardSection.Bottom, groupId: 1 });
SquareConfigData.set(3, { type: SquareType.Szansa, section: BoardSection.Bottom });
SquareConfigData.set(4, { type: SquareType.Pole, section: BoardSection.Bottom, groupId: 1 });
SquareConfigData.set(5, { type: SquareType.Pole, section: BoardSection.Bottom, groupId: 1 });

SquareConfigData.set(6, { type: SquareType.Lotnisko, section: BoardSection.Bottom, groupId: 10 });

SquareConfigData.set(7, { type: SquareType.Pole, section: BoardSection.Bottom, groupId: 2 });
SquareConfigData.set(8, { type: SquareType.Szansa, section: BoardSection.Bottom });
SquareConfigData.set(9, { type: SquareType.Pole, section: BoardSection.Bottom, groupId: 2 });
SquareConfigData.set(10, { type: SquareType.Pole, section: BoardSection.Bottom, groupId: 2 });

SquareConfigData.set(11, { type: SquareType.Wiezienie, section: BoardSection.Bottom });

SquareConfigData.set(12, { type: SquareType.Pole, section: BoardSection.Left, groupId: 3 });
SquareConfigData.set(13, { type: SquareType.Szansa, section: BoardSection.Left });
SquareConfigData.set(14, { type: SquareType.Pole, section: BoardSection.Left, groupId: 3 });
SquareConfigData.set(15, { type: SquareType.Pole, section: BoardSection.Left, groupId: 3 });

SquareConfigData.set(16, { type: SquareType.Lotnisko, section: BoardSection.Left, groupId: 10 });

SquareConfigData.set(17, { type: SquareType.Pole, section: BoardSection.Left, groupId: 4 });
SquareConfigData.set(18, { type: SquareType.Podatek, section: BoardSection.Left });
SquareConfigData.set(19, { type: SquareType.Pole, section: BoardSection.Left, groupId: 4 });
SquareConfigData.set(20, { type: SquareType.Pole, section: BoardSection.Left, groupId: 4 });

SquareConfigData.set(21, { type: SquareType.Odpoczynek, section: BoardSection.Top });

SquareConfigData.set(22, { type: SquareType.Pole, section: BoardSection.Top, groupId: 5 });
SquareConfigData.set(23, { type: SquareType.Szansa, section: BoardSection.Top });
SquareConfigData.set(24, { type: SquareType.Pole, section: BoardSection.Top, groupId: 5 });
SquareConfigData.set(25, { type: SquareType.Pole, section: BoardSection.Top, groupId: 5 });

SquareConfigData.set(26, { type: SquareType.Lotnisko, section: BoardSection.Top, groupId: 10 });

SquareConfigData.set(27, { type: SquareType.Pole, section: BoardSection.Top, groupId: 6 });
SquareConfigData.set(28, { type: SquareType.Szansa, section: BoardSection.Top });
SquareConfigData.set(29, { type: SquareType.Pole, section: BoardSection.Top, groupId: 6 });
SquareConfigData.set(30, { type: SquareType.Pole, section: BoardSection.Top, groupId: 6 });

SquareConfigData.set(31, { type: SquareType.DoWiezienia, section: BoardSection.Top });

SquareConfigData.set(32, { type: SquareType.Pole, section: BoardSection.Right, groupId: 7 });
SquareConfigData.set(33, { type: SquareType.Szansa, section: BoardSection.Right });
SquareConfigData.set(34, { type: SquareType.Pole, section: BoardSection.Right, groupId: 7 });
SquareConfigData.set(35, { type: SquareType.Pole, section: BoardSection.Right, groupId: 7 });

SquareConfigData.set(36, { type: SquareType.Lotnisko, section: BoardSection.Right, groupId: 10 });

SquareConfigData.set(37, { type: SquareType.Podatek, section: BoardSection.Right });

SquareConfigData.set(38, { type: SquareType.Pole, section: BoardSection.Right, groupId: 8 });
SquareConfigData.set(39, { type: SquareType.Szansa, section: BoardSection.Right });
SquareConfigData.set(40, { type: SquareType.Pole, section: BoardSection.Right, groupId: 8 });

export { SquareConfigData, squareGroupColorMap };