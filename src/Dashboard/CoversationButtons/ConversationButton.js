import React from "react";

const ConversationButton = (props) => {
  return (
    <button
      className={`${
        props.bgRed ? "bg-red-600" : "bg-customBlack"
      } p-2 md:p-3 rounded-full mx-3 hover:bg-opacity-80`}
      onClick={props.handleOnClick}
    >
      {props.children}
    </button>
  );
};

export default ConversationButton;
