import API from "@/configs/API";
export const CouponService = {
  getAllCoupons: async () => {
    const response = await API.get(`coupons`);
    return response.data;
  },
  getCoupon: async (id) => {
    const response = await API.get(`coupons/${id}`);
    return response.data;
  },
  validateCoupon: async (data) => {
    const response = await API.post(`coupons/validate`, data);
    return response.data;
  },
  createCoupon: async (data) => {
    const response = await API.post(`coupons`, data);
    return response.data;
  },
  updateCoupon: async (id, data) => {
    const response = await API.patch(`coupons/${id}`, data);
    return response.data;
  },
  deleteCoupon: async (id) => {
    const response = await API.delete(`coupons/${id}`);
    return response.data;
  },
};
