import {
  clearGroupCallData,
  setCallState,
  setGroupCallActive,
  setGroupCallStreams,
} from "../../Dashboard/store/callSlice";
import store from "../../store";
import * as wss from "../wssConnection";
import * as constants from "../../constants";

let myPeer;
let myPeerId;
let groupCallRoomId;
let groupCallHost = false;

export const connectWithMyPeer = () => {
  myPeer = new window.Peer(undefined, {
    path: "/peerjs",
    host: "video--talker.herokuapp.com",
    // host: "/",
    // port: "3001",
    port: "443",
  });

  myPeer.on("open", (id) => {
    console.log("successfully connected with peer server");
    myPeerId = id;
  });
  myPeer.on("call", (call) => {
    call.answer(store.getState().call.localStream);
    call.on("stream", (incomingStream) => {
      const strems = store.getState().call.groupCallStreams;
      const stream = strems.find((s) => s.id === incomingStream.id);
      if (!stream) addVideoStream(incomingStream);
    });
  });
};

export const createNewGroupCall = () => {
  wss.registerGroupCall({
    username: store.getState().dashboard.username,
    peerId: myPeerId,
  });
  groupCallHost = true;
  store.dispatch(setGroupCallActive(true));
  store.dispatch(setCallState(constants.callState.CALL_IN_PROGRESS));
};

export const clearGroupData = () => {
  groupCallRoomId = null;
  groupCallHost = null;
  store.dispatch(clearGroupCallData());
  myPeer.destroy();
  connectWithMyPeer();
};
export const leaveGroupCall = () => {
  if (groupCallHost) {
    wss.groupCallCloseByHost({
      peerId: myPeerId,
    });
  } else {
    wss.userLeftGroupCall({
      streamId: store.getState().call.localStream.id,
      roomId: groupCallRoomId,
    });
  }

  clearGroupData();
};

export const removeInactiveStream = (data) => {
  console.log(data);
  const groupCallStreams = store
    .getState()
    .call.groupCallStreams.filter((stream) => stream.id !== data.streamId);
  store.dispatch(setGroupCallStreams(groupCallStreams));
};

export const joinGroupCall = (hostSocketId, roomId) => {
  const localStream = store.getState().call.localStream;
  groupCallRoomId = roomId;
  wss.userWantsToJoinGroupCall({
    peerId: myPeerId,
    hostSocketId,
    roomId,
    streamId: localStream.id,
  });
  store.dispatch(setGroupCallActive(true));
  store.dispatch(setCallState(constants.callState.CALL_IN_PROGRESS));
};

export const connectToNewUser = (data) => {
  const localStream = store.getState().call.localStream;

  const call = myPeer.call(data.peerId, localStream);
  call.on("stream", (incomingStream) => {
    const strems = store.getState().call.groupCallStreams;
    const stream = strems.find((s) => s.id === incomingStream.id);
    if (!stream) addVideoStream(incomingStream);
  });
};

export const checkActiveGroupCall = () => {
  if (store.getState().call.groupCallActive) {
    return groupCallRoomId;
  } else {
    return false;
  }
};
const addVideoStream = (stream) => {
  store.dispatch(
    setGroupCallStreams([...store.getState().call.groupCallStreams, stream])
  );
};
