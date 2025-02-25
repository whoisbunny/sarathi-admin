import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RideService } from "./ride.service";

export const getAllRide = createAsyncThunk(
  "rides/get-rides",
  async (data, thunkAPI) => {
    try {
      const response = await RideService.getAllRide(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const assignToCaptain = createAsyncThunk(
  "rides/assign-ride",
  async (id, thunkAPI) => {
    try {
      const response = await RideService.assignToCaptain(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addRide = createAsyncThunk(
  "rides/add-ride",
  async (id, thunkAPI) => {
    try {
      const response = await RideService.addRide(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateStatus = createAsyncThunk(
  "rides/update-ride",
  async (data, thunkAPI) => {
    try {
      const response = await RideService.updateStatus(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const rideSlice = createSlice({
  name: "ride",
  initialState: {
    rides: [],
    rideDetails: {},
    rideStats: {},
    isLoading: null,
    error: null,
    openRideModal: false,
    assignModel: false,
    editModal: false,
    editItem: {},
  },
  reducers: {
    toggleAddModal: (state, action) => {
      state.openRideModal = action.payload;
    },
    toggleEditModal: (state, action) => {
      state.editModal = action.payload;
    },
    toggleAssignModal: (state, action) => {
      state.assignModel = action.payload;
    },

    updateRide: (state, action) => {
      state.editItem = action.payload;
      state.editModal = !state.editModal;
    },
    assignRide: (state, action) => {
      state.editItem = action.payload;
      state.assignModel = !state.assignModel;
    },
    // -- handling socket 
    socketAddRide: (state, action) => {
      state.rides.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRide.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllRide.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rides = action.payload?.docs;
        state.rideStats = {
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
      })
      .addCase(getAllRide.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(assignToCaptain.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(assignToCaptain.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.editItem = null;
        toast.success(action.payload?.message);
      })
      .addCase(assignToCaptain.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.editItem = null;
      })
      .addCase(addRide.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addRide.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.vehicles = action.payload;
        state.error = null;
        toast.success(action.payload?.message);
      })
      .addCase(addRide.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.vehicles = action.payload;
        state.error = null;
        state.editItem = {};
        toast.success(action.payload);
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
        state.editItem = {};
      });
  },
});
export const {
  toggleAddModal,
  toggleEditModal,
  updateRide,
  assignRide,
  toggleAssignModal,
  socketAddRide,
} = rideSlice.actions;
export default rideSlice.reducer;
