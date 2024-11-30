import React from "react";
import GenderCheckbox from "./Gender-Checkbox";

const SignupForm = () => {
  return (
    <form>
      <div>
        <label className="label p-2">
          <span className="text-base label-text text-gray-300">Full Name</span>
        </label>
        <input
          type="text"
          placeholder="John Doe"
          className="w-full input input-bordered h-10"
        />
      </div>
      <div>
        <label className="label p-2">
          <span className="text-base label-text text-gray-300">Username</span>
        </label>
        <input
          type="text"
          placeholder="johndoe"
          className="w-full input input-bordered h-10"
        />
      </div>
      <div>
        <label className="label p-2">
          <span className="text-base label-text text-gray-300">Password</span>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full input input-bordered h-10"
        />
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
        />
      </div>
      <GenderCheckbox />
      <a
        href="/signin"
        className="text-sm text-gray-300 hover:underline hover:text-blue-600 mt-2 inline-block"
      >
        Already have an account?
      </a>
      <div>
        <button className="btn btn-block btn-sm mt-2 border border-slate-700">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
