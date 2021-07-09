import socketIoClient from "socket.io-client";
import store from "../../store/index";
import {
  setActiveUsers,
  setSocketId,
} from "../../Dashboard/store/dashboardSlice";
import * as constants from "../../constants";
import * as webRTCHandler from "../webRTC";
import { setRooms } from "../../Dashboard/store/callSlice";
import * as webRTCGroupCallHandler from "../webRTC/webRTCGroupCallHandler";
const SERVER_URL = "http://192.168.0.101:3001/";
// const SERVER_URL = "https://video--talker.herokuapp.com/";

let socket;

export const connectWithWebSocket = () => {
  socket = socketIoClient(SERVER_URL);
  socket.on("connect", () => {
    store.dispatch(setSocketId(socket.id));
  });
  socket.on("broadcast", (data) => {
    handleBoradcastEvents(data);
  });
  socket.on("pre-offer", (data) => {
    webRTCHandler.handlePreOffer(data);
  });
  socket.on("pre-offer-answer", (data) => {
    webRTCHandler.handlePreOfferAnswer(data);
  });
  socket.on("webRTC-offer", (data) => {
    webRTCHandler.handleRTCOffer(data);
  });
  socket.on("webRTC-answer", (data) => {
    webRTCHandler.handleRTCAnswer(data);
  });
  socket.on("webRTC-candidate", (data) => {
    webRTCHandler.handleRTCCandidate(data);
  });
  socket.on("user-hangedup", () => {
    webRTCHandler.handleUserHangedUp();
  });
  socket.on("group-call-join-request", (data) => {
    webRTCGroupCallHandler.connectToNewUser(data);
  });
  socket.on("group-call-user-left", (data) => {
    webRTCGroupCallHandler.removeInactiveStream(data);
  });
};

export const registerNewUser = (data) => {
  socket.emit("register-new-user", data);
};

const handleBoradcastEvents = (data) => {
  switch (data.event) {
    case constants.broadcastingEvents.ACTIVE_USERS:
      store.dispatch(setActiveUsers(data));
      break;
    case constants.broadcastingEvents.GROUP_CALL_ROOMS:
      const rooms = data.rooms.filter((room) => room.socketId !== socket.id);
      const activeGroupCallRoomId =
        webRTCGroupCallHandler.checkActiveGroupCall();

      if (activeGroupCallRoomId) {
        const room = rooms.find(
          (room) => room.roomid === activeGroupCallRoomId
        );
        if (!room) {
          webRTCGroupCallHandler.clearGroupData();
        }
      }
      store.dispatch(setRooms(rooms));

      break;
    default:
      break;
  }
};

export const sendPreOffer = (data) => {
  socket.emit("pre-offer", data);
};

export const sendPreOfferAnswer = (data) => {
  console.log(data);
  socket.emit("pre-offer-answer", data);
};

export const sendWebRTCOffer = (data) => {
  socket.emit("webRTC-offer", data);
};

export const sendWebRTCAnswer = (data) => {
  socket.emit("webRTC-answer", data);
};

export const sendWebRTCCandidate = (data) => {
  socket.emit("webRTC-candidate", data);
};

export const setUserHangup = (data) => {
  socket.emit("user-hangedup", data);
};

// Group calls
export const registerGroupCall = (data) => {
  socket.emit("group-call-register", data);
};

export const userWantsToJoinGroupCall = (data) => {
  socket.emit("group-call-join-request", data);
};

export const userLeftGroupCall = (data) => {
  socket.emit("group-call-user-left", data);
};

export const groupCallCloseByHost = (data) => {
  socket.emit("group-call-close-by-host", data);
};
