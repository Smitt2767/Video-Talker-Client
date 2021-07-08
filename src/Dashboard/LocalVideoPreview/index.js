import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const LocalVideoPreview = () => {
  const localVideoRef = useRef();
  const { localStream } = useSelector((state) => state.call);
  useEffect(() => {
    if (localStream && localVideoRef && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;

      localVideoRef.current.onloadedmetadata = () => {
        localVideoRef.current.play();
      };
    }
  }, [localStream]);

  return (
    <div>
      <video ref={localVideoRef} autoPlay muted className="video" />
    </div>
  );
};

export default LocalVideoPreview;
