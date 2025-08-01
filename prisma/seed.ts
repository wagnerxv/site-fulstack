// import { PrismaClient } from "@prisma/client";
import { prisma } from "@/providers/prisma";
import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

async function main() {
  await prisma.admin.create({
    data: {
      email: "admin@email.com",
      name: "Salão Top",
      password: await bcrypt.hash("admin123", 10),
    },
  });
  console.log("Seeding completed.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
