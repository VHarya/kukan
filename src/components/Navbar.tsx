"use client";

import Image from "next/image";
import Form from "next/form";
import Logo from "@/images/logo.png";
import { LucideSearch, LucideX } from "lucide-react";
import { useState } from "react";
import ProfileMenu from "./dialog/ProfileMenu";
import CreateBoard from "./dialog/CreateBoard";

export default function Navbar() {
  const [inputSearch, setInputSearch] = useState("");

  return (
    <nav className="h-16 p-3 font-sans flex space-x-64 bg-[#fafafa] shadow">
      <Image src={Logo} alt="Kukan Logo" className="w-10 h-10" />

      <div className="grow flex">
        <Form
          action=""
          className="w-full h-full mr-4 relative flex items-center"
        >
          <input
            type="search"
            name="search"
            placeholder="Search Board"
            defaultValue={inputSearch}
            onChange={(e) => {
              setInputSearch(e.currentTarget.value);
            }}
            className="w-full h-full px-2 py-1 pr-10"
          />
          {inputSearch ? (
            <LucideX size={18} className="absolute right-3 text-error" />
          ) : (
            <LucideSearch
              size={18}
              className="absolute right-3 text-disabled"
            />
          )}
        </Form>
        <CreateBoard />
      </div>

      <ProfileMenu />
    </nav>
  );
}
