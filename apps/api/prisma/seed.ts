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
    slug: "repair",
    name: "Repair",
    nameKa: "შეკეთება",
    description: "Fast repair for weak cooling, leaking, strange noise, compressor and board faults.",
    descriptionKa: "სწრაფი შეკეთება სუსტი გაგრილების, გაჟონვის, უცნაური ხმაურის, კომპრესორის და პლატის პრობლემებზე.",
    price: 119,
    estimatedDuration: 120,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80"
  },
  {
    slug: "emergency-service",
    name: "Emergency Service",
    nameKa: "ექტრენული დაკომპლექტება",
    description: "24/7 urgent AC repair and emergency support with priority dispatch.",
    descriptionKa: "24/7 ექსტრენული კონდიციონერის შეკეთება და ემერგენსი მხარდაჭერა პრიორიტეტული დისპეტჩერიზაციით.",
    price: 189,
    estimatedDuration: 90
  },
  {
    slug: "warranty-inspection",
    name: "Warranty Inspection",
    nameKa: "გარანტიის შემოწმება",
    description: "Annual warranty maintenance check and compliance verification.",
    descriptionKa: "წლიური გარანტიის მოვლის შემოწმება და შესაბამისობის გადამოწმება.",
    price: 79,
    estimatedDuration: 45
  },
  {
    slug: "filter-replacement",
    name: "Filter Replacement",
    nameKa: "ფილტრის შეცვლა",
    description: "AC filter cleaning and replacement with high-efficiency filters.",
    descriptionKa: "კონდიციონერის ფილტრის წმენდა და შეცვლა მაღალი ეფექტიანობის ფილტრებით.",
    price: 49,
    estimatedDuration: 30
  }
];

const inactiveServiceSlugs = ["maintenance", "relocation", "emergency-service", "warranty-inspection"];

async function main() {
  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      create: service,
      update: service
    });
  }

  await prisma.service.updateMany({
    where: { slug: { in: inactiveServiceSlugs } },
    data: { active: false }
  });

  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  const name = process.env.SEED_ADMIN_NAME ?? "Coolmaster Admin";

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
