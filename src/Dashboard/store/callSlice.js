import { createSlice } from "@reduxjs/toolkit";
import * as constants from "../../constants";

const initialState = {
  localStream: "",
  remoteStream: new MediaStream(),
  callState: constants.callState.CALL_UNAVAILABLE,
  callingDialogVisible: false,
  callerUsername: "",
  calleeUsername: "",
  callRejected: {
    rejected: false,
    reason: "",
  },
  localCameraEnable: true,
  localMicroPhoneEnable: true,
  screenSharingActive: false,
  rooms: [],
  groupCallActive: false,
  groupCallStreams: [],
};

export const callSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setLocalStream: (state, action) => {
      state.localStream = action.payload;
    },
    setRemoteStream: (state, action) => {
      state.remoteStream = action.payload;
    },
    setCallState: (state, action) => {
      state.callState = action.payload;
    },
    setcallerUsername: (state, action) => {
      state.callerUsername = action.payload;
    },
    setcalleeUsername: (state, action) => {
      state.calleeUsername = action.payload;
    },
    setCallingDialogVisible: (state, action) => {
      state.callingDialogVisible = action.payload;
    },
    setCallRejected: (state, action) => {
      state.callRejected.reason = action.payload.reason;
      state.callRejected.rejected = action.payload.rejected;
    },
    setLocalCameraEnable: (state, action) => {
      state.localCameraEnable = action.payload;
    },
    setLocalMicroPhoneEnable: (state, action) => {
      state.localMicroPhoneEnable = action.payload;
    },
    setScreenSharingActive: (state, action) => {
      state.screenSharingActive = action.payload;
    },
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setGroupCallActive: (state, action) => {
      state.groupCallActive = action.payload;
    },
    setGroupCallStreams: (state, action) => {
      state.groupCallStreams = action.payload;
    },
    clearGroupCallData: (state, action) => {
      state.groupCallActive = false;
      state.callState = constants.callState.CALL_AVAILABLE;
      state.groupCallStreams = [];
      state.localCameraEnable = true;
      state.localMicroPhoneEnable = true;
      state.screenSharingActive = false;
    },
  },
});

export const {
  setLocalStream,
  setRemoteStream,
  setCallState,
  setcallerUsername,
  setCallingDialogVisible,
  setcalleeUsername,
  setCallRejected,
  setLocalCameraEnable,
  setLocalMicroPhoneEnable,
  setScreenSharingActive,
  setRooms,
  setGroupCallActive,
  setGroupCallStreams,
  clearGroupCallData,
} = callSlice.actions;

export default callSlice.reducer;
