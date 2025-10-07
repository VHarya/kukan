import "dotenv/config";
import path from "node:path";
import type { PrismaConfig } from "prisma";

export default {
  schema: path.join("prisma", "schemas"),
  migrations: {
    path: path.join("prisma", "migrations"),
  },
} satisfies PrismaConfig;
