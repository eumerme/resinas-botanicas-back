import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.category.deleteMany({});
  const categories = await prisma.category.createMany({
    data: [
      {
        name: "Anéis",
        image: "https://i.im.ge/2023/02/04/aIvlPG.aneis.jpg",
      },
      {
        name: "Brincos",
        image: "https://i.im.ge/2023/02/04/aIvXqL.brincos.jpg",
      },
      {
        name: "Colares",
        image: "https://i.im.ge/2023/02/04/aIvTnc.colares.jpg",
      },
      {
        name: "Pulseiras",
        image: "https://i.im.ge/2023/02/04/aIpR9M.pulseiras.jpg",
      },
      {
        name: "Decorações",
        image: "https://i.im.ge/2023/02/04/aIpBRr.outros.jpg",
      },
    ],
  });

  console.log({ categories });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
