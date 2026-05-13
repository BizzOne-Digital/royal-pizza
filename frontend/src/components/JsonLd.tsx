import { SITE } from "@/data/menu";

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: SITE.name,
  alternateName: SITE.shortName,
  image: "/assets/royal-logo.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: "Georgetown",
    addressRegion: "ON",
    postalCode: "L7G 4A5",
    addressCountry: "CA",
  },
  telephone: ["+19058772277", "+19058772278"],
  servesCuisine: ["Pizza", "Italian", "Canadian"],
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "11:00",
    closes: "23:00",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://royalpizza.example.com",
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
    />
  );
}
