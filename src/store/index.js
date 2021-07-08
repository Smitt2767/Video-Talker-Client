import { configureStore } from "@reduxjs/toolkit";
import callReducer from "../Dashboard/store/callSlice";
import dashboardReducer from "../Dashboard/store/dashboardSlice";

export default configureStore({
  reducer: {
    dashboard: dashboardReducer,
    call: callReducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false,
    }),
});
