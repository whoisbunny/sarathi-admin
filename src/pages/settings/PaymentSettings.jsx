import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  togglePaymentSettingsModal,
  updateCompanySettings,
  getCompanySettings,
} from "@/store/settings/settings.reducer";

const FormValidationSchema = yup
  .object({
    dailyPayment: yup
      .number()
      .required("Daily fare is required")
      .typeError("Fare must be a number")
      .min(0, "Fare cannot be negative"),
    hourlyPayment: yup
      .number()
      .required("Hourly fare is required")
      .typeError("Fare must be a number")
      .min(0, "Fare cannot be negative"),
    monthlyPayment: yup
      .number()
      .required("Monthly fare is required")
      .typeError("Fare must be a number")
      .min(0, "Fare cannot be negative"),
    dailyPaymentAuto: yup
      .number()
      .required("Daily fare is required")
      .typeError("Fare must be a number")
      .min(0, "Fare cannot be negative"),
    hourlyPaymentAuto: yup
      .number()
      .required("Hourly fare is required")
      .typeError("Fare must be a number")
      .min(0, "Fare cannot be negative"),
    monthlyPaymentAuto: yup
      .number()
      .required("Monthly fare is required")
      .typeError("Fare must be a number")
      .min(0, "Fare cannot be negative"),
  })
  .required();

const PaymentSettings = () => {
  const dispatch = useDispatch();
  const { loading, companySettings, openPaymentSettingsModal } = useSelector(
    (state) => state.settings
  );

  const {
    register,
    reset,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

  const onSubmit = (data) => {
    dispatch(
      updateCompanySettings({ formData: data, id: companySettings._id })
    )
      .then(() => {
        reset();
        dispatch(togglePaymentSettingsModal(false));
      })
      .catch((error) => {
        console.error("Error updating payment settings:", error);
      });
  };

  return (
    <div>
      <Modal
        title="Payment Settings"
        labelclassName="btn-outline-dark"
        activeModal={openPaymentSettingsModal}
        className="max-w-3xl"
        onClose={() => dispatch(togglePaymentSettingsModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="grid md:grid-cols-3 grid-cols  gap-4">
              {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4"></div> */}

              <div className="col-span-full">Captain Rates</div>

              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                <Textinput
                  name="dailyPayment"
                  label="Daily Fare (24 Hours)"
                  placeholder="Enter daily fare amount"
                  register={register}
                  error={errors.dailyPayment}
                  defaultValue={companySettings?.dailyPayment}
                  type="number"
                  prefix="₹"
                />
                <div className="text-xs text-slate-500 mt-1">
                  Set the fare amount for 24-hour rentals
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                <Textinput
                  name="hourlyPayment"
                  label="Hourly Fare"
                  placeholder="Enter hourly fare amount"
                  register={register}
                  error={errors.hourlyPayment}
                  defaultValue={companySettings?.hourlyPayment}
                  type="number"
                  prefix="₹"
                />
                <div className="text-xs text-slate-500 mt-1">
                  Set the fare amount per hour
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                <Textinput
                  name="monthlyPayment"
                  label="Monthly Fare"
                  placeholder="Enter monthly fare amount"
                  register={register}
                  error={errors.monthlyPayment}
                  defaultValue={companySettings?.monthlyPayment}
                  type="number"
                  prefix="₹"
                />
                <div className="text-xs text-slate-500 mt-1">
                  Set the fare amount for monthly rentals
                </div>
              </div>
              <div className="col-span-full">Auto Rates</div>
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                <Textinput
                  name="dailyPaymentAuto"
                  label="Daily Fare (24 Hours)"
                  placeholder="Enter daily fare amount"
                  register={register}
                  error={errors.dailyPaymentAuto}
                  defaultValue={companySettings?.dailyPaymentAuto}
                  type="number"
                  prefix="₹"
                />
                <div className="text-xs text-slate-500 mt-1">
                  Set the fare amount for 24-hour rentals
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                <Textinput
                  name="hourlyPaymentAuto"
                  label="Hourly Fare"
                  placeholder="Enter hourly fare amount"
                  register={register}
                  error={errors.hourlyPaymentAuto}
                  defaultValue={companySettings?.hourlyPaymentAuto}
                  type="number"
                  prefix="₹"
                />
                <div className="text-xs text-slate-500 mt-1">
                  Set the fare amount per hour
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                <Textinput
                  name="monthlyPaymentAuto"
                  label="Monthly Fare"
                  placeholder="Enter monthly fare amount"
                  register={register}
                  error={errors.monthlyPaymentAuto}
                  defaultValue={companySettings?.monthlyPaymentAuto}
                  type="number"
                  prefix="₹"
                />
                <div className="text-xs text-slate-500 mt-1">
                  Set the fare amount for monthly rentals
                </div>
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

export default PaymentSettings;
