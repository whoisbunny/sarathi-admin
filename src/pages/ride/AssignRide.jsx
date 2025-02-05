import React, { useState, useEffect } from "react";
import Select from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  toggleAssignModal,
  assignToCaptain,
  getAllRide,
} from "@/store/ride/ride.reducer";
import API from "@/configs/API";

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "accepted", label: "Accepted" },
  { value: "assigned", label: "Assigned" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];
const FormValidationSchema = yup
  .object({
    fare: yup
      .number()
      .typeError("Fare must be a number !!  ")
      .positive("Fare must be a greter then 0 !!")
      .required("Fare is required"),
  })
  .required();
// const FormValidationSchema = yup.object({}).required();

const AssignRide = () => {
  const { assignModel, editItem } = useSelector((state) => state.ride);
  const dispatch = useDispatch();
  const [captains, setCaptains] = useState([]);
  const [selectedCaptain, setSelectedCaptain] = useState(null);

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

  const fetchCaptains = async (search) => {
    try {
      const res = await API.get(`auth/filter?role=CAPTAIN&search=${search}`);
      const captainOptions = res.data.docs.map((captain) => ({
        value: captain._id,
        label: captain?.fullname?.firstname + " " + captain?.fullname?.lastname,
      }));
      setCaptains(captainOptions);
    } catch (error) {
      console.error("Error fetching captains:", error);
    }
  };

  const handleSearchChange = (inputValue) => {
    if (inputValue.length > 2) {
      fetchCaptains(inputValue);
    }
  };

  const onSubmit = async (data) => {
    if (!selectedCaptain) {
      alert("Please select a captain");
      return;
    }
    console.log(data);
    

    try {
      dispatch(
        assignToCaptain({
          id: editItem._id,
          captainId: selectedCaptain.value,
          fare: data.fare,
        })
      );
      dispatch(toggleAssignModal(false));
      reset();
      setTimeout(() => {
        dispatch(getAllRide());
      }, 400);
    } catch (error) {
      console.error("Error assigning ride:", error);
      alert("Failed to assign ride");
    }
  };

  return (
    <div>
      <Modal
        title="Assign Ride To Captain"
        labelclassName="btn-outline-dark"
        activeModal={assignModel}
        onClose={() => dispatch(toggleAssignModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid lg:grid-cols-1 gap-4 grid-cols-1">
            <Textinput
              name="pickupLocation"
              label="Pickup Location"
              placeholder="Pickup Location"
              defaultValue={editItem?.pickupLocation}
              register={register}
              disabled
              error={errors.pickupLocation}
            />
            <Textinput
              name="dropoffLocation"
              label="Dropoff Location"
              placeholder="Dropoff Location"
              defaultValue={editItem?.dropoffLocation}
              register={register}
              disabled
              error={errors.dropoffLocation}
            />
            <Textinput
              name="fare"
              label="Fare"
              placeholder="Fare"
              defaultValue={editItem?.fare}
              // disabled
              register={register}
              error={errors.fare}
            />
            <div>
              <label htmlFor="findCaptain" className="form-label">
                Find Captain
              </label>
              <Controller
                name="findCaptain"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={captains}
                    onInputChange={handleSearchChange}
                    onChange={setSelectedCaptain}
                    className="react-select"
                    classNamePrefix="select"
                    placeholder="Search Captain"
                    isClearable
                  />
                )}
              />
              {errors.findCaptain && (
                <div className="mt-2 text-danger-500 block text-sm">
                  {errors.findCaptain.message}
                </div>
              )}
            </div>
          </div>
          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark text-center">Assign</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AssignRide;
