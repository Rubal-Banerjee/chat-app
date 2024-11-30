import React from "react";

const SigninForm = () => {
  return (
    <form>
      <div>
        <label className="label p-2">
          <span className="text-base label-text text-gray-300">Username</span>
        </label>
        <input
          type="text"
          placeholder="Enter username"
          className="w-full input input-bordered h-10"
        />
      </div>
      <div>
        <label className="label p-2">
          <span className="text-base label-text text-gray-300">Password</span>
        </label>
        <input
          type="password"
          placeholder="Enter password"
          className="w-full input input-bordered h-10"
        />
      </div>
      <a
        href="/signup"
        className="text-sm text-gray-300 hover:underline hover:text-blue-600 mt-2 inline-block"
      >
        {"Don't"} have an account?
      </a>
      <div>
        <button className="btn btn-block btn-sm mt-2 border border-slate-700">
          Sign In
        </button>
      </div>
    </form>
  );
};

export default SigninForm;
