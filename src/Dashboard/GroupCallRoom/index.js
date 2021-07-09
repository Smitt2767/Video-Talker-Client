import React from "react";
import { useSelector } from "react-redux";
import VideoPreview from "./VideoPreview";

const GroupCallRoom = () => {
  const { groupCallStreams } = useSelector((state) => state.call);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2  p-4">
      {groupCallStreams.map((stream) => {
        return <VideoPreview stream={stream} key={stream.id} />;
      })}
    </div>
  );
};

export default GroupCallRoom;
