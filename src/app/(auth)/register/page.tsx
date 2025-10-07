"use client";

import ErrorMessage from "@/components/dialog/ErrorMessage";
import { registerUser } from "@/libs/action";
import { LucideEye, LucideEyeOff } from "lucide-react";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const inputName = formData.get("name") as string;
    const inputEmail = formData.get("email") as string;
    const inputPassword = formData.get("password") as string;
    const inputConfirmPassword = formData.get("confirm-password") as string;

    const regex = /^[a-zA-Z0-9\s]+$/;
    const name = inputName.trim();

    if (!inputName || !inputEmail || !inputPassword || !inputConfirmPassword) {
      setErrorMessage("All inputs are required.");
      return;
    }

    if (!regex.test(name)) {
      setErrorMessage("Name cannot contain symbols.");
      return;
    }

    if (inputPassword !== inputConfirmPassword) {
      setErrorMessage("Confirm Password is not the same as Password.");
      return;
    }

    await registerUser(formData);
  };

  return (
    <>
      <form onSubmit={onSubmitForm} method="post" className="flex flex-col">
        <label htmlFor="name" className="mb-1 text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="John Doe"
          className="mb-4 p-2"
        />

        <label htmlFor="email" className="mb-1 text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="johndoe@example.com"
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
          className="p-2 rounded-xl font-semibold bg-primary text-on-primary"
        >
          Confirm
        </button>
      </form>

      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          onClose={() => {
            setErrorMessage("");
          }}
        />
      )}
    </>
  );
}
