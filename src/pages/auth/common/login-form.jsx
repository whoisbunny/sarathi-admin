import React, { useCallback, useEffect, useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {

  loginUser,
} from "../../../store/auth/auth.reducer";
const schema = yup
  .object({
    phoneNumber: yup
      .number()

      .required("Phone Number is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();
const LoginForm = () => {

  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
    const { token, refreshtoken, isLoggedin } = useSelector(
      (state) => state.auth
    );
  const navigate = useNavigate();
  const onSubmit = (data) => {
    dispatch(loginUser(data));
 
  };


   useEffect(() => {
     if (isLoggedin) {
       navigate("/dashboard");
     }
   }, [isLoggedin, navigate]);

  const [checked, setChecked] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="phoneNumber"
        label="phoneNumber"
        type="number"
        register={register}
        error={errors.phoneNumber}
        className="h-[48px]"
      />
      <Textinput
        name="password"
        label="password"
        type="password"
        register={register}
        error={errors.password}
        className="h-[48px]"
      />
      <div className="flex justify-between">
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Keep me signed in"
        />
        <Link
          to="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?{" "}
        </Link>
      </div>

      <button className="btn btn-dark block w-full text-center">Sign in</button>
    </form>
  );
};

export default LoginForm;
