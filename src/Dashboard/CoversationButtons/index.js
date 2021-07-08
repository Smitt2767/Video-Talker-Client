import React from "react";
import {
  MdCallEnd,
  MdMic,
  MdMicOff,
  MdVideocam,
  MdVideocamOff,
  MdVideoLabel,
  MdVideoCall,
  MdCamera,
} from "react-icons/md";
import ConversationButton from "./ConversationButton";
import { useSelector, useDispatch } from "react-redux";
import {
  setLocalCameraEnable,
  setLocalMicroPhoneEnable,
} from "../store/callSlice";
import { hangUp, switchCameraAndScreenSharing } from "../../utils/webRTC";

const ConversationButtons = () => {
  const dispatch = useDispatch();
  const {
    localStream,
    localCameraEnable,
    localMicroPhoneEnable,
    screenSharingActive,
  } = useSelector((state) => state.call);

  const handleMicButtonPressed = () => {
    const micEnabled = localMicroPhoneEnable;
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    dispatch(setLocalMicroPhoneEnable(!micEnabled));
  };

  const handleCameraButtonPressed = () => {
    const cameraEnabled = localCameraEnable;
    localStream.getVideoTracks()[0].enabled = !cameraEnabled;
    dispatch(setLocalCameraEnable(!cameraEnabled));
  };

  return (
    <div className="absolute bottom-5 w-full">
      <div className="flex justify-center items-center">
        <div className=" flex justify-center items-center">
          <ConversationButton handleOnClick={handleMicButtonPressed}>
            {localMicroPhoneEnable ? (
              <MdMic className="h-8 w-8 text-customWhite" />
            ) : (
              <MdMicOff className="h-8 w-8 text-customWhite" />
            )}
          </ConversationButton>
          <ConversationButton bgRed={true} handleOnClick={hangUp}>
            <MdCallEnd className="h-8 w-8 text-customWhite" />
          </ConversationButton>
          <ConversationButton handleOnClick={handleCameraButtonPressed}>
            {localCameraEnable ? (
              <MdVideocam className="h-8 w-8 text-customWhite" />
            ) : (
              <MdVideocamOff className="h-8 w-8 text-customWhite" />
            )}
          </ConversationButton>
          {navigator.userAgent.toLowerCase().indexOf("android") === -1 && (
            <ConversationButton handleOnClick={switchCameraAndScreenSharing}>
              {!screenSharingActive ? (
                <MdVideoLabel className="h-8 w-8 text-customWhite" />
              ) : (
                <MdCamera className="h-8 w-8 text-customWhite" />
              )}
            </ConversationButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationButtons;
