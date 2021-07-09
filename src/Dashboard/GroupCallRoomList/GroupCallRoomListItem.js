import React from "react";
import { joinGroupCall } from "../../utils/webRTC/webRTCGroupCallHandler";
import { useSelector } from "react-redux";
const GroupCallRoomListItem = ({ room }) => {
  const handleListItemPressed = (room) => {
    joinGroupCall(room.socketId, room.roomId);
  };
  const { groupCallActive } = useSelector((state) => state.call);

  return (
    <button
      className="w-40 px-4 border-t-2 border-r-2 border-customBlack flex justify-center items-center bg-customBlue cursor-pointer hover:bg-opacity-40"
      key={room.id}
      onClick={() => {
        handleListItemPressed(room);
      }}
      disabled={groupCallActive}
    >
      <h3 className="text-xl text-customWhite font-bold">{room.hostname}</h3>
    </button>
  );
};

export default GroupCallRoomListItem;
