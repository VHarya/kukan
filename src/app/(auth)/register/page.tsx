"use client";

import ErrorMessage from "@/components/dialog/ErrorMessage";
import { registerUser } from "@/libs/actions/user";
import { LucideEye, LucideEyeOff } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

export default function RegisterPage() {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const [error, formAction, isLoading] = useActionState(registerUser, "");

  useEffect(() => {
    if (error.length > 0) {
      setShowErrorDialog(true);
    }
  }, [error]);

  return (
    <>
      <form action={formAction} className="flex flex-col">
        <label htmlFor="name" className="mb-1 text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="John Doe"
          defaultValue={inputName}
          onChange={(e) => {
            setInputName(e.currentTarget.value);
          }}
          className="mb-4 p-2"
        />

        <label htmlFor="email" className="mb-1 text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="johndoe@example.com"
          defaultValue={inputEmail}
          onChange={(e) => {
            setInputEmail(e.currentTarget.value);
          }}
          className="mb-4 p-2"
        />

        <label htmlFor="password" className="mb-1 text-sm font-medium">
          Password
        </label>
        <div className="mb-4 relative flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="******"
            className="w-full p-2 pr-9"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            className="p-1 absolute right-2 text-disabled"
          >
            {showPassword ? (
              <LucideEye size={16} />
            ) : (
              <LucideEyeOff size={16} />
            )}
          </button>
        </div>

        <label htmlFor="password" className="mb-1 text-sm font-medium">
          Confirm Password
        </label>
        <div className="mb-4 relative flex items-center">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirm-password"
            placeholder="******"
            className="w-full p-2 pr-9"
          />
          <button
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            type="button"
            className="p-1 absolute right-2 text-disabled"
          >
            {showConfirmPassword ? (
              <LucideEye size={16} />
            ) : (
              <LucideEyeOff size={16} />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="p-2 rounded-xl font-semibold bg-primary text-on-primary"
        >
          Confirm
        </button>
      </form>

      {showErrorDialog && (
        <ErrorMessage
          message={error}
          onClose={() => {
            setShowErrorDialog(false);
          }}
        />
      )}
    </>
  );
}
