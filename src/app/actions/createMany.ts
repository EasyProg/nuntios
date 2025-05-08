const createMany = async () => {
  await prisma.user.createMany({
    data: [
      { name: "Bob", email: "bob@prisma.io" },
      { name: "Yewande", email: "yewande@prisma.io" },
      { name: "Angelique", email: "angelique@prisma.io" },
    ],
  });
};

export default createMany;
