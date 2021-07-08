import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const RemoteVideoPreview = () => {
  const remoteVideoRef = useRef();
  const { remoteStream } = useSelector((state) => state.call);

  useEffect(() => {
    if (remoteStream && remoteVideoRef && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <div className="h-full w-full">
      <div className="border-2 border-red w-16 h-16 absolute bottom-0"></div>

      <video ref={remoteVideoRef} autoPlay className="video">
        <div></div>
      </video>
    </div>
  );
};

export default RemoteVideoPreview;
