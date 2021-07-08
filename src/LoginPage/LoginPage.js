import React, { useState, useRef, useEffect } from "react";
import Logo from "../resources/logo.png";
import { setUsername } from "../Dashboard/store/dashboardSlice";
import { useDispatch } from "react-redux";
import { registerNewUser } from "../utils/wssConnection";

const LoginPage = (props) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleClick = () => {
    dispatch(setUsername(name));
    setName("");
    registerNewUser({
      username: name,
    });
    props.history.push("dashboard");
  };

  return (
    <div className="h-full flex justify-center items-center bg-customBlue">
      <div className="border-2 border-customBlack rounded-xl bg-customBlack py-16 px-12 flex flex-col items-center">
        <img
          src={Logo}
          alt="logo video talker"
          className="max-h-36 mt-4 mb-8 "
        />
        <h1 className="text-customWhite text-4xl font-bold mb-8">
          Get On Dashboard
        </h1>
        <div className="flex flex-col items-center w-full ">
          <input
            ref={inputRef}
            type="text"
            className="bg-customBlue text-customWhite text-center h-12 w-5/6 rounded-full focus:outline-none font-bold text-xl placeholder-gray-300 mb-8"
            placeholder="Your Name..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.keyCode === 13) {
                handleClick();
              }
            }}
          />
          <button
            className="bg-customBlue text-customWhite text-center w-3/6 py-1 px-5 rounded-full focus:outline-none font-bold hover:bg-opacity-80"
            onClick={() => {
              handleClick();
            }}
          >
            Start Using Video Talker
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
