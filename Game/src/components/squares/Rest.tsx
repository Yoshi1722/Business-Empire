import React from "react";

interface Props {
    id: number;
}

export const Odpoczynek: React.FC<Props> = ({ id }) => {

    return (
        <React.Fragment>
            <div className="icon"></div>
            <div className="square-name">Dosłownie nic</div>
        </React.Fragment>
    );

};