import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CouponService } from "./coupon.service";

export const getAllCoupons = createAsyncThunk(
  "coupons/get-coupons",
  async (_, thunkAPI) => {
    try {
      const response = await CouponService.getAllCoupons();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCoupon = createAsyncThunk(
  "coupons/get-coupon",
  async (id, thunkAPI) => {
    try {
      const response = await CouponService.getCoupon(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createCoupon = createAsyncThunk(
  "coupons/create-coupon",
  async (data, thunkAPI) => {
    try {
      const response = await CouponService.createCoupon(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editCoupon = createAsyncThunk(
  "coupons/update-coupon",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await CouponService.updateCoupon(id, data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteCoupon = createAsyncThunk(
  "coupons/delete-coupon",
  async (id, thunkAPI) => {
    try {
      const response = await CouponService.deleteCoupon(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const validateCoupon = createAsyncThunk(
  "coupons/validate-coupon",
  async (data, thunkAPI) => {
    try {
      const response = await CouponService.validateCoupon(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    coupons: [],
    couponDetails: {},
    isLoading: null,
    error: null,
    openCouponModal: false,
    editModal: false,
    editItem: {},
  },
  reducers: {
    toggleAddModal: (state, action) => {
      state.openCouponModal = action.payload;
    },
    toggleEditModal: (state, action) => {
      state.editModal = action.payload;
    },
    updateCoupon: (state, action) => {
      state.editItem = action.payload;
      state.editModal = !state.editModal;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoupons.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coupons = action.payload?.docs;
        state.error = null;
      })
      .addCase(getAllCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getCoupon.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.couponDetails = action.payload;
        state.error = null;
      })
      .addCase(getCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coupons.push(action.payload);
        state.error = null;
        toast.success("Coupon created successfully");
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(editCoupon.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.coupons = state.coupons.map((coupon) =>
        //   coupon._id === action.payload._id ? action.payload : coupon
        // );
        state.error = null;
        toast.success("Coupon updated successfully");
      })
      .addCase(editCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coupons = state.coupons.filter(
          (coupon) => coupon._id !== action.payload._id
        );
        state.error = null;
        toast.success("Coupon deleted successfully");
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(validateCoupon.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(validateCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        toast.success("Coupon validated successfully");
      })
      .addCase(validateCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {
  toggleAddModal,
  toggleEditModal,
  updateCoupon,
} = couponSlice.actions;

export default couponSlice.reducer;