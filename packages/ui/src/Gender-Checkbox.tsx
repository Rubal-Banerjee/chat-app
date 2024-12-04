import { SignupType } from "@repo/types";
import { FieldError, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<SignupType>;
  errors: FieldError | undefined;
}

const GenderCheckbox = ({ register, errors }: Props) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className="gap-2 label cursor-pointer">
          <span className="label-text text-gray-300">Gender</span>
          <select {...register("gender")} className="ml-8 rounded-md">
            <option value="">Select...</option>
            <option value={"male"}>Male</option>
            <option value={"female"}>Female</option>
          </select>
          {errors?.message && (
            <p className="text-orange-600">{errors.message}</p>
          )}
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
