import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Fileinput from "@/components/ui/Fileinput";
import Textarea from "@/components/ui/Textarea";
import {
  toggleSettingsModal,
  updateCompanySettings,
  getCompanySettings,
} from "@/store/settings/settings.reducer";

const FormValidationSchema = yup
  .object({
    companyName: yup.string().required("Company name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Phone number must be digits only"),
    address: yup.string().required("Address is required"),
    website: yup.string().url("Must be a valid URL"),
    description: yup.string().required("Company description is required"),
  })
  .required();

const CompanySettings = () => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);

  const { loading, companySettings, openSettingsModal } = useSelector(
    (state) => state.settings
  );

  const {
    register,
    control,
    reset,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

  React.useEffect(() => {
    dispatch(getCompanySettings());
  }, [dispatch]);

  // React.useEffect(() => {
    // if (companySettings) {
    //   console.log(companySettings);

    //   setValue("companyName", companySettings.companyName);
    //   setValue("email", companySettings.email);
    //   setValue("phone", companySettings.phone);
    //   setValue("address", companySettings.address);
    //   setValue("website", companySettings.website);
    //   setValue("description", companySettings.description);
    // }
  // }, [companySettings, setValue]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const onSubmit = (data) => {
    console.log(data);
    // const formData = new FormData();
    // formData.append("companyName", data.companyName);
    // formData.append("email", data.email);
    // formData.append("phone", data.phone);
    // formData.append("address", data.address);
    // formData.append("website", data.website);
    // formData.append("description", data.description);
    // if (selectedFile) {
    //   formData.append("logo", selectedFile);
    // }
    const formData = {
      companyName: data?.companyName,
      email: data?.email,
      phone: data?.phone,
      address: data?.address,
      website: data?.website,
      description: data?.description,
      logo: selectedFile,
    };

    dispatch(
      updateCompanySettings({ formData: formData, id: companySettings._id })
    )
      .then(() => {
        reset();
        setSelectedFile(null);
        dispatch(toggleSettingsModal(false));
      })
      .catch((error) => {
        console.error("Error updating company settings:", error);
      });
  };

  return (
    <div>
      <Modal
        title="Company Settings"
        labelclassName="btn-outline-dark"
        activeModal={openSettingsModal}
        className="max-w-5xl"
        onClose={() => dispatch(toggleSettingsModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-4 grid-cols-1">
              <Textinput
                name="companyName"
                label="Company Name"
                placeholder="Enter company name"
                register={register}
                error={errors.companyName}
                defaultValue={companySettings?.companyName}
              />

              <Textinput
                name="email"
                label="Email"
                placeholder="company@example.com"
                register={register}
                error={errors.email}
                defaultValue={companySettings?.email}
              />

              <Textinput
                name="phone"
                label="Phone Number"
                placeholder="Enter phone number"
                register={register}
                defaultValue={companySettings?.phone}
                error={errors.phone}
              />

              <Textinput
                name="website"
                label="Website"
                placeholder="https://example.com"
                register={register}
                error={errors.website}
                defaultValue={companySettings?.website}
              />

              <div className="lg:col-span-2">
                <Textinput
                  name="address"
                  label="Address"
                  placeholder="Enter company address"
                  register={register}
                  error={errors.address}
                  defaultValue={companySettings?.address}
                />
              </div>

              <div className="lg:col-span-2">
                <Textarea
                  name="description"
                  label="Company Description"
                  placeholder="Enter company description"
                  register={register}
                  error={errors.description}
                  defaultValue={companySettings?.description}
                />
              </div>

              <div className={errors.logo ? "has-error" : ""}>
                <label className="form-label" htmlFor="logo">
                  Company Logo
                </label>
                <Controller
                  name="logo"
                  control={control}
                  render={({ field }) => (
                    <Fileinput
                      name="logo"
                      selectedFile={selectedFile}
                      onChange={handleFileChange}
                      preview
                    />
                  )}
                />
                {errors.logo && (
                  <div className="mt-2 text-danger-500 block text-sm">
                    {errors.logo?.message}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark text-center">Save Changes</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CompanySettings;
