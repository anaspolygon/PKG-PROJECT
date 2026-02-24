"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import z from "zod";
import BtnSpinner from "./ClipLoader";
import setPassword from "../../actions/setPassword";
import { toast } from "sonner";
import { clearUserSession } from "@/utils/tokenUtils";
import { encryptPayload } from "@/lib/cryto";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?/[\]{}|~`])[A-Za-z\d!@#$%^&*()_\-+=<>?/[\]{}|~`]{11,}$/;

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(11, "Password must be at least 11 characters long")
      .regex(
        passwordRegex,
        "Password must include uppercase, lowercase, number, and special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

const Password = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    const data = { ...formData, [name]: value };
    const result = passwordSchema.safeParse(data);

    if (!result.success) {
      const fieldError = result.error.issues.find(
        (issue) =>
          issue.path[0] === name ||
          (name === "confirmPassword" && issue.path[0] === "confirmPassword")
      );
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError ? fieldError.message : "",
      }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const userLogout = () => {
    clearUserSession();
  };

  const handleSubmit = async () => {
    const result = passwordSchema.safeParse(formData);

    if (!result.success) {
      const errorMap: { [key: string]: string } = {};
      for (const issue of result.error.issues) {
        errorMap[issue.path[0] as string] = issue.message;
      }
      setErrors(errorMap);
      return;
    }

    const setPasswordRaw = localStorage.getItem("set_password");
    const localData = setPasswordRaw ? JSON.parse(setPasswordRaw) : null;

    const payload = {
      authorization_code: localData.authorization_code,
      email: localData.email,
      password: formData.password,
    };
    setLoading(true);
    const res = await setPassword(encryptPayload(payload));
    if (res.success) {
      toast.success(res.message);
      localStorage.removeItem("user");
      localStorage.removeItem("set_password");
      userLogout();
      setTimeout(() => router.push("/auth/login"), 1000);
      setLoading(false);
    } else {
      toast.error(res.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-2">
      {/* Password Field */}
      <div className="relative w-full">
        <input
          name="password"
          type="text" 
          value={formData.password}
          onChange={handleChange}
          className={`w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 pr-10 focus:outline-none disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 
            ${!showPassword ? "password-hidden" : ""}`}
          placeholder="Password"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          data-form-type="other"
          readOnly
          onFocus={(e) => e.currentTarget.removeAttribute("readonly")}
        />
        <div
          className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm my-1">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="relative w-full">
        <input
          name="confirmPassword"
          type="text" 
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 pr-10 focus:outline-none disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 
            ${!showConfirmPassword ? "password-hidden" : ""}`}
          placeholder="Confirm password"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          data-form-type="other"
          readOnly
          onFocus={(e) => e.currentTarget.removeAttribute("readonly")}
        />
        <div
          className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
          onClick={() => setShowConfirmPassword((prev) => !prev)}
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm my-1">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-[#094E9E] text-white font-medium py-2 rounded-md hover:bg-blue-900 cursor-pointer transition duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <BtnSpinner text="Submitting..." />
          </>
        ) : (
          "Submit"
        )}
      </button>
    </div>
  );
};

export default Password;
