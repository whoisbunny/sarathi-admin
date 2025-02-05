import API from "@/configs/API";

const getAllUsers = async (data) => {

  
  let res;
  if (data) {
    const { sort, page = 1, star, limit = 10, role, search } = data;
    res = await API.get(
      `auth/filter/?${sort ? `&sortOrder=${sort}` : ""}${
        page ? `&page=${page}` : ""
      }${limit ? `&limit=${limit}` : ""}${star ? `&rating=${star}` : ""}${
        role ? `&role=${role}` : ""
      }${search ? `&search=${search}` : ""}`
    );
  } else {
    res = await API.get(`auth/filter`);
  }

  return res.data;
};

const addUser = async (data) => {
  const res = await API.post(`auth/register`, data);
  return res.data;
};
const editUser = async (data) => {
  const res = await API.put(`auth/${data?.id}`, data?.formData);
  return res.data;
};

const getUserDetailsById = async(id)=>{
  const res = await API.get(`auth/${id}`);
  return res.data;  
}


export const UserService = { getAllUsers, addUser, getUserDetailsById, editUser };
