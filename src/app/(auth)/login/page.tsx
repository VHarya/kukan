"use client";

import { LucideEye, LucideEyeOff } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const onShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form action="" method="post" className="flex flex-col">
        <label htmlFor="email" className="mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="johndoe@example.com"
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
            className="w-full p-2"
          />
          <button
            onClick={onShowPasswordClick}
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
          className="p-2 rounded-xl font-semibold bg-primary text-on-primary"
        >
          Confirm
        </button>
      </form>
    </>
  );
}
