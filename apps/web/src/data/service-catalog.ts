import type { ApiService } from "@/types/api";

export const serviceCatalog: ApiService[] = [
  {
    id: "installation",
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
    id: "installation-60",
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
    id: "installation-80",
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
    id: "installation-100",
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
    id: "gas-refill",
    slug: "gas-refill",
    name: "Gas Refill",
    nameKa: "ფრეონის შევსება",
    description: "100 grams.",
    descriptionKa: "100 გრამი.",
    price: 30,
    estimatedDuration: 75,
    image: "https://images.unsplash.com/photo-1581091215367-59ab6c4f655f?auto=format&fit=crop&w=900&q=80",
    active: true
  },
  {
    id: "cleaning",
    slug: "cleaning",
    name: "Deep Cleaning",
    nameKa: "ღრმა წმენდა",
    description: "The final price depends on the contamination level and the age of the air conditioner.",
    descriptionKa: "ფასი დამოკიდებულია დაბინძურებაზე და კონდიციონერის სიძველეზე.",
    price: 100,
    estimatedDuration: 80,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
    active: true
  },
  {
    id: "diagnostics",
    slug: "diagnostics",
    name: "On-site consultation and diagnostics",
    nameKa: "კონსულტაცია-დიაგნოსტიკა ადგილზე",
    description: "Electrical, pressure, thermostat and airflow diagnostics with repair recommendations.",
    descriptionKa: "ელექტრო, წნევის, თერმოსტატის და ჰაერის ნაკადის დიაგნოსტიკა შეკეთების რეკომენდაციებით.",
    price: 60,
    estimatedDuration: 60,
    image: "https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&w=900&q=80",
    active: true
  },
  {
    id: "repair",
    slug: "repair",
    name: "Repair",
    nameKa: "შეკეთება",
    description: "Repair cost depends on the damage.",
    descriptionKa: "შეკეთების ღირებულება დამოკიდებულია დაზიანებაზე.",
    price: 0,
    estimatedDuration: 120,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
    active: true
  },
];
