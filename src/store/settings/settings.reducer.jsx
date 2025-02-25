import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { settingsService } from "./settings.service";

// Initial state
const initialState = {
  openSettingsModal: false,
  loading: false,
  error: null,
  companySettings: null,
  openPaymentSettingsModal: false,
 
};

// Async actions
export const getCompanySettings = createAsyncThunk(
  "settings/get-company-settings",
  async (_, thunkAPI) => {
    try {
      const response = await settingsService.getCompanySettings();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateCompanySettings = createAsyncThunk(
  "settings/update-company-settings",
  async (data, thunkAPI) => {
    try {
      const response = await settingsService.updateCompanySettings(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create slice
const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleSettingsModal: (state, action) => {
      state.openSettingsModal = action.payload;
    },
    togglePaymentSettingsModal: (state, action) => {
      state.openPaymentSettingsModal = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCompanySettings: (state, action) => {
      state.companySettings = action.payload;
    },
    setPaymentSettings: (state, action) => {
      state.paymentSettings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCompanySettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompanySettings.fulfilled, (state, action) => {
        state.loading = false;
        state.companySettings = action.payload[0];
        state.error = null;
      })
      .addCase(getCompanySettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCompanySettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompanySettings.fulfilled, (state, action) => {
        state.loading = false;
        state.companySettings = action.payload;
        state.error = null;
        toast.success("Company settings updated successfully");
      })
      .addCase(updateCompanySettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

// Export actions
export const {
  toggleSettingsModal,
  togglePaymentSettingsModal,
  setLoading,
  setError,
  setCompanySettings,
  setPaymentSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
