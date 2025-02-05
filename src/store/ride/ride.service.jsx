import API from "@/configs/API";
const assignToCaptain = async (data) => {
  // req.body has captainId and rideId is prms
  const res = await API.patch(`rides/${data?.id}/assign`, data);
  return res.data;
};
const getAllRide = async (data) => {
  let res;
  if (data) {
    const {
      sortBy = "createdAt",
      sortOrder = "asc",
      page = 1,
      limit = 10,
      search,
      status,
      userId,
      captainId,
      vehicleId,
      ...filters
    } = data;
    res = await API.get(
      `rides/search?${sortBy ? `&sortBy=${sortBy}` : ""}${
        sortOrder ? `&sortOrder=${sortOrder}` : ""
      }${page ? `&page=${page}` : ""}${limit ? `&limit=${limit}` : ""}${
        search ? `&search=${search}` : ""
      }${status ? `&status=${status}` : ""}${
        userId ? `&userId=${userId}` : ""
      }${captainId ? `&captainId=${captainId}` : ""}${
        vehicleId ? `&vehicleId=${vehicleId}` : ""
      }${Object.keys(filters)
        .map((key) => `&${key}=${filters[key]}`)
        .join("")}`
    );
  } else {
    res = await API.get(`rides/search`);
  }

  return res.data;
};
const addRide = async (data) => {
  const res = await API.post(`rides`, data);
  return res.data;
};

const updateStatus = async (data) => {
  const res = await API.patch(`rides/${data?.id}/status`, data);
  console.log(res);

  return res.data;
};

export const RideService = {
  assignToCaptain,
  getAllRide,
  addRide,
  updateStatus,
};
