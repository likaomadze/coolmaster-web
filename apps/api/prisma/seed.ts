import { PrismaClient, Role } from "@prisma/client";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

const services = [
  {
    slug: "installation",
    name: "AC installation up to 40 sq.m.",
    nameKa: "კონდიციონერის მონტაჟი 40 კვ",
    description: "Installation up to 40 sq.m. costs 200 GEL; concrete or sinkari drilling adds 120 GEL.",
    descriptionKa: "40 კვ მონტაჟი 200 ლარი; ბეტონის ან სინკარის გახვრეტის შემთხვევაში ემატება 120 ლარი.",
    price: 200,
    estimatedDuration: 180,
    active: true
  },
  {
    slug: "installation-60",
    name: "AC installation up to 60 sq.m.",
    nameKa: "კონდიციონერის მონტაჟი 60 კვ",
    description: "Installation up to 60 sq.m. costs 250 GEL; concrete or sinkari drilling adds 120 GEL.",
    descriptionKa: "60 კვ მონტაჟი 250 ლარი; ბეტონის ან სინკარის გახვრეტის შემთხვევაში ემატება 120 ლარი.",
    price: 250,
    estimatedDuration: 180,
    active: true
  },
  {
    slug: "installation-80",
    name: "AC installation up to 80 sq.m.",
    nameKa: "კონდიციონერის მონტაჟი 80 კვ",
    description: "Installation up to 80 sq.m. costs 280 GEL; concrete or sinkari drilling adds 120 GEL.",
    descriptionKa: "80 კვ მონტაჟი 280 ლარი; ბეტონის ან სინკარის გახვრეტის შემთხვევაში ემატება 120 ლარი.",
    price: 280,
    estimatedDuration: 180,
    active: true
  },
  {
    slug: "installation-100",
    name: "AC installation up to 100 sq.m.",
    nameKa: "კონდიციონერის მონტაჟი 100 კვ",
    description: "Installation up to 100 sq.m. costs 350 GEL; concrete or sinkari drilling adds 120 GEL.",
    descriptionKa: "100 კვ მონტაჟი 350 ლარი; ბეტონის ან სინკარის გახვრეტის შემთხვევაში ემატება 120 ლარი.",
    price: 350,
    estimatedDuration: 180,
    active: true
  },
  {
    slug: "gas-refill",
    name: "Gas Refill",
    nameKa: "ფრეონის შევსება",
    description: "100 grams.",
    descriptionKa: "100 გრამი.",
    price: 30,
    estimatedDuration: 75,
    active: true
  },
  {
    slug: "cleaning",
    name: "Deep Cleaning",
    nameKa: "ღრმა წმენდა",
    description: "The final price depends on the contamination level and the age of the air conditioner.",
    descriptionKa: "ფასი დამოკიდებულია დაბინძურებაზე და კონდიციონერის სიძველეზე.",
    price: 100,
    estimatedDuration: 80,
    active: true
  },
  {
    slug: "diagnostics",
    name: "On-site consultation and diagnostics",
    nameKa: "კონსულტაცია-დიაგნოსტიკა ადგილზე",
    description: "Electrical, pressure, thermostat and airflow diagnostics with repair recommendations.",
    descriptionKa: "ელექტრო, წნევის, თერმოსტატის და ჰაერის ნაკადის დიაგნოსტიკა შეკეთების რეკომენდაციებით.",
    price: 60,
    estimatedDuration: 60,
    active: true
  },
  {
    slug: "repair",
    name: "Repair",
    nameKa: "შეკეთება",
    description: "Repair cost depends on the damage.",
    descriptionKa: "შეკეთების ღირებულება დამოკიდებულია დაზიანებაზე.",
    price: 0,
    estimatedDuration: 120,
    active: true
  }
];

const inactiveServiceSlugs = ["maintenance", "relocation", "emergency-service", "warranty-inspection", "filter-replacement"];

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
