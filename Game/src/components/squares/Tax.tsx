import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons'

interface Props {
    id: number;
}

export const Podatek: React.FC<Props> = ({ id }) => {

    return (
        <React.Fragment>
            <div className="blank"></div>
            <div className="icon">
                <FontAwesomeIcon icon={faHandHoldingDollar} size="3x" color="black" />
            </div>
            <div className="square-name">Podatek!</div>
        </React.Fragment>
    );

};