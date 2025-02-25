import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "@/components/ui/Modal";
import Textinput from "@/components/ui/Textinput";
import { toggleAddModal, createCoupon } from "@/store/coupon/coupon.reducer";
import Select from "react-select";

const FormValidationSchema = yup
  .object({
    code: yup.string().required("Code is required"),
    description: yup.string().required("Description is required"),
    discountType: yup.string().required("Discount Type is required"),
    discountValue: yup.number().required("Discount Value is required"),
    maxDiscount: yup.number().nullable(),
    minRideAmount: yup.number().required("Minimum Ride Amount is required"),
    startDate: yup.date().required("Start Date is required"),
    endDate: yup.date().required("End Date is required"),
    maxUses: yup.number().nullable(),
    isActive: yup.boolean().required("Status is required"),
    applicableRideTypes: yup
      .array()
      .of(yup.string())
      .required("Applicable Ride Types are required"),
  })
  .required();

const DiscountTypeOptions = [
  { value: "fixed", label: "Fixed" },
  { value: "percentage", label: "Percentage" },
];

const RideTypeOptions = [
  { value: "hourly", label: "Hourly" },
  { value: "daily", label: "Daily" },
  { value: "monthly", label: "Monthly" },
];

const AddCoupon = () => {
  const [DiscountType, setDiscountType] = useState(null);
  const [RideTypes, setRideTypes] = useState([]);
  const { openCouponModal } = useSelector((state) => state.coupon);
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
    data.discountType = DiscountType?.value;
    data.applicableRideTypes = RideTypes.map((type) => type.value);
    dispatch(createCoupon(data));
    reset();
    dispatch(toggleAddModal(false));
  };

  return (
    <Modal
      title="Create Coupon"
      activeModal={openCouponModal}
      onClose={() => dispatch(toggleAddModal(false))}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid lg:grid-cols-2 gap-4 grid-cols-1">
          <Textinput
            name="code"
            label="Code"
            placeholder="Code"
            register={register}
            error={errors.code}
          />
          <Textinput
            name="description"
            label="Description"
            placeholder="Description"
            register={register}
            error={errors.description}
          />
          <div>
            <label htmlFor="discountType" className="form-label">
              Discount Type
            </label>
            <Controller
              name="discountType"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={DiscountTypeOptions}
                  onChange={setDiscountType}
                  className="react-select"
                  classNamePrefix="select"
                  placeholder="Select Discount Type"
                  isClearable
                />
              )}
            />
            {errors.discountType && (
              <div className="mt-2 text-danger-500 block text-sm">
                {errors.discountType.message}
              </div>
            )}
          </div>
          <Textinput
            name="discountValue"
            label="Discount Value"
            placeholder="Discount Value"
            register={register}
            error={errors.discountValue}
          />
          <Textinput
            name="maxDiscount"
            label="Max Discount"
            placeholder="Max Discount"
            register={register}
            error={errors.maxDiscount}
          />
          <Textinput
            name="minRideAmount"
            label="Minimum Ride Amount"
            placeholder="Minimum Ride Amount"
            register={register}
            error={errors.minRideAmount}
          />
          <Textinput
            name="startDate"
            label="Start Date"
            placeholder="Start Date"
            type="date"
            register={register}
            error={errors.startDate}
          />
          <Textinput
            name="endDate"
            label="End Date"
            placeholder="End Date"
            type="date"
            register={register}
            error={errors.endDate}
          />
          <Textinput
            name="maxUses"
            label="Max Uses"
            placeholder="Max Uses"
            register={register}
            error={errors.maxUses}
          />
          <div>
            <label htmlFor="isActive" className="form-label">
              Status
            </label>
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { value: true, label: "Active" },
                    { value: false, label: "Inactive" },
                  ]}
                  className="react-select"
                  classNamePrefix="select"
                  placeholder="Select Status"
                  isClearable
                />
              )}
            />
            {errors.isActive && (
              <div className="mt-2 text-danger-500 block text-sm">
                {errors.isActive.message}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="applicableRideTypes" className="form-label">
              Applicable Ride Types
            </label>
            <Controller
              name="applicableRideTypes"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={RideTypeOptions}
                  onChange={setRideTypes}
                  className="react-select"
                  classNamePrefix="select"
                  placeholder="Select Ride Types"
                  isMulti
                />
              )}
            />
            {errors.applicableRideTypes && (
              <div className="mt-2 text-danger-500 block text-sm">
                {errors.applicableRideTypes.message}
              </div>
            )}
          </div>
        </div>
        <div className="ltr:text-right rtl:text-left">
          <button className="btn btn-dark text-center">Add</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddCoupon;
