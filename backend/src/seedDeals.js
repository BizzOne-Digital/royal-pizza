require("dotenv").config();
const mongoose = require("mongoose");

const Deal = require("./models/Deal");

// ✅ MongoDB Atlas URI
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://bizzone:bizzone@cluster0.bwpdzae.mongodb.net/royal-pizza?retryWrites=true&w=majority&appName=Cluster0";

const SEED_DEALS = [
  { title: "2 Small Pizzas", price: 27.49, description: "2 Small Pizzas with 3 Toppings each", image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80", imageAlt: "Two small stone-baked pizzas fresh from the oven", group: "bundle", sortOrder: 1 },
  { title: "2 Medium Pizzas", price: 33.99, description: "2 Medium Pizzas with 3 Toppings each", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80", imageAlt: "Two medium pizzas with fresh toppings", badge: "Popular", group: "bundle", sortOrder: 2 },
  { title: "2 Large Pizzas", price: 42.99, description: "2 Large Pizzas with 3 Toppings each", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80", imageAlt: "Two large pizzas loaded with toppings", badge: "Best Value", group: "bundle", sortOrder: 3 },
  { title: "2 Jumbo Pizzas", price: 49.99, description: "2 Jumbo Pizzas with 3 Toppings each", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80", imageAlt: "Two jumbo-sized pizzas for the whole table", group: "bundle", sortOrder: 4 },
  { title: "2 Party Pizzas", price: 57.99, description: "2 Party Pizzas with 3 Toppings each", image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=800&q=80", imageAlt: "Two giant party pizzas for a crowd", badge: "For a Crowd", group: "bundle", sortOrder: 5 },
  { title: "Traditional Royal Special", price: 49.99, description: "1 Large Royal Special Pizza, 1 LB Wings, 1 Garlic Bread with Cheese, 2 Cans of Pop", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80", imageAlt: "Royal special pizza with wings and garlic bread", badge: "Fan Favourite", group: "combo", sortOrder: 6 },
  { title: "Royal Family Deal", price: 54.99, description: "2 Medium Pizzas with 3 Toppings each, 1 LB Wings, 4 Cans of Pop", image: "https://images.unsplash.com/photo-1555072956-7758afb20e8f?w=800&q=80", imageAlt: "Family deal with pizzas and wings", badge: "Family Pick", group: "combo", sortOrder: 7 },
  { title: "Royal Get-Together", price: 49.99, description: "2 Large Pizzas with 3 Toppings each, 2-liter Coke", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1170&auto=format&fit=crop", imageAlt: "Two large pizzas and a bottle of Coke", group: "combo", sortOrder: 8 },
  { title: "Royal Game Special", price: 99.99, description: "2 Extra Large Pizzas 3 Toppings each, 2 LB Wings, 2 Fries, 2-liter Coke", image: "https://images.unsplash.com/photo-1593504049359-74330189a345?q=80&w=627&auto=format&fit=crop", imageAlt: "Two large pizzas and wings game night special", group: "combo", sortOrder: 9 },
  { title: "Royal Party Special", price: 109.99, description: "2 Party Size Pizzas with 3 Toppings each, 2 LB Wings, 2 Garlic Breads with Cheese, 2-litre Coke", image: "https://images.unsplash.com/photo-1613564834361-9436948817d1?q=80&w=743&auto=format&fit=crop", imageAlt: "Party special with pizzas, wings and garlic bread", group: "combo", sortOrder: 10 },
  { title: "Royal Kids Special", price: 21.99, description: "Small Pizza with 2 Toppings, 1 Fries, and a Can of Pop", image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=1170&auto=format&fit=crop", imageAlt: "Kids special pizza with fries", group: "combo", sortOrder: 11 },
  { title: "Medium Pizza with Wings", price: 34.99, description: "Medium Pizza with 3 Toppings, 1 LB Wings, and 2 Cans of Pop", image: "https://images.unsplash.com/photo-1682264788192-9abdec90c425?q=80&w=1974&auto=format&fit=crop", imageAlt: "Medium pizza with wings deal", group: "combo", sortOrder: 12 },
  { title: "Royal Sub Special", price: 12.93, description: "Any Non-Super Sub with a Pop", image: "https://images.unsplash.com/photo-1669895616443-5d21d5acc6e0?q=80&w=1025&auto=format&fit=crop", imageAlt: "Royal sub special", group: "combo", sortOrder: 13 },
  { title: "2 Baked Lasagnas", price: 29.99, description: "2 Baked Lasagnas with 2 Cans of Pop", image: "https://images.unsplash.com/photo-1619895092538-128341789043?q=80&w=1025&auto=format&fit=crop", imageAlt: "Two baked lasagnas", group: "combo", sortOrder: 14 },
  { title: "2 Baked Spaghettis", price: 29.99, description: "2 Baked Spaghettis with 2 Cans of Pop", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=687&auto=format&fit=crop", imageAlt: "Two baked spaghettis", group: "combo", sortOrder: 15 },
];

async function seedDeals() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");

    const dealCount = await Deal.countDocuments();

    if (dealCount === 0) {
      await Deal.insertMany(SEED_DEALS);
      console.log(`🎉 Seeded ${SEED_DEALS.length} deals`);
    } else {
      console.log(`⚠️ Deals already exist (${dealCount}) — skipping seed.`);
    }

    console.log("\n✅ Deal seed complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Deal seed failed:", err);
    process.exit(1);
  }
}

seedDeals();
