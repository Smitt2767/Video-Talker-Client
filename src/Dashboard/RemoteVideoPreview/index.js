import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VideoPreviewModal from "../../CallDialogs/VideoPreviewModal";
const RemoteVideoPreview = () => {
  const remoteVideoRef = useRef();
  const { remoteStream } = useSelector((state) => state.call);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (remoteStream && remoteVideoRef && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <>
      {showModal && (
        <VideoPreviewModal stream={remoteStream} setShowModal={setShowModal} />
      )}
      <div className="h-full w-full">
        <video
          ref={remoteVideoRef}
          autoPlay
          className="video cursor-pointer"
          onClick={() => {
            setShowModal(true);
          }}
        ></video>
      </div>
    </>
  );
};

export default RemoteVideoPreview;
