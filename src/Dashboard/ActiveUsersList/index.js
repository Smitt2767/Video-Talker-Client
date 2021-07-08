import React from "react";
import { useSelector } from "react-redux";
import userAvatar from "../../resources/userAvatar.png";
import { callToOtherUser } from "../../utils/webRTC";
import * as constants from "../../constants/index";

const ActiveUsersList = ({ setShowDrawer = null }) => {
  const { activeUsers, socketId } = useSelector((state) => state.dashboard);
  const { callState } = useSelector((state) => state.call);

  const handleUserListClick = (user) => {
    callToOtherUser(user);
    setShowDrawer && setShowDrawer();
  };

  return (
    <>
      {activeUsers?.map((user) => {
        return (
          <React.Fragment key={user.socketId}>
            {user.socketId !== socketId ? (
              <button
                className="flex justify-start items-center px-4 md:px-8 py-3 w-full hover:bg-customBlue hover:bg-opacity-40"
                onClick={() => {
                  handleUserListClick(user);
                }}
                disabled={callState === constants.callState.CALL_IN_PROGRESS}
              >
                <img
                  src={userAvatar}
                  alt="user avatar"
                  className="w-12 mr-8 "
                />
                <h3 className="text-xl text-customWhite font-bold">
                  {user.username}
                </h3>
              </button>
            ) : null}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default ActiveUsersList;
