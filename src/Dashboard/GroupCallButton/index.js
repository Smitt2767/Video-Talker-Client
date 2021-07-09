import React from "react";

const GroupCallButton = ({ onClickHandler, label }) => {
  return (
    <button
      className="bg-customBlack text-customWhite px-4 md:px-8 py-2 font-bold rounded-full hover:bg-opacity-80"
      onClick={onClickHandler}
    >
      {label}
    </button>
  );
};

export default GroupCallButton;
