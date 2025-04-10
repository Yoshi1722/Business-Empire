import React from "react";
import { BusinessEmpireData } from "../Theme";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
interface Props {
    id: number;
}

export const Lotnisko: React.FC<Props> = ({ id }) => {

    const txt: string | undefined = BusinessEmpireData.get(id)?.name;

    return (
        <React.Fragment>
            <div className="blank"></div>
            <div className="icon">
                <FontAwesomeIcon icon={faPlane} size="3x" />
            </div>
            <div className="square-name"> {txt}</div>
            
        </React.Fragment>
    );

};
