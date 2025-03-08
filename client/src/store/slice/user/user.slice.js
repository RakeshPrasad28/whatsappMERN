import { createSlice } from "@reduxjs/toolkit";
import {
  getOtherUsersThunk,
  getUserProfileThunk,
  LoginUserThunk,
  LogoutUserThunk,
  registerUserThunk,
} from "./user.thunk";

const initialState = {
  isAuthenticated: false,
  screenLoading: true,
  userProfile: null,
  otherUsers: null,
  selectedUser: JSON.parse(localStorage.getItem("selectedUser")),
  buttonLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      localStorage.setItem("selectedUser", JSON.stringify(action.payload));
      state.selectedUser = action.payload;
    }
  },
  extraReducers: (builder) => {
    //Login User
    builder.addCase(LoginUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(LoginUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData?.user;
      state.isAuthenticated = true;
      state.buttonLoading = false;
    });
    builder.addCase(LoginUserThunk.rejected, (state, action) => {
      console.log("rejected");
      state.buttonLoading = false;
    });

    // Register User
    builder.addCase(registerUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData?.user;
      state.isAuthenticated = true;
      state.buttonLoading = false;
    });
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      console.log("rejected");
      state.buttonLoading = false;
    });

    // Logout User
    builder.addCase(LogoutUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(LogoutUserThunk.fulfilled, (state, action) => {
      state.userProfile = null;
      state.selectedUser = null;
      state.otherUsers = null;
      state.isAuthenticated = false;
      state.buttonLoading = false;
      localStorage.removeItem("selectedUser");
    });
    builder.addCase(LogoutUserThunk.rejected, (state, action) => {
      console.log("rejected");
      state.buttonLoading = false;
    });

    // getprofile
    builder.addCase(getUserProfileThunk.pending, (state, action) => {
      state.screenLoading = true;
    });
    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.screenLoading = false;
      state.userProfile = action.payload?.responseData;
    });
    builder.addCase(getUserProfileThunk.rejected, (state, action) => {
      console.log("rejected");
      state.screenLoading = false;
    });

    // getOther Users
    builder.addCase(getOtherUsersThunk.pending, (state, action) => {
      state.screenLoading = true;
    });
    builder.addCase(getOtherUsersThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.otherUsers = action.payload?.responseData;
    });
    builder.addCase(getOtherUsersThunk.rejected, (state, action) => {
      console.log("rejected");
      state.screenLoading = false;
    });
  },
});

export const {setSelectedUser} = userSlice.actions;
export default userSlice.reducer;
