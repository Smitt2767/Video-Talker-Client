import React, { useEffect, useRef, useState } from "react";
import VideoPreviewModal from "../../CallDialogs/VideoPreviewModal";

const VideoPreview = ({ stream }) => {
  const [showModal, setShowModal] = useState(false);
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef && videoRef.current) {
      videoRef.current.srcObject = stream;

      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play();
      };
    }
  }, [stream]);

  return (
    <>
      {showModal && (
        <VideoPreviewModal stream={stream} setShowModal={setShowModal} />
      )}
      <div>
        <video
          ref={videoRef}
          autoPlay
          className="video cursor-pointer"
          onClick={() => setShowModal(true)}
        />
      </div>
    </>
  );
};

export default VideoPreview;
