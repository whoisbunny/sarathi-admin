import API from "@/configs/API";
const getVehicleDetailsById = async (id) => {
  const res = await API.get(`vehicles/owner/${id}`);
  return res.data;
};
const getAllVehicle = async () => {
  const res = await API.get(`vehicles`);
  return res.data;
};
const addVehicle = async (data) => {
  const res = await API.post(`vehicles/add`,data);
  return res.data;
};

export const VehicleService = { getVehicleDetailsById, getAllVehicle, addVehicle };
