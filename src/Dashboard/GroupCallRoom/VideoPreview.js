import React, { useEffect, useRef } from "react";

const VideoPreview = ({ stream }) => {
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
    <div>
      <video ref={videoRef} autoPlay className="video" />
    </div>
  );
};

export default VideoPreview;
