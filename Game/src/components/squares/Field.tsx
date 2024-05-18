import React from "react";
import { BusinessEmpireData } from "../Theme";
import { ColorBar } from "./ColorBar";

interface Props {
    id: number;
}

export const Pole: React.FC<Props> = ({ id }) => {

    const txt: string | undefined = BusinessEmpireData.get(id)?.name;

    return (
        <React.Fragment>
            <ColorBar id={id} />
            <div className="square-name">{txt}</div>
        </React.Fragment>
    );

};