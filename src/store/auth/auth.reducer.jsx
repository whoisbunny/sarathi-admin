import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "./auth.service";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const initialIsAuth = () => {
  const token = window.localStorage.getItem("TOKEN");
  let expiryDate = window.localStorage.getItem("expiryDate");
  if(token && expiryDate) {
    expiryDate = JSON.parse(expiryDate); 

    const currentDate = dayjs();
    const targetDate = dayjs(expiryDate);
    if (!currentDate.isBefore(targetDate) || currentDate.isAfter(targetDate)) {
      return false;
    }
    return true;
  }
  return  false;
};

const initialDate = () => {
  const item = window.localStorage.getItem("expiryDate");

  return item ? JSON.parse(item) : null;
};
const initialState = {
  expiryDate: initialDate(),
  token: null,
  refreshToken: null,
  isLoggedin: initialIsAuth(),
  dashboard: null,
  isLoading: false,
  error: null,
  user: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const response = await authService.login(data);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const response = await authService.signup(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const getDashboard = createAsyncThunk(
  "admin/dashboard",
  async (_, thunkAPI) => {
    try {
      return await authService.getDashboard();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (_, thunkAPI) => {
    try {
      const response = await authService.refreshToken();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const checkToken = createAsyncThunk(
  "auth/checkToken",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("TOKEN");
      if (token) {
        return token;
      } else {
        throw new Error("No token found");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loggedinUser = createAsyncThunk(
  "auth/loggedinUser",
  async (_, thunkAPI) => {
    try {
      const response = await authService.loggedinUser();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
        state.isLoggedin = true;
        toast.success(action.payload?.message);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedin = true;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedin = false;
        state.token = null;
        state.refreshToken = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(loggedinUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loggedinUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedin = true;

        state.user = action.payload;
        state.error = null;
      })
      .addCase(loggedinUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isLoggedin = false;
        state.user = null;
        setTimeout(() => {
          refreshAccessToken();
        }, 500);
      })
      .addCase(checkToken.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(checkToken.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getDashboard.fulfilled, (state, action) => {
        state.user = action.payload?.admin;
        state.dashboard = action.payload;
      })
      .addCase(getDashboard.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;

export default authSlice.reducer;
