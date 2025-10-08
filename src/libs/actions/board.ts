"use server";

import { PrismaClient } from "@/generated/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { redirect } from "next/navigation";

export async function createBoard(prevState: string, formData: FormData) {
  const inputTitle = formData.get("title") as string;
  const inputTags = formData.get("tags") as string;

  const name = inputTitle.trim();
  const tags = inputTags
    .split(",")
    .map((tag) => tag.trim())
    .map((tag) =>
      tag
        .slice(1)
        .toLowerCase()
        .replace(/[^a-z0-9 _]/g, "")
        .replace(/\s+/g, "_")
    );

  const regex = /^[a-zA-Z0-9\s]+$/;
  if (!regex.test(name)) {
    return "Name cannot contain symbols.";
  }

  const prisma = new PrismaClient();

  try {
    await prisma.board.create({
      data: {
        name: name,
        category: {
          create: tags.map((tag) => ({ name: tag })),
        },
      },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return error.message;
    }

    return "Something went wrong.";
  }

  redirect("/");
}
