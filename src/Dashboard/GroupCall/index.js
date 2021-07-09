import React from "react";
import { useSelector, useDispatch } from "react-redux";
import GroupCallButton from "../GroupCallButton";
import * as constants from "../../constants";
import { createNewGroupCall } from "../../utils/webRTC/webRTCGroupCallHandler";
import GroupCallRoom from "../GroupCallRoom";
import ConversationButtons from "../CoversationButtons";

const GroupCall = () => {
  const { localStream, callState, groupCallActive } = useSelector(
    (state) => state.call
  );

  const createRoom = () => {
    createNewGroupCall();
  };

  return (
    <>
      {groupCallActive && (
        <>
          <div className="h-full overflow-y-auto relative  ">
            <h1 className="pl-5 md:pl-0 py-4 md:text-center text-customWhite text-2xl md:text-4xl">
              Group Call
            </h1>
            <GroupCallRoom />
          </div>
        </>
      )}
      {!groupCallActive &&
        localStream &&
        callState !== constants.callState.CALL_IN_PROGRESS && (
          <div className="absolute top-5 left-5">
            <GroupCallButton onClickHandler={createRoom} label="Create Room" />
          </div>
        )}
    </>
  );
};

export default GroupCall;
