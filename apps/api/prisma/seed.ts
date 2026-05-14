import { PrismaClient, Role } from "@prisma/client";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

const services = [
  {
    slug: "installation",
    name: "AC Installation",
    nameKa: "კონდიციონერის მონტაჟი",
    description: "Certified split and central AC installation with line-set, vacuum, testing and warranty handoff.",
    descriptionKa: "სერტიფიცირებული სპლიტ და ცენტრალური კონდიციონერის მონტაჟი მაგისტრალით, ვაკუუმირებით, ტესტირებით და გარანტიის გადაცემით.",
    price: 249,
    estimatedDuration: 180,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80"
  },
  {
    slug: "maintenance",
    name: "Maintenance",
    nameKa: "მოვლა",
    description: "Seasonal tune-up, coil inspection, electrical checks, drainage service and performance report.",
    descriptionKa: "სეზონური შემოწმება, რადიატორის ინსპექცია, ელექტრო შემოწმებები, დრენაჟის სერვისი და მუშაობის ანგარიში.",
    price: 129,
    estimatedDuration: 90,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80"
  },
  {
    slug: "gas-refill",
    name: "Gas Refill",
    nameKa: "ფრეონის შევსება",
    description: "Leak check and refrigerant refill with pressure balancing and digital readings.",
    descriptionKa: "გაჟონვის შემოწმება და მაცივარი აგენტის შევსება წნევის დაბალანსებით და ციფრული მაჩვენებლებით.",
    price: 159,
    estimatedDuration: 75,
    image: "https://images.unsplash.com/photo-1581091215367-59ab6c4f655f?auto=format&fit=crop&w=900&q=80"
  },
  {
    slug: "cleaning",
    name: "Deep Cleaning",
    nameKa: "ღრმა წმენდა",
    description: "Indoor unit disassembly, anti-bacterial wash, drain flush and airflow restoration.",
    descriptionKa: "შიდა ბლოკის დაშლა, ანტიბაქტერიული რეცხვა, დრენაჟის გაწმენდა და ჰაერის ნაკადის აღდგენა.",
    price: 99,
    estimatedDuration: 80,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80"
  },
  {
    slug: "diagnostics",
    name: "Diagnostics",
    nameKa: "დიაგნოსტიკა",
    description: "Electrical, pressure, thermostat and airflow diagnostics with repair recommendations.",
    descriptionKa: "ელექტრო, წნევის, თერმოსტატის და ჰაერის ნაკადის დიაგნოსტიკა შეკეთების რეკომენდაციებით.",
    price: 89,
    estimatedDuration: 60,
    image: "https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&w=900&q=80"
  },
  {
    slug: "relocation",
    name: "Relocation",
    nameKa: "გადატანა",
    description: "Safe AC uninstall, transport prep and reinstallation at the new address.",
    descriptionKa: "კონდიციონერის უსაფრთხო დემონტაჟი, ტრანსპორტირებისთვის მომზადება და ახალ მისამართზე ხელახლა მონტაჟი.",
    price: 299,
    estimatedDuration: 240,
    image: "https://images.unsplash.com/photo-1604754742629-3e5728249d73?auto=format&fit=crop&w=900&q=80"
  },
  {
    slug: "repair",
    name: "Repair",
    nameKa: "შეკეთება",
    description: "Fast repair for weak cooling, leaking, strange noise, compressor and board faults.",
    descriptionKa: "სწრაფი შეკეთება სუსტი გაგრილების, გაჟონვის, უცნაური ხმაურის, კომპრესორის და პლატის პრობლემებზე.",
    price: 119,
    estimatedDuration: 120,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80"
  }
];

async function main() {
  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      create: service,
      update: service
    });
  }

  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  const name = process.env.SEED_ADMIN_NAME ?? "AeroFlow Admin";

  if (email && password) {
    await prisma.user.upsert({
      where: { email },
      create: {
        name,
        email,
        password: await argon2.hash(password),
        role: Role.SUPER_ADMIN,
        emailVerifiedAt: new Date()
      },
      update: { role: Role.SUPER_ADMIN }
    });
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
