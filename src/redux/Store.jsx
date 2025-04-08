import { configureStore } from "@reduxjs/toolkit";

import patientReducer from "./users/usersSlice";

export const store = configureStore({
  reducer: {
    patients: patientReducer,
  },
});
