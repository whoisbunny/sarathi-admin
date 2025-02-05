import React, { useState } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Fileinput from "@/components/ui/Fileinput";
import {
  toggleAddModal,
  addUser,
  getAllCaptains,
} from "@/store/user/user.reducer";

const roleOptions = [
  { value: "ADMIN", label: "Admin" },
  { value: "USER", label: "User" },
  { value: "CAPTAIN", label: "Captain" },
];

const FormValidationSchema = yup
  .object({
    username: yup.string().required("Username is required"),
    fullname: yup.object({
      firstname: yup
        .string()
        .required("First Name is required")
        .min(3, "First Name must be at least 3 characters long"),
      lastname: yup.string(),
    }),
    email: yup.string().email("Invalid email format"),
    phoneNumber: yup
      .string()
      .required("Phone Number is required")
      .matches(/^[0-9]+$/, "Phone Number must be digits only"),
    password: yup.string().required("Password is required"),
    // role: yup.string().required("Role is required"),
    profile: yup.string(),
    address: yup.string().required("Address is required"),
    pincode: yup
      .number()
      .required("Pincode is required")
      .typeError("Pincode must be a number"),
    license: yup.string().required("License is required"),
    experience: yup
      .number()
      .required("Experience is required")
      .typeError("Experience must be a number"),
  })
  .required();

const AddCaptain = () => {
  const { openUserModal } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const onSubmit = (data) => {
    data.role = data.role.value;
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("fullname", JSON.stringify(data.fullname));
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("role", "CAPTAIN");
    formData.append("address", data.address);
    formData.append("pincode", data.pincode);
    formData.append("license", data.license);
    formData.append("experience", data.experience);
    formData.append("profile", selectedFile);

    console.log(data);
    dispatch(addUser(formData));

    setTimeout(() => {
      dispatch(getAllCaptains());
      reset();
      setSelectedFile(null);
      dispatch(toggleAddModal(false));
    }, 500);
  };
  return (
    <div>
      <Modal
        title="Create Captain"
        labelclassName="btn-outline-dark"
        activeModal={openUserModal}
        className="max-w-5xl"
        onClose={() => dispatch(toggleAddModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid lg:grid-cols-3 gap-4 grid-cols-1">
            <Textinput
              name="username"
              label="Username"
              placeholder="Username"
              register={register}
              error={errors.username}
            />
            <Textinput
              name="fullname.firstname"
              label="First Name"
              placeholder="First Name"
              register={register}
              error={errors.fullname?.firstname}
            />
            <Textinput
              name="fullname.lastname"
              label="Last Name"
              placeholder="Last Name"
              register={register}
              error={errors.fullname?.lastname}
            />
            <Textinput
              name="email"
              label="Email"
              placeholder="Email"
              register={register}
              error={errors.email}
            />
            <Textinput
              name="phoneNumber"
              label="Phone Number"
              placeholder="Phone Number"
              register={register}
              error={errors.phoneNumber}
            />
            <Textinput
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
              register={register}
              error={errors.password}
            />
            {/* <div className="role">
              <label
                htmlFor={"role"}
                className={`block capitalize  mb-2 flex-0 mr-6 md:w-[100px] w-[60px] break-words`}
              >
                {"Role"}
              </label>{" "}
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={roleOptions}
                    className="react-select"
                    classNamePrefix="select"
                    placeholder="Select Role"
                    getOptionLabel={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    label="Role"
                  />
                )}
              />
              {errors.role && (
                <div className="mt-2 text-danger-500 block text-sm">
                  {errors.role.message}
                </div>
              )}
            </div> */}

            <Textinput
              name="address"
              label="Address"
              placeholder="Address"
              register={register}
              error={errors.address}
            />
            <Textinput
              name="pincode"
              label="Pincode"
              placeholder="Pincode"
              register={register}
              error={errors.pincode}
            />
            <Textinput
              name="license"
              label="License"
              placeholder="License"
              register={register}
              error={errors.license}
            />
            <Textinput
              name="experience"
              label="Experience"
              placeholder="Experience"
              register={register}
              error={errors.experience}
            />
            {/* <Textarea
              name="description"
              label="Description"
              placeholder="Description"
              register={register}
            /> */}
            <div className={errors.profile ? "has-error" : ""}>
              <label className="form-label" htmlFor="icon_s">
                Profile Image
              </label>
              <Controller
                name="profile"
                control={control}
                render={({ field }) => (
                  <Fileinput
                    selectedFile={selectedFile}
                    onChange={handleFileChange}
                    name={"profile"}
                    preview
                  />
                )}
              />
              {errors.profile && (
                <div className=" mt-2  text-danger-500 block text-sm">
                  {errors.profile?.message || errors.profile?.label.message}
                </div>
              )}
            </div>
          </div>
          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark text-center">Add</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddCaptain;
