import React from "react";

const NumberButton = ({ number, handleNumberButton }) => {
    return (
        <React.Fragment>
            <button
                onClick={() => {
                    handleNumberButton(number);
                }}
            >
                {number}
            </button>
        </React.Fragment>
    );
};

export default NumberButton;
