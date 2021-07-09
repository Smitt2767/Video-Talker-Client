import React from "react";
import GroupCallRoomListItem from "./GroupCallRoomListItem";
import { useSelector } from "react-redux";
const GroupCallRoomList = () => {
  const { rooms } = useSelector((state) => state.call);

  return (
    <div className="w-full bg-customBlack flex overflow-y-auto ">
      {rooms &&
        rooms.map((room) => {
          return (
            <React.Fragment key={room.roomId}>
              <GroupCallRoomListItem room={room} />
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default GroupCallRoomList;
