"use client";

import React, { useEffect } from "react";
import useGetToken from "../hooks/useGetToken";
import Loader from "@/app/components/Loader";
import { useShootOtp } from "../hooks/useShootOtp";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const ShootOtpForm = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const { token, loading: tokenLoading, error: tokenError } = useGetToken();

  const { form, isPending } = useShootOtp();

  useEffect(() => {
    if (email && form.values.email === "") {
      form.update("email", email);
    }
  }, [email, form, form.values.email]);

  if (tokenLoading) return <Loader />;
  if (tokenError) return <p className="text-red-500">Error fetching token.</p>;

  return (
    <form
      action={form.action}
      className="flex flex-col gap-3 max-w-sm mx-auto p-4 bg-white"
    >
      <div>
        <h2 className="text-lg font-medium">Reset Password</h2>
        <p className="text-sm text-gray-600">
          Please enter your email to reset password
        </p>
      </div>

      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={form.values.email}
        onChange={(e) => form.update("email", e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      {form.errors.email && (
        <p className="text-red-500 text-sm">{form.errors.email}</p>
      )}

      <input
        type="text"
        name="apiToken"
        value={token?.token}
        onChange={(e) => form.update("apiToken", e.target.value)}
        hidden
      />

      <button
        type="submit"
        className="w-full bg-[#003970] text-white py-2 px-4 rounded-md hover:bg-blue-900 cursor-pointer disabled:opacity-50 font-medium"
        disabled={!form.canSubmit || isPending}
      >
        {isPending ? "Sending..." : "Send OTP"}
      </button>
      <Link
        href="/auth/login"
        className="text-sm text-blue-600 hover:underline"
      >
        Get back to login
      </Link>
    </form>
  );
};

export default ShootOtpForm;
