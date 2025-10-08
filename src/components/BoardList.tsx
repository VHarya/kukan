"use server";

import { PrismaClient } from "@/generated/prisma/client";
import dayjs from "dayjs";
import { LucideCalendarClock } from "lucide-react";

export default async function BoardList() {
  const prisma = new PrismaClient();

  const boards = await prisma.board.findMany({
    include: { category: true },
  });

  // Working on create and read for board
  // Finish no board fallback
  // Try create next if it gets to database then move to read

  return (
    <main>
      {boards.length > 0 ? (
        <ul>
          {boards.map((val) => (
            <li>
              <p>{val.name}</p>
              <span>
                <LucideCalendarClock />
                {dayjs(val.createdAt).format("dd MMMM YYYY HH:mm")}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="w-full h-full">
          <span>No boards</span>
        </div>
      )}
    </main>
  );
}
