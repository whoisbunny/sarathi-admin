import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { VehicleService } from "./vehicle.service";

export const getAllVehicles = createAsyncThunk(
  "vehicle/get-vehicles",
  async (_, thunkAPI) => {
    try {
      const response = await VehicleService.getAllVehicle();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getVehicleDetailsById = createAsyncThunk(
  "vehicle/get-vehicle-details",
  async (id, thunkAPI) => {
    try {
      const response = await VehicleService.getVehicleDetailsById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addVehicle = createAsyncThunk(
  "vehicle/add-vehicle",
  async (id, thunkAPI) => {
    try {
      const response = await VehicleService.addVehicle(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const VehicleSlice = createSlice({
  name: "vehicle",
  initialState: {
    vehicles: [],
    vehicleDetails: {},
    isLoading: null,
    error: null,
    openVehicleModal:false,
  },
  reducers: {
    toggleAddModal: (state, action) => {
      state.openVehicleModal = action.payload;
    },
    toggleEditModal: (state, action) => {
      state.editModal = action.payload;
    },

    updateVehicle: (state, action) => {
      state.editItem = action.payload;
      state.editModal = !state.editModal;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllVehicles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllVehicles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vehicles = action.payload;
        state.error = null;
      })
      .addCase(getAllVehicles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getVehicleDetailsById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getVehicleDetailsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vehicles = action.payload;
        state.error = null;
      })
      .addCase(getVehicleDetailsById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addVehicle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addVehicle.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.vehicles = action.payload;
        state.error = null;
        toast.success(action.payload?.message);
      })
      .addCase(addVehicle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { toggleAddModal, toggleEditModal, updateVehicle } = VehicleSlice.actions;
export default VehicleSlice.reducer;
