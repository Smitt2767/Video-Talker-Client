import React from "react";
import userAvatar from "../resources/userAvatar.png";
import {
  acceptIncomingCallRequest,
  rejectIncomingCallRequest,
} from "../utils/webRTC";
import callRington from "../resources/incoming_call.mp3";
const IncomingCallDialog = ({ callerUsername }) => {
  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none"
        onClick={(e) => {}}
      >
        <div className="relative w-auto my-6 mx-auto max-w-2xl px-8 md:px-0 modal-show">
          {/*content*/}
          <div className="border-0 rounded-md shadow-lg relative flex flex-col w-full bg-customBlack outline-none focus:outline-none ">
            {/*body*/}
            <div className="flex flex-col justify-center items-center px-8 py-8">
              <audio autoPlay>
                <source src={callRington} type="audio/mpeg" />
              </audio>
              <h1 className="text-4xl font-bold text-customWhite mb-6">
                Incoming Call From {callerUsername}
              </h1>
              <img src={userAvatar} alt="user avatar" className="h-72 mb-6" />
              <div className="flex w-full">
                <button
                  className="text-customWhite border-2 border-green-500 w-full py-2 rounded-full text-lg hover:bg-green-500 mx-1"
                  onClick={acceptIncomingCallRequest}
                >
                  Accept
                </button>
                <button
                  className="text-customWhite border-2 border-red-500 w-full py-2 rounded-full text-lg hover:bg-red-500 mx-1"
                  onClick={rejectIncomingCallRequest}
                >
                  Reject
                </button>
              </div>
            </div>
            {/*footer*/}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-30 bg-black"></div>
    </>
  );
};

export default IncomingCallDialog;
