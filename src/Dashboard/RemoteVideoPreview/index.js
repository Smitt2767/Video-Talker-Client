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
      <video ref={remoteVideoRef} autoPlay className="video"></video>
    </div>
  );
};

export default RemoteVideoPreview;
