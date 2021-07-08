import socketIoClient from "socket.io-client";
import store from "../../store/index";
import {
  setActiveUsers,
  setSocketId,
} from "../../Dashboard/store/dashboardSlice";
import * as constants from "../../constants";
import * as webRTCHandler from "../webRTC";
// const SERVER_URL = "http://192.168.0.101:3001/";
const SERVER_URL = "https://video--talker.herokuapp.com/";

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
