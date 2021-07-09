import {
  setLocalStream,
  setCallState,
  setCallingDialogVisible,
  setcalleeUsername,
  setcallerUsername,
  setCallRejected,
  setRemoteStream,
  setScreenSharingActive,
  setLocalCameraEnable,
  setLocalMicroPhoneEnable,
} from "../../Dashboard/store/callSlice";
import * as constants from "../../constants";
import store from "../../store";
import * as wss from "../wssConnection";

const defaultConstraints = {
  video: {
    width: 480,
    height: 360,
  },
  audio: true,
};
const config = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};
let connectedUserSocketId;
let peerConnection;
let dataChannel;

const createPeerConnection = () => {
  peerConnection = new RTCPeerConnection(config);
  dataChannel = peerConnection.createDataChannel("chat");

  const localStream = store.getState().call.localStream;
  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  peerConnection.ontrack = ({ streams: [stream] }) => {
    store.dispatch(setRemoteStream(stream));
  };

  peerConnection.onicecandidate = (e) => {
    if (e.candidate) {
      wss.sendWebRTCCandidate({
        connectedUserSocketId,
        candidate: e.candidate,
      });
    }
  };

  peerConnection.onconnectionstatechange = () => {
    if (peerConnection.connectionState === "connected") {
      console.log("connection established");
    }
  };
};

export const getLocalStream = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(
      defaultConstraints
    );
    if (stream) {
      store.dispatch(setLocalStream(stream));
      store.dispatch(setCallState(constants.callState.CALL_AVAILABLE));
      createPeerConnection();
    }
  } catch (err) {
    console.log(err);
  }
};

export const callToOtherUser = (calleDetails) => {
  connectedUserSocketId = calleDetails.socketId;
  store.dispatch(setCallState(constants.callState.CALL_IN_PROGRESS));
  store.dispatch(setCallingDialogVisible(true));
  store.dispatch(setcalleeUsername(calleDetails.username));
  wss.sendPreOffer({
    callee: calleDetails,
    caller: store.getState().dashboard.username,
  });
};

export const handlePreOffer = (data) => {
  if (checkIfCallPossible()) {
    connectedUserSocketId = data.socketId;
    store.dispatch(setcallerUsername(data.username));
    store.dispatch(setCallState(constants.callState.CALL_REQUESTED));
  } else {
    wss.sendPreOfferAnswer({
      callerSocketId: data.socketId,
      answer: constants.preOfferAnswers.CALL_NOT_AVAILABLE,
    });
  }
};

export const handlePreOfferAnswer = (data) => {
  console.log(data);
  if (data.answer === constants.preOfferAnswers.CALL_ACCEPTED) {
    sendRTCOffer();
  } else {
    let rejectionReason;
    if (data.answer === constants.preOfferAnswers.CALL_NOT_AVAILABLE) {
      rejectionReason =
        "Callee is not able to picked up your call right now...";
    } else {
      rejectionReason = "Call rejected by callee";
    }

    store.dispatch(
      setCallRejected({
        rejected: true,
        reason: rejectionReason,
      })
    );
    resetCallData();
  }
  store.dispatch(setCallingDialogVisible(false));
};

export const acceptIncomingCallRequest = () => {
  wss.sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: constants.preOfferAnswers.CALL_ACCEPTED,
  });
  store.dispatch(setCallState(constants.callState.CALL_IN_PROGRESS));
};
export const rejectIncomingCallRequest = () => {
  wss.sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: constants.preOfferAnswers.CALL_REJECTED,
  });
  resetCallData();
};

export const checkIfCallPossible = () => {
  if (
    store.getState().call.localStream === null ||
    store.getState().call.callState !== constants.callState.CALL_AVAILABLE
  )
    return false;
  else return true;
};

export const sendRTCOffer = async () => {
  const offer = await peerConnection.createOffer();

  await peerConnection.setLocalDescription(offer);

  wss.sendWebRTCOffer({
    connectedUserSocketId,
    offer,
  });
};

export const handleRTCOffer = async (data) => {
  await peerConnection.setRemoteDescription(data.offer);

  const answer = await peerConnection.createAnswer();

  await peerConnection.setLocalDescription(answer);
  wss.sendWebRTCAnswer({
    connectedUserSocketId,
    answer,
  });
};

export const handleRTCAnswer = async (data) => {
  await peerConnection.setRemoteDescription(data.answer);
};

export const handleRTCCandidate = async (data) => {
  try {
    await peerConnection.addIceCandidate(await data.candidate);
  } catch (e) {
    console.log(e);
  }
};

let screenSharingStream;
export const switchCameraAndScreenSharing = async () => {
  if (!store.getState().call.screenSharingActive) {
    try {
      screenSharingStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      store.dispatch(setScreenSharingActive(true));

      const senders = peerConnection.getSenders();
      const sender = senders.find(
        (sender) =>
          sender.track.kind === screenSharingStream.getVideoTracks()[0].kind
      );
      sender.replaceTrack(screenSharingStream.getVideoTracks()[0]);
    } catch (err) {
      console.log(err);
    }
  } else {
    const localStream = store.getState().call.localStream;
    store.dispatch(setScreenSharingActive(false));
    const senders = peerConnection.getSenders();
    const sender = senders.find(
      (sender) => sender.track.kind === localStream.getVideoTracks()[0].kind
    );
    sender.replaceTrack(localStream.getVideoTracks()[0]);
    screenSharingStream.getTracks().forEach((track) => track.stop());
  }
};

export const handleUserHangedUp = () => {
  resetCallDataAfterHangUp();
};

export const hangUp = () => {
  wss.setUserHangup({
    connectedUserSocketId,
  });
  resetCallDataAfterHangUp();
};

const resetCallDataAfterHangUp = () => {
  store.dispatch(setRemoteStream(null));
  store.dispatch(setCallingDialogVisible(false));
  peerConnection.close();
  peerConnection = null;
  createPeerConnection();
  store.dispatch(setScreenSharingActive(false));
  store.dispatch(setLocalCameraEnable(true));
  store.dispatch(setLocalMicroPhoneEnable(true));
  store.getState().call.localStream.getAudioTracks()[0].enabled = true;
  store.getState().call.localStream.getVideoTracks()[0].enabled = true;
  resetCallData();

  if (store.getState().call.screenSharingActive) {
    screenSharingStream.getTracks().forEach((track) => track.stop());
  }
};

export const resetCallData = () => {
  connectedUserSocketId = null;
  store.dispatch(setCallState(constants.callState.CALL_AVAILABLE));
  store.dispatch(setcalleeUsername(""));
};
