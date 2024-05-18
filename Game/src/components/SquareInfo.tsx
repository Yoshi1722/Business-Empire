import React from "react";
import { SquareConfigData } from "./SquareData";
import { SquareType } from "./SquareType";
import { Lotnisko } from "./squares/Airfield";
import { Szansa } from "./squares/Chance";
import { Pole } from "./squares/Field";
import { Odpoczynek } from "./squares/Rest";
import { Start } from "./squares/Start";
import { Podatek } from "./squares/Tax";

interface Props {
    id: number;
}

export const SquareInfo: React.FC<Props> = ({ id }) => {

    const type: SquareType | undefined = SquareConfigData.get(id)?.type;

    const getInfo = () => {
        if (type === SquareType.Lotnisko) {
            return <Lotnisko id={id} />
        }
        if (type === SquareType.Szansa) {
            return <Szansa id={id} />
        }
        if (type === SquareType.Odpoczynek) {
            return <Odpoczynek id={id} />
        }
        if (type === SquareType.Start) {
            return <Start id={id} />
        }
        if (type === SquareType.Podatek) {
            return <Podatek id={id} />
        }
        
        if (type === SquareType.Wiezienie || type === SquareType.DoWiezienia) {
            return null;
        }

        return <Pole id={id} />
    };


    return (
        getInfo()
    );

};