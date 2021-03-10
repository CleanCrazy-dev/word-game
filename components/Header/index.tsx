import React from "react";
import QuestionWordList from "../QuestionWordList";
import ControllerContainer from "../ControllerContainer";
export const TopHeaderContainer = () => {
    return (
        <div className="TopHeaderContainer">
            <div className="LogoImaginaword">
                <img
                    src="static/images/LogoAnglais.svg"
                    width={188}
                    height={33}
                    alt=""
                />
            </div>
            <div className="BlueClowd">
                <img
                    src="static/images/NuageBulle_FondBlanc.svg"
                    width={590}
                    height={194}
                    alt=""
                />
                <QuestionWordList />
                <ControllerContainer />
            </div>
        </div>
    );
};
