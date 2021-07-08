import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Logo from "../resources/logo.png";

import { getLocalStream } from "../utils/webRTC";
import LocalVideoPreview from "./LocalVideoPreview";
import RemoteVideoPreview from "./RemoteVideoPreview";
import CallingDialog from "../CallDialogs/CallingDialog";
import IncomingCallDialog from "../CallDialogs/IncomingCallDialog";
import CallRejectedDialog from "../CallDialogs/CallRejectedDialog";
import * as constants from "../constants";
import ActiveUsersList from "./ActiveUsersList";
import ConversationButtons from "./CoversationButtons";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import notificationSound from "../resources/notification_sound.mp3";

const Dashboard = (props) => {
  const {
    callerUsername,
    calleeUsername,
    callingDialogVisible,
    callState,
    callRejected,
    remoteStream,
  } = useSelector((state) => state.call);
  const { username, activeUsers, socketId } = useSelector(
    (state) => state.dashboard
  );
  const [isOpend, setIsOpend] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showRedDot, setShowRedDot] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (username) {
      getLocalStream();
    }
  }, [username]);

  useEffect(() => {
    if (activeUsers.length > 1) {
      setShowRedDot(true);
    }
  }, [activeUsers.length]);

  const openDrawer = () => {
    setIsOpend(true);
    setShowDrawer(true);
  };

  const closeDrawer = () => {
    setIsOpend(false);
    setTimeout(() => {
      setShowDrawer(false);
    }, 150);
  };

  return (
    <>
      {!username && props.history.push("/")}
      {callingDialogVisible && (
        <CallingDialog calleeUsername={calleeUsername} />
      )}
      {callState === constants.callState.CALL_REQUESTED && (
        <IncomingCallDialog callerUsername={callerUsername} />
      )}
      {callRejected.rejected && (
        <CallRejectedDialog reason={callRejected.reason} />
      )}

      <div className="h-full flex flex-col">
        <div className="block md:hidden h-16 bg-customBlack flex justify-between items-center px-4">
          <img src={Logo} alt="logo video talker" className="h-10" />

          <button className="relative" onClick={() => openDrawer(true)}>
            <AiOutlineMenu className="h-8 w-8 text-customWhite" />
            {showRedDot && (
              <div className="absolute w-3 h-3 bg-red-500 rounded-full top-0 right-0">
                <audio autoPlay>
                  <source src={notificationSound} type="audio/mpeg" />
                </audio>
              </div>
            )}
          </button>
        </div>
        {showDrawer ? (
          <div
            className={`w-3/6 absolute md:hidden right-0 ${
              isOpend ? "open" : "close"
            } bg-customBlack z-10 `}
          >
            <div className="h-screen">
              <div className="h-16 flex justify-start items-center">
                <button
                  className="ml-4"
                  onClick={() => {
                    closeDrawer();
                    setShowRedDot(false);
                  }}
                >
                  <AiOutlineClose className="h-8 w-8 text-customWhite" />
                </button>
              </div>
              <div className="overflow-y-auto">
                <ActiveUsersList closeDrawer={closeDrawer} />
              </div>
            </div>
          </div>
        ) : null}

        <div className="h-5/6 w-full flex">
          <div className="w-full bg-customBlue flex">
            <div className="w-full relative">
              {remoteStream &&
              callState === constants.callState.CALL_IN_PROGRESS ? (
                <RemoteVideoPreview />
              ) : (
                <div className=" h-full flex flex-col justify-center px-4 md:px-8">
                  <h1 className="text-customWhite text-4xl md:text-6xl">
                    Hello {username},Welcome To Video Talker
                  </h1>
                  <p className="text-gray-300 mt-3 text-sm md:text-xl">
                    You can start a call calling directly to a user from a list
                    or you can create or join group call...
                  </p>
                </div>
              )}
              <div className="absolute top-5 left-5">
                <button className="bg-customBlack text-customWhite px-4 md:px-8 py-2 font-bold rounded-full hover:bg-opacity-80">
                  Create Room
                </button>
              </div>
              <div className="absolute top-5 right-5 block lg:hidden h-40 w-40">
                <LocalVideoPreview />
              </div>
              {callState === constants.callState.CALL_IN_PROGRESS ? (
                <ConversationButtons />
              ) : null}
            </div>
            <div className="w-1/6 p-2 hidden lg:block">
              <div>
                <LocalVideoPreview />
              </div>
            </div>
          </div>
          <div className="w-2/6 xl:w-1/6 bg-customBlack overflow-y-auto hidden md:block ">
            <ActiveUsersList />
          </div>
        </div>
        <div className="h-1/6 w-full flex">
          <div className="w-full bg-customBlack flex overflow-y-auto">
            {rooms.map((room) => {
              return (
                <div
                  className="w-40 px-4 border-t-2 border-r-2 border-customBlack flex justify-center items-center bg-customBlue cursor-pointer hover:bg-opacity-40"
                  key={room.id}
                >
                  <h3 className="text-xl text-customWhite font-bold">
                    {room.roomname}
                  </h3>
                </div>
              );
            })}
          </div>
          <div className="w-2/6 xl:w-1/6 hidden md:block bg-customBlack hover:bg-customBlue cursor-pointer ">
            <div className="h-full flex justify-center items-center">
              <img src={Logo} alt="logo video talker" className="w-3/6 " />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
