import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { toast } from "react-toastify";
import { UserService } from "./user.service";

export const getAllUsers = createAsyncThunk(
  "user/get-users",
  async (data, thunkAPI) => {
    try {
      data = { ...data, role: "USER" };

      const response = await UserService.getAllUsers(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getAllCaptains = createAsyncThunk(
  "user/get-captains",
  async (data, thunkAPI) => {
    try {
      data = { ...data, role: "CAPTAIN" };

      const response = await UserService.getAllUsers(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addUser = createAsyncThunk(
  "user/add-user",
  async (data, thunkAPI) => {
    try {
      return await UserService.addUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getUserDetailsById = createAsyncThunk(
  "user/get-user-details",
  async (data, thunkAPI) => {
    try {
      return await UserService.getUserDetailsById(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editUserDetails = createAsyncThunk(
  "user/edit-user",
  async (data, thunkAPI) => {
    try {
      return await UserService.editUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    captains: [],
    openUserModal: false,
    isLoading: null,
    editItem: {},
    editModal: false,
    userStats: {},
    captainStats: {},
    userDetails: {},
  },
  reducers: {
    toggleAddModal: (state, action) => {
      state.openUserModal = action.payload;
    },
    toggleEditModal: (state, action) => {
      state.editModal = action.payload;
    },

    updateUser: (state, action) => {
      state.editItem = action.payload;
      state.editModal = !state.editModal;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;

        state.users = action.payload.docs;
        state.userStats = {
          totalDocs: action.payload.totalDocs,
          limit: action.payload.limit,
          totalPages: action.payload.totalPages,
          page: action.payload.page,
          pagingCounter: action.payload.pagingCounter,
          hasPrevPage: action.payload.hasPrevPage,
          hasNextPage: action.payload.hasNextPage,
          prevPage: action.payload.prevPage,
          nextPage: action.payload.nextPage,
        };
        state.error = null;
        // toast.success(action.payload.message);
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllCaptains.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCaptains.fulfilled, (state, action) => {
        state.isLoading = false;

        state.captains = action.payload.docs;
        state.captainStats = {
          totalDocs: action.payload.totalDocs,
          limit: action.payload.limit,
          totalPages: action.payload.totalPages,
          page: action.payload.page,
          pagingCounter: action.payload.pagingCounter,
          hasPrevPage: action.payload.hasPrevPage,
          hasNextPage: action.payload.hasNextPage,
          prevPage: action.payload.prevPage,
          nextPage: action.payload.nextPage,
        };
        state.error = null;
        // toast.success(action.payload.message);
      })
      .addCase(getAllCaptains.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        toast.success(action.payload.message);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(editUserDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        toast.success(action.payload.message);
      })
      .addCase(editUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload?.response?.data?.message);
      })
      .addCase(getUserDetailsById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserDetailsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.userDetails = action.payload;
      })
      .addCase(getUserDetailsById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload?.response?.data?.message);
      });
  },
});

export const {  toggleAddModal, toggleEditModal, updateUser } =
  UserSlice.actions;
export default UserSlice.reducer;
