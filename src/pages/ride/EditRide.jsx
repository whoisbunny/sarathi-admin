import React, { useState, useEffect } from "react";
import Select from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  toggleEditModal,
  updateStatus,
  getAllRide,
} from "@/store/ride/ride.reducer";

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "accepted", label: "Accepted" },
  { value: "assigned", label: "Assigned" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const FormValidationSchema = yup
  .object({
    pickupLocation: yup.string().required("Pickup Location is required"),
    dropoffLocation: yup.string().required("Dropoff Location is required"),
    fare: yup
      .number()
      .required("Fare is required")
      .typeError("Fare must be a number"),
  })
  .required();

const EditRide = () => {
  const { editModal, editItem } = useSelector((state) => state.ride);
  const dispatch = useDispatch();

  const findOption = (value) => {
    const data = statusOptions.filter((e) => e.value === value);
    console.log(data);

    return data[0];
  };
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

  useEffect(() => {
    reset(editItem);
  }, [editItem, reset]);

  const onSubmit = (data) => {
    data.userId = editItem.userId;
    data.status = data.status.value;
    dispatch(updateStatus({ id: editItem._id, status: data.status }));

    setTimeout(() => {
      dispatch(getAllRide());
      reset();
      dispatch(toggleEditModal(false));
    }, 500);
  };

  return (
    <div>
      <Modal
        title="Edit Ride"
        labelclassName="btn-outline-dark"
        activeModal={editModal}
        onClose={() => dispatch(toggleEditModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid lg:grid-cols-1 gap-4 grid-cols-1">
            <Controller
              name="status"
              control={control}
              defaultValue={findOption(editItem?.status)}
              render={({ field }) => (
                <Select
                  {...field}
                  options={statusOptions}
                  className="react-select"
                  classNamePrefix="select"
                  placeholder="Select Status"
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  value={findOption(editItem?.status)}
                />
              )}
            />
            {errors.status && (
              <div className="mt-2 text-danger-500 block text-sm">
                {errors.status.message}
              </div>
            )}
            <Textinput
              name="pickupLocation"
              label="Pickup Location"
              placeholder="Pickup Location"
              register={register}
              error={errors.pickupLocation}
              disabled={true}
            />
            <Textinput
              name="dropoffLocation"
              label="Dropoff Location"
              placeholder="Dropoff Location"
              register={register}
              error={errors.dropoffLocation}
              disabled={true}
            />
            <Textinput
              name="fare"
              label="Fare"
              placeholder="Fare"
              register={register}
              error={errors.fare}
              disabled={true}
            />
          </div>
          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark text-center">Update</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EditRide;
