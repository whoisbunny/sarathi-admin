import React, { useState } from "react";
import Select from "react-select";
import Modal from "@/components/ui/Modal";
import Checkbox from "@/components/ui/Checkbox";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  toggleAddModal,
  addVehicle,
  getVehicleDetailsById,
} from "@/store/vehicle/vehicle.reducer";

const vehicleTypeOptions = [
  { value: "CAR", label: "Car" },
  { value: "AUTO", label: "Auto" },
  { value: "BIKE", label: "Bike" },
];

const FormValidationSchema = yup
  .object({
    // ownerId: yup.string().required("Owner ID is required"),
    // vehicleType: yup.string().required("Vehicle Type is required"),
    plateNumber: yup.string().required("Plate Number is required"),
    color: yup.string(),
    model: yup.string(),
    capacity: yup
      .number()
      .required("Capacity is required")
      .typeError("Capacity must be a number"),
    isAvailable: yup.boolean(),
  })
  .required();

const AddVehicle = ({ ownerId }) => {
  const [checked5, setChecked5] = useState(true);

  const { openVehicleModal } = useSelector((state) => state.vehicle);
  const dispatch = useDispatch();
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

  const onSubmit = (data) => {
    data.ownerId = ownerId;
    data.vehicleType = data.vehicleType.value; // Extract the value from the selected option
    console.log(data);

    dispatch(addVehicle(data));

    setTimeout(() => {
      dispatch(getVehicleDetailsById(ownerId));
      reset();
      dispatch(toggleAddModal(false));
    }, 500);
  };

  return (
    <div>
      <Modal
        title="Add Vehicle"
        labelclassName="btn-outline-dark"
        activeModal={openVehicleModal}
        className="max-w-5xl"
        onClose={() => dispatch(toggleAddModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid lg:grid-cols-3 gap-4 grid-cols-1">
            {/* <Textinput
              name="ownerId"
              label="Owner ID"
              placeholder="Owner ID"
              register={register}
              error={errors.ownerId}
            /> */}
            <div className="vehicleType">
              <label
                htmlFor={"vehicleType"}
                className={`block capitalize text-sm mb-2 flex-0 mr-6 md:w-[100px] w-[60px] break-words`}
              >
                vehicleType
              </label>{" "}
              <Controller
                name="vehicleType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={vehicleTypeOptions}
                    className="react-select"
                    classNamePrefix="select"
                    placeholder="Select Vehicle Type"
                    getOptionLabel={(option) => option.label}
                    getOptionValue={(option) => option.value}
                  />
                )}
              />
              {errors.vehicleType && (
                <div className="mt-2 text-danger-500 block text-sm">
                  {errors.vehicleType.message}
                </div>
              )}
            </div>
            <Textinput
              name="plateNumber"
              label="Plate Number"
              placeholder="Plate Number"
              register={register}
              error={errors.plateNumber}
            />
            <Textinput
              name="color"
              label="Color"
              placeholder="Color"
              register={register}
              error={errors.color}
            />
            <Textinput
              name="model"
              label="Model"
              placeholder="Model"
              register={register}
              error={errors.model}
            />
            <Textinput
              name="capacity"
              label="Capacity"
              placeholder="Capacity"
              register={register}
              error={errors.capacity}
            />
            <Controller
              name="isAvailable"
              control={control}
              render={({ field }) => (
                <div className="flex  items-center">
                  <Checkbox
                    label="Is Available"
                    value={checked5}
                    activeClass="ring-primary-500 bg-primary-500"
                    onChange={() => setChecked5(!checked5)}
                  />
                </div>
              )}
            />
          </div>
          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark text-center">Add</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddVehicle;
