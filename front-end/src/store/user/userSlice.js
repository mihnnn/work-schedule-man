import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginLoad: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    updateOnBoardLoad: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateOnboardingStatus: (state, action) => {
      if (state.currentUser) {
        state.currentUser.hasCompletedBoarding = action.payload;
        state.loading = false;
        state.error = null;
      }
    },
    updateOnboardingStatusFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserRole: (state, action) => {
      if (state.currentUser) {
        state.currentUser.role = action.payload;
      }
    },
    updateUserInfo: (state, action) => {
      if (state.currentUser) {
        state.currentUser.displayName = action.payload.displayName;
        state.currentUser.email = action.payload.email;
      }
    },

    updateTeamMemberships: (state, action) => {
      if (state.currentUser) {
        state.currentUser.teamMemberships = [
          ...state.currentUser.teamMemberships,
          action.payload,
        ];
      }
    },
  },
});

export const {
  loginLoad,
  loginSuccess,
  loginFail,
  logout,
  updateOnBoardLoad,
  updateOnboardingStatus,
  updateOnboardingStatusFail,
  updateUserRole,
  updateUserInfo,
  updateTeamMemberships,
} = userSlice.actions;

export default userSlice.reducer;
