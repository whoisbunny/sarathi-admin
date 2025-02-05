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
import { toggleAddModal, addRide, getAllRide } from "@/store/ride/ride.reducer";
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

const AddRide = ({userId}) => {
  const { openRideModal } = useSelector((state) => state.ride);
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

  const onSubmit = (data) => {

    data.userId = userId
    dispatch(addRide(data));

    setTimeout(() => {
      dispatch(getAllRide());
      reset();
      setSelectedFile(null);
      dispatch(toggleAddModal(false));
    }, 500);
  };
  return (
    <div>
      <Modal
        title="Create Ride"
        labelclassName="btn-outline-dark"
        activeModal={openRideModal}
        // className="max-w-5xl"
        onClose={() => dispatch(toggleAddModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid lg:grid-cols-1 gap-4 grid-cols-1">
           
            <Textinput
              name="pickupLocation"
              label="Pickup Location"
              placeholder="Pickup Location"
              register={register}
              error={errors.pickupLocation}
            />
            <Textinput
              name="dropoffLocation"
              label="Dropoff Location"
              placeholder="Dropoff Location"
              register={register}
              error={errors.dropoffLocation}
            />
            <Textinput
              name="fare"
              label="Fare"
              placeholder="Fare"
              register={register}
              error={errors.fare}
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

export default AddRide;
