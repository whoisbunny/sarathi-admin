import API from "@/configs/API";

const login = async (data) => {
  const res = await API.post(`auth/admin-login`, data);

  if (res.data) {
    localStorage.setItem("TOKEN", res.data.token);
    localStorage.setItem("REFRESH_TOKEN", res.data.refreshToken);
    window.localStorage.setItem(
      "expiryDate",
      JSON.stringify(res.data.expiryDate)
    );
  }
  return res.data;
};

const signup = async (data) => {
  const res = await API.post(`auth/register`, data);

  if (res.data) {
    localStorage.setItem("TOKEN", res.data.token);
    localStorage.setItem("REFRESH_TOKEN", res.data.refreshToken);
  }
  return res.data;
};

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("REFRESH_TOKEN");

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const res = await API.post(`auth/refresh-token`, {
      refreshToken: refreshToken,
    });

    if (res.data) {
      localStorage.setItem("TOKEN", res.data.token);
      localStorage.setItem("REFRESH_TOKEN", res.data.refreshToken);
      return res.data;
    } else {
      throw new Error("Failed to refresh token");
    }
  } catch (error) {
    console.log({ message: error.message });
    throw error; // rethrow the error so it can be handled by Redux
  }
};

const logout = async () => {
  const res = await API.get(`auth/logout`);

  if (res.data) {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
  }
  return res.data;
};
const loggedinUser = async () => {
  const res = await API.get(`auth/loggedin-user`);

  return res.data;
};
const AddClientDetails = async (data) => {
  try {
    const res = await API.post("client", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Response:", res);

    return res.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error Response:", error.response.data);
      console.error("Error Status:", error.response.status);
      console.error("Error Headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error Request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error Message:", error.message);
    }
    throw new Error("Failed to submit form");
  }
};

const getDashboard = async () => {
  const res = await API.get(`admin/dashboard`);

  return res.data;
};

export const authService = {
  login,
  signup,
  refreshToken,
  logout,
  loggedinUser,
  AddClientDetails,
  getDashboard,
};
