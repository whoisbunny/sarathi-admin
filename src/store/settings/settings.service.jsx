import API from "@/configs/API";

const updateCompanySettings = async (data) => {
  try {
 

    const response = await API.put(`admin/company/${data?.id}`, data.formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

async function getCompanySettings() {
  try {
    const response = await API.get(`admin/company`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const settingsService = {
  updateCompanySettings,
  getCompanySettings,
};
