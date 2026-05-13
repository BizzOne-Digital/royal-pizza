require("dotenv").config();
const mongoose = require("mongoose");

const Admin = require("./models/Admin");
const MenuItem = require("./models/MenuItem");
const Order = require("./models/Order");

// ✅ MongoDB Atlas URI
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://bizzone:bizzone@cluster0.bwpdzae.mongodb.net/royal-pizza?retryWrites=true&w=majority&appName=Cluster0";

const SEED_MENU = [
  // Pizzas
  {
    name: "Royal Special",
    category: "pizza",
    price: 24.93,
    description:
      "Pepperoni, Mushrooms, Green Peppers, Onions, Black Olives, Tomatoes",
    available: true,
    featured: true,
  },
  {
    name: "Majestic BBQ Chicken",
    category: "pizza",
    price: 22.93,
    description:
      "BBQ Sauce, Grilled Chicken, Red Onions, Mozzarella, Cheddar",
    available: true,
    featured: true,
  },
  {
    name: "Canadian Pizza",
    category: "pizza",
    price: 21.93,
    description: "Pepperoni, Mushrooms, Bacon, Mozzarella",
    available: true,
  },
  {
    name: "Hawaiian King",
    category: "pizza",
    price: 20.93,
    description: "Ham, Pineapple, Mozzarella, Tomato Sauce",
    available: true,
  },
  {
    name: "Vegetarian Garden",
    category: "pizza",
    price: 19.93,
    description:
      "Bell Peppers, Mushrooms, Onions, Olives, Tomatoes, Mozzarella",
    available: true,
  },

  // Subs
  {
    name: "Super Chicken Sub",
    category: "sub",
    price: 15.93,
    description: "Cheese, Lettuce, Tomato, Mayonnaise, Chicken",
    available: true,
  },
  {
    name: "Super Assorted Sub",
    category: "sub",
    price: 13.93,
    description: "Salami, Ham, Cheese, Lettuce, Tomatoes, Onions",
    available: true,
  },
  {
    name: "Meatball Sub",
    category: "sub",
    price: 12.93,
    description: "Meatballs, Marinara, Mozzarella",
    available: true,
  },

  // Wings
  {
    name: "Wings (10 pc)",
    category: "wings",
    price: 16.93,
    description: "Choice of sauce: Hot, BBQ, Honey Garlic, Plain",
    available: true,
  },
  {
    name: "Wings (20 pc)",
    category: "wings",
    price: 29.93,
    description: "Choice of sauce: Hot, BBQ, Honey Garlic, Plain",
    available: true,
  },

  // Pasta
  {
    name: "Penne Arrabiata",
    category: "pasta",
    price: 13.93,
    description: "Penne pasta with spicy tomato sauce",
    available: true,
  },
  {
    name: "Fettuccine Alfredo",
    category: "pasta",
    price: 14.93,
    description: "Creamy white sauce, parmesan",
    available: true,
  },

  // Sides
  {
    name: "Garlic Bread",
    category: "sides",
    price: 5.99,
    description: "Toasted garlic bread with herbs",
    available: true,
  },
  {
    name: "Caesar Salad",
    category: "sides",
    price: 8.93,
    description: "Romaine, croutons, parmesan, caesar dressing",
    available: true,
  },

  // Desserts
  {
    name: "Chocolate Lava Cake",
    category: "desserts",
    price: 6.99,
    description: "Warm chocolate cake with vanilla ice cream",
    available: true,
  },
  {
    name: "Tiramisu",
    category: "desserts",
    price: 6.99,
    description: "Classic Italian coffee dessert",
    available: true,
  },
];

const SEED_ORDERS = [
  {
    customer: {
      name: "Ahmed Khan",
      phone: "(905) 555-0101",
      email: "ahmed@example.com",
    },
    items: [
      {
        itemId: "royal-special",
        name: "Royal Special",
        category: "pizza",
        size: 'L (14")',
        price: 24.93,
        quantity: 1,
      },
      {
        itemId: "super-chicken-sub",
        name: "Super Chicken Sub",
        category: "sub",
        price: 15.93,
        quantity: 2,
      },
    ],
    orderType: "pickup",
    paymentMethod: "cash",
    notes: "Extra napkins please",
    subtotal: 56.79,
    tax: 7.38,
    total: 64.17,
    status: "delivered",
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("✅ Connected to MongoDB Atlas");

    // Admin user
    const existing = await Admin.findOne({
      email: process.env.ADMIN_EMAIL || "admin@royalpizza.com",
    });

    if (!existing) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL || "admin@royalpizza.com",
        password: process.env.ADMIN_PASSWORD || "admin123",
        name: "Admin",
        role: "admin",
      });

      console.log("👑 Admin user created");
    } else {
      console.log("⚠️ Admin already exists");
    }

    // Menu items
    const menuCount = await MenuItem.countDocuments();

    if (menuCount === 0) {
      await MenuItem.insertMany(SEED_MENU);

      console.log(`🍕 Seeded ${SEED_MENU.length} menu items`);
    } else {
      console.log(`⚠️ Menu already has ${menuCount} items`);
    }

    // Orders
    const orderCount = await Order.countDocuments();

    if (orderCount === 0) {
      await Order.insertMany(SEED_ORDERS);

      console.log(`🧾 Seeded ${SEED_ORDERS.length} orders`);
    } else {
      console.log(`⚠️ Orders already exist (${orderCount})`);
    }

    console.log("\n✅ Seed complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
}

seed();