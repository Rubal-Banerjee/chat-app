import React from "react";

const GenderCheckbox = () => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className="gap-2 label cursor-pointer">
          <span className="label-text">Male</span>
          <input type="checkbox" className="border-slate-900 checkbox" />
        </label>
      </div>
      <div className="form-control">
        <label className="gap-2 label cursor-pointer">
          <span className="label-text">Female</span>
          <input type="checkbox" className="border-slate-900 checkbox" />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
