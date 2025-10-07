"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import logo from "@/images/logo_text.png";

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <>
      <div className="min-h-screen grid place-items-center font-sans">
        <div className="w-lg p-4 flex flex-col rounded-xl bg-surface">
          <Image
            src={logo}
            alt="Logo Text"
            className="w-48 mb-4 self-center"
          ></Image>
          <div className="mb-4 p-1 flex space-x-1 rounded-xl bg-surface-disabled">
            <Link
              href="login"
              className={`p-1.5 grow rounded-xl text-center font-medium ${
                pathname.startsWith("/login") && "bg-primary text-on-primary"
              }`}
            >
              Login
            </Link>
            <Link
              href="register"
              className={`p-1.5 grow rounded-xl text-center font-medium ${
                pathname.startsWith("/register") && "bg-primary text-on-primary"
              }`}
            >
              Register
            </Link>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
