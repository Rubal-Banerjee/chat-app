import React from "react";
import GenderCheckbox from "./Gender-Checkbox";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignupSchema, SignupType } from "@repo/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { userAuth } from "./zustand/userAuth";
import { isLoading } from "./zustand/isLoading";

const SignupForm = () => {
  const { setUser } = userAuth();
  const { setLoading } = isLoading();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupType>({
    defaultValues: {
      fullName: "",
      userName: "",
      password: "",
      confirmPassword: "",
      gender: undefined,
    },
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit: SubmitHandler<SignupType> = async (data: SignupType) => {
    try {
      setLoading(true);
      const user = await axios.post(
        "http://localhost:8000/api/v1/auth/signup",
        data,
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      if (user) {
        setUser(user.data);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error while setting Signup form data: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="label p-2">
          <span className="text-base label-text text-gray-300">Full Name</span>
        </label>
        <input
          type="text"
          placeholder="John Doe"
          className="w-full input input-bordered h-10"
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="text-orange-600">{errors.fullName.message}</p>
        )}
      </div>
      <div>
        <label className="label p-2">
          <span className="text-base label-text text-gray-300">Username</span>
        </label>
        <input
          type="text"
          placeholder="johndoe"
          className="w-full input input-bordered h-10"
          {...register("userName")}
        />
        {errors.userName && (
          <p className="text-orange-600">{errors.userName.message}</p>
        )}
      </div>
      <div>
        <label className="label p-2">
          <span className="text-base label-text text-gray-300">Password</span>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full input input-bordered h-10"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-orange-600">{errors.password.message}</p>
        )}
      </div>
      <div>
        <label className="label p-2">
          <span className="text-base label-text text-gray-300">
            Confirm Password
          </span>
        </label>
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full input input-bordered h-10"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-orange-600">{errors.confirmPassword.message}</p>
        )}
      </div>
      <GenderCheckbox register={register} errors={errors.gender} />
      <Link
        to="/signin"
        className="text-sm text-gray-300 hover:underline hover:text-blue-600 mt-2 inline-block"
      >
        Already have an account?
      </Link>
      <div>
        <button
          type="submit"
          className={`btn btn-block btn-sm mt-2 border border-slate-700 ${isSubmitting && `text-white font-bold`}`}
          disabled={isSubmitting}
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
