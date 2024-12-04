import { zodResolver } from "@hookform/resolvers/zod";
import { SigninSchema, SigninType } from "@repo/types";
import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { userAuth } from "./zustand/userAuth";
import { isLoading } from "./zustand/isLoading";

const SigninForm = () => {
  const { setUser } = userAuth();
  const { setLoading } = isLoading();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SigninType>({
    defaultValues: {
      userName: "",
      password: "",
    },
    resolver: zodResolver(SigninSchema),
  });

  const onSubmit: SubmitHandler<SigninType> = async (data: SigninType) => {
    try {
      setLoading(true);
      const user = await axios.post(
        "http://localhost:8000/api/v1/auth/signin",
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
      console.log("Error while setting Signin form: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="label p-2">
          <span className="text-base label-text text-gray-300">Username</span>
        </label>
        <input
          type="text"
          placeholder="Enter username"
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
          placeholder="Enter password"
          className="w-full input input-bordered h-10"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-orange-600">{errors.password.message}</p>
        )}
      </div>
      <Link
        to="/signup"
        className="text-sm text-gray-300 hover:underline hover:text-blue-600 mt-2 inline-block"
      >
        {"Don't"} have an account?
      </Link>
      <div>
        <button
          type="submit"
          className="btn btn-block btn-sm mt-2 border border-slate-700"
          disabled={isSubmitting}
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

export default SigninForm;
