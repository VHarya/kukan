"use server";

import { redirect } from "next/navigation";
import { auth } from "../auth";
import { APIError } from "better-auth";

export async function registerUser(prevState: string, formData: FormData) {
  const inputName = formData.get("name") as string;
  const inputEmail = formData.get("email") as string;
  const inputPassword = formData.get("password") as string;
  const inputConfirmPassword = formData.get("confirm-password") as string;

  const regex = /^[a-zA-Z0-9\s]+$/;
  const name = inputName.trim();

  if (!inputName || !inputEmail || !inputPassword || !inputConfirmPassword) {
    return "All inputs are required.";
  }

  if (!regex.test(name)) {
    return "Name cannot contain symbols.";
  }

  if (inputPassword !== inputConfirmPassword) {
    return "Confirm Password is not the same as Password.";
  }

  try {
    await auth.api.signUpEmail({
      body: { 
        name: name,
        email: inputEmail,
        password: inputPassword
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      return error.message;
    }

    return "Something went wrong";
  }

  redirect('/');
}

export async function loginUser(prevState: string, formData: FormData) {
  const inputEmail = formData.get("email") as string;
  const inputPassword = formData.get("password") as string;

  if (!inputEmail || !inputPassword) {
    return "All inputs are required."
  }

  try {
    await auth.api.signInEmail({
      body: { 
        email: inputEmail,
        password: inputPassword
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      return error.message;
    }

    return "Something went wrong.";
  }

  redirect('/');
}
