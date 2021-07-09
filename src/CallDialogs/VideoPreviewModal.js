import React, { useRef, useEffect } from "react";

const VideoPreviewModal = ({ stream, setShowModal }) => {
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
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none closeModal "
        onClick={(e) => {
          console.log(e.target.classList);
          if (e.target.classList.contains("closeModal")) {
            setShowModal(false);
          }
        }}
      >
        <div className="modal-show h-full w-full flex justify-center closeModal">
          {/*content*/}

          {/*body*/}
          <video
            ref={videoRef}
            autoPlay
            onClick={() => setShowModal(true)}
            className="h-full closeModal"
          />
          {/*footer*/}
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-30 bg-black"></div>
    </>
  );
};

export default VideoPreviewModal;
