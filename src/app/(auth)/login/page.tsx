"use client";

import ErrorMessage from "@/components/dialog/ErrorMessage";
import { loginUser } from "@/libs/actions/user";
import { LucideEye, LucideEyeOff } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

export default function LoginPage() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const [error, formAction, isLoading] = useActionState(loginUser, "");

  useEffect(() => {
    if (error.length > 0) {
      setShowErrorDialog(true);
    }
  }, [error]);

  return (
    <>
      <form action={formAction} className="flex flex-col">
        <label htmlFor="email" className="mb-1">
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

        <label htmlFor="password" className="mb-1">
          Password
        </label>
        <div className="mb-4 relative flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="******"
            defaultValue={inputPassword}
            onChange={(e) => {
              setInputPassword(e.currentTarget.value);
            }}
            className="w-full p-2"
          />
          <button
            onClick={() => setShowPassword(true)}
            type="button"
            className="p-1 absolute right-2 text-disabled"
          >
            {showPassword ? (
              <LucideEye size={20} />
            ) : (
              <LucideEyeOff size={20} />
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
