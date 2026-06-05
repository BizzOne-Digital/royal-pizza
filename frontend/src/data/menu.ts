/**
 * Central source for menu, deals, and site facts.
 * Update prices and copy here only.
 * Updated from The Royal Menu (xlsx) — May 2026
 */

export const SITE = {
  name: "The Royal Pizzeria and Bar",
  shortName: "Royal Pizza and Subs",
  orderUrl: "#",
  phones: [
    { label: "Call", href: "tel:+19058772277", display: "(905) 877-2277" },
    { label: "Call", href: "tel:+19058772278", display: "(905) 877-2278" },
  ],
  address: {
    street: "134 Guelph Street",
    cityLine: "Georgetown, Ontario L7G 4A5",
    country: "Canada",
    full: "134 Guelph Street, Georgetown, Ontario L7G 4A5, Canada",
    mapsQuery: "134 Guelph Street, Georgetown, Ontario L7G 4A5",
  },
  hours: "Mon–Tue 3PM–10PM · Wed–Thu 12PM–11PM · Fri–Sat 12PM–1AM · Sun 12PM–11PM",
  hoursDetailed: [
    { day: "Monday",    open: "3:00 PM",  close: "10:00 PM" },
    { day: "Tuesday",   open: "3:00 PM",  close: "10:00 PM" },
    { day: "Wednesday", open: "12:00 PM", close: "11:00 PM" },
    { day: "Thursday",  open: "12:00 PM", close: "11:00 PM" },
    { day: "Friday",    open: "12:00 PM", close: "1:00 AM"  },
    { day: "Saturday",  open: "12:00 PM", close: "1:00 AM"  },
    { day: "Sunday",    open: "12:00 PM", close: "11:00 PM" },
  ],
  established: 1973,
} as const;

// ─── SHARED TYPES ──────────────────────────────────────────────────────────────

export type PizzaPrices = {
  S: number;   // Small
  M: number;   // Medium
  L: number;   // Large
  XL: number;  // Jumbo
  P: number;   // Party
};

export type SimpleMenuItem = {
  id: string;
  name: string;
  price?: number;
  description?: string;
  note?: string;
  prices?: { label: string; amount: number }[];
};

// ─── STARTERS ──────────────────────────────────────────────────────────────────

export const STARTERS: SimpleMenuItem[] = [
  {
    id: "mozz-sticks",
    name: "Mozzarella Sticks",
    price: 9.93,
    description: "Served with marinara sauce",
  },
  {
    id: "jal-poppers",
    name: "Jalapeño Poppers",
    price: 9.93,
    description: "Cream cheese filled jalapeños served with ranch",
  },
  {
    id: "popcorn-shrimp",
    name: "Crispy Popcorn Shrimp",
    price: 12.93,
    description: "Served with cocktail sauce",
  },
  {
    id: "chicken-tenders-starter",
    name: "Chicken Tenders",
    price: 15.93,
    description: "Served with Fries and Plum sauce",
  },
  {
    id: "garlic-bread-cheese",
    name: "Garlic Bread with Cheese",
    price: 6.93,
    description: "Add Bacon +$2",
  },
  {
    id: "bruschetta-starter",
    name: "Bruschetta",
    price: 10.93,
    description: "Toasted garlic bread topped with tomato bruschetta mix, parmesan",
  },
  {
    id: "spinach-dip",
    name: "Spinach Dip",
    price: 14.93,
    description: "Creamy spinach dip served with tortilla chips & Naan Bread",
  },
  {
    id: "royal-nachos",
    name: "Royal Nachos",
    price: 14.93,
    description: "Loaded with cheese, tomatoes, onions, jalapeños & green peppers (Add Chicken or Beef)",
  },
];

// ─── SIDES ─────────────────────────────────────────────────────────────────────

export const SIDES: SimpleMenuItem[] = [
  { id: "fries", name: "Crispy Fries", price: 6.93, note: "Large +$2" },
  { id: "rings", name: "Onion Rings", price: 8.93, note: "Large +$2" },
  { id: "wedges", name: "Seasoned Potato Wedges", price: 8.93, note: "Large +$2" },
];

// ─── WINGS ─────────────────────────────────────────────────────────────────────

export const WINGS: SimpleMenuItem[] = [
  {
    id: "w1",
    name: "1 LB Wings (8–10 Wings/LB)",
    price: 15.93,
    description: "1 Sauce of Choice",
  },
  {
    id: "w2",
    name: "2 LB Wings (8–10 Wings/LB)",
    price: 27.93,
    description: "1 Sauce of Choice",
  },
  {
    id: "w3",
    name: "3 LB Wings (8–10 Wings/LB)",
    price: 40.93,
    description: "2 Sauces of Choice",
  },
  {
    id: "w5",
    name: "5 LB Wings (8–10 Wings/LB)",
    price: 62.93,
    description: "3 Sauces of Choice",
  },
];

export const WING_SAUCES =
  "Hot, Medium, Mild, BBQ, Honey Garlic, Hot Honey, Sweet Chilli, Hot Honey Garlic";

// ─── SALADS ────────────────────────────────────────────────────────────────────

export const SALADS: SimpleMenuItem[] = [
  {
    id: "caesar",
    name: "Caesar Salad",
    description: "Romaine Lettuce, Bacon, Caesar Dressing, Croutons",
    note: "$2 for Large",
    prices: [
      { label: "Regular", amount: 11.93 },
      { label: "Large", amount: 13.93 },
    ],
  },
  {
    id: "greek",
    name: "Greek Salad",
    description: "Round Lettuce, Tomatoes, Onions, Black Olives, Greek Dressing, Feta Cheese",
    note: "$2 for Large",
    prices: [
      { label: "Regular", amount: 11.93 },
      { label: "Large", amount: 13.93 },
    ],
  },
  {
    id: "garden",
    name: "Garden Salad",
    description: "Romaine Lettuce, Onions, Carrots, Cucumbers, Tomatoes, Italian Dressing, A little Honey Mustard",
    note: "$2 for Large",
    prices: [
      { label: "Regular", amount: 11.93 },
      { label: "Large", amount: 13.93 },
    ],
  },
];

// ─── CLASSIC PIZZAS ────────────────────────────────────────────────────────────

export type SpecialtyPizza = {
  id: string;
  name: string;
  startingAt: number;
  sauce: string;
  toppings: string;
  drizzle?: string;
  choiceOfDrizzle?: string;
  prices: PizzaPrices;
};

export const PIZZA_SIZE_LEGEND =
  "Small · Medium · Large · Jumbo · Party";

export const SPECIALTY_PIZZAS: SpecialtyPizza[] = [
  {
    id: "royal-special",
    name: "Royal Special",
    startingAt: 16.93,
    sauce: "Tomato",
    toppings: "Pepperoni, Mushrooms, Green Peppers, Bacon & Extra Cheese",
    prices: { S: 16.93, M: 20.93, L: 24.93, XL: 28.93, P: 32.93 },
  },
  {
    id: "canadian",
    name: "Canadian",
    startingAt: 15.93,
    sauce: "Tomato",
    toppings: "Pepperoni, Mushrooms & Bacon",
    prices: { S: 15.93, M: 19.93, L: 23.93, XL: 27.93, P: 31.93 },
  },
  {
    id: "hockey",
    name: "Hockey",
    startingAt: 15.93,
    sauce: "Tomato",
    toppings: "Double Cheese, Double Pepperoni & Mushrooms",
    prices: { S: 15.93, M: 19.93, L: 23.93, XL: 27.93, P: 31.93 },
  },
  {
    id: "meat-lovers",
    name: "Meat Lovers",
    startingAt: 17.93,
    sauce: "Tomato",
    toppings: "Pepperoni, Ham, Sausage, Bacon & Beef",
    prices: { S: 17.93, M: 22.43, L: 26.93, XL: 31.43, P: 35.93 },
  },
  {
    id: "veggie-delight",
    name: "Veggie Delight",
    startingAt: 17.93,
    sauce: "Tomato",
    toppings: "Mushrooms, Onions, Green Peppers, Green Olives & Tomatoes",
    prices: { S: 17.93, M: 22.43, L: 26.93, XL: 31.43, P: 35.93 },
  },
  {
    id: "hawaiian",
    name: "Hawaiian",
    startingAt: 15.93,
    sauce: "Tomato",
    toppings: "Ham, Pineapple & Extra Cheese",
    prices: { S: 15.93, M: 19.93, L: 23.93, XL: 27.93, P: 31.93 },
  },
  {
    id: "greek-pizza",
    name: "Greek",
    startingAt: 16.93,
    sauce: "Tomato",
    toppings: "Onions, Tomatoes, Black Olives & Feta Cheese",
    prices: { S: 16.93, M: 20.93, L: 24.93, XL: 28.93, P: 32.93 },
  },
];

// ─── SIGNATURE PIZZAS ──────────────────────────────────────────────────────────

export type SignaturePizza = {
  id: string;
  name: string;
  toppings: string;
  prices: PizzaPrices;
};

export const SIGNATURE_PIZZAS: SignaturePizza[] = [
  {
    id: "vodka-sauce-pizza",
    name: "Vodka Sauce Pizza",
    toppings: "Vodka sauce, mozzarella, cup & char pepperoni, parmigiano, basil & hot honey drizzle",
    prices: { S: 16.93, M: 20.93, L: 24.93, XL: 28.93, P: 32.93 },
  },
  {
    id: "rosee-sauce-pizza",
    name: "Rosée Sauce Pizza",
    toppings: "Rosé sauce, mozzarella, Italian sausage, ricotta, parmesan & basil",
    prices: { S: 16.93, M: 20.93, L: 24.93, XL: 28.93, P: 32.93 },
  },
  {
    id: "spicy-italian-sig",
    name: "Spicy Italian",
    toppings: "Tomato sauce, mozzarella, calabrese salami, Green Peppers, banana peppers, chili flakes & hot honey",
    prices: { S: 17.93, M: 22.43, L: 26.93, XL: 31.43, P: 34.93 },
  },
  {
    id: "burrata-margherita",
    name: "Burrata Margherita",
    toppings: "Tomato sauce, Fresh mozzarella, burrata, basil & olive oil",
    prices: { S: 16.93, M: 21.43, L: 25.93, XL: 30.43, P: 34.93 },
  },
  {
    id: "truffle-mushroom",
    name: "Truffle Mushroom",
    toppings: "Roasted garlic cream sauce, mozzarella, roasted mushrooms, parmesan, truffle oil",
    prices: { S: 16.93, M: 21.43, L: 25.93, XL: 30.43, P: 34.93 },
  },
  {
    id: "creamy-garlic-chicken-sig",
    name: "Creamy Garlic Chicken",
    toppings: "Creamy garlic sauce, chicken, onions & Green Peppers - HOT or BBQ Drizzle on Top",
    prices: { S: 17.93, M: 22.43, L: 26.93, XL: 31.43, P: 35.93 },
  },
  {
    id: "bbq-chicken-sig",
    name: "BBQ Chicken",
    toppings: "BBQ sauce, chicken, onions & Green Peppers",
    prices: { S: 17.93, M: 22.43, L: 26.93, XL: 31.43, P: 35.93 },
  },
];

// ─── BUILD YOUR OWN PIZZA ──────────────────────────────────────────────────────

export const BUILD_YOUR_OWN_TIERS: {
  label: string;
  prices: PizzaPrices;
}[] = [
  { label: "Base (Mozza Cheese)", prices: { S: 12.93, M: 16.93, L: 20.93, XL: 24.93, P: 28.93 } },
];

export const BYO_TOPPING_PRICING = {
  firstFour: "$1 each (any size)",
  additional: "Small ($1) · Medium ($1.50) · Large ($2) · Jumbo ($2.50) · Party ($3)",
};

export const BYO_TOPPINGS = {
  sauces: [
    "Pizza Sauce",
    "Vodka Sauce",
    "Rosée Sauce",
    "Creamy Garlic",
    "Pesto Sauce",
    "BBQ Sauce",
  ],
  additionalCheeses: ["Feta", "Parmesan", "Cheddar"],
  vegetarian: [
    "Onions",
    "Green Peppers",
    "Black Olives",
    "Mushrooms",
    "Green Olives",
    "Hot Banana Pepper",
    "Roasted Red Pepper",
    "Jalapeño Pepper",
    "Pineapples",
    "Sweet Corn",
  ],
  nonVegetarian: [
    "Crispy Chicken (2 Toppings)",
    "Pepperoni",
    "Sausage",
    "Spicy Calabrese",
    "Ground Beef",
    "Ham",
    "Bacon bits",
    "Bacon Strips (2 Toppings)",
    "Crispy Veal",
    "Salami",
  ],
} as const;

export const BYO_EXTRAS: { name: string; prices: PizzaPrices }[] = [
  {
    name: "Different Sauce on Base (counts as 1 topping)",
    prices: { S: 1.0, M: 1.5, L: 2.0, XL: 2.5, P: 3.0 },
  },
  {
    name: "Additional Cheese (Feta / Parmesan / Cheddar — each counts as 1 topping)",
    prices: { S: 1.0, M: 1.5, L: 2.0, XL: 2.5, P: 3.0 },
  },
  {
    name: "Extra Cheese",
    prices: { S: 1.0, M: 1.5, L: 2.0, XL: 2.5, P: 3.0 },
  },
];

// ─── PASTAS ────────────────────────────────────────────────────────────────────

export const PASTAS: SimpleMenuItem[] = [
  {
    id: "marinara-spaghetti",
    name: "Marinara Spaghetti",
    price: 11.93,
    description: "Marinara Sauce, Spaghetti, Parmesan",
  },
  {
    id: "baked-lasagna",
    name: "Baked Lasagna",
    price: 14.93,
    description: "House baked lasagna topped with mozzarella & Pepperoni",
  },
  {
    id: "baked-ravioli",
    name: "Baked Ravioli",
    price: 15.93,
    description: "Marinara Sauce, Beef Ravioli, Mozzarella & Pepperoni",
  },
];

export const SIGNATURE_PASTAS: SimpleMenuItem[] = [
  {
    id: "royal-vodka-rigatoni",
    name: "Royal Vodka Rigatoni",
    price: 16.43,
    description: "Spicy and tangy vodka sauce, parmesan & bacon",
  },
  {
    id: "spicy-sausage-rigatoni",
    name: "Spicy Sausage Rigatoni",
    price: 16.43,
    description: "Rosé sauce, Italian sausage, chili flakes & parmesan",
  },
  {
    id: "mushroom-fettuccine",
    name: "Mushroom Fettuccine Alfredo",
    price: 14.93,
    description: "Creamy alfredo sauce, roasted mushrooms & parmesan",
  },
  {
    id: "chicken-veal-parm-spag",
    name: "Chicken Parm / Veal Parm Spaghetti",
    price: 17.93,
    description: "Marinara Sauce, Spaghetti, Crispy Chicken or Veal Cutlet, Mozzarella & Parmesan",
  },
];

export const PASTA_ADDONS: SimpleMenuItem[] = [
  { id: "pasta-meat", name: "Add Meat", price: 1.5 },
  { id: "pasta-meatballs", name: "Add Meatballs", price: 5.0 },
  { id: "pasta-side-meatballs", name: "Side Order of Meatballs", price: 7.0 },
];

export const BUILD_YOUR_OWN_PASTA = {
  startingAt: 11.93,
  pastas: ["Penne", "Rigatoni", "Spaghetti", "Fettuccine", "Ravioli (+$1)"],
  sauces: ["Marinara", "Rosé (+$2)", "Alfredo (+$2)", "Vodka (+$2)"],
  proteins: [
    "Crispy Chicken or Veal Cutlet (+$4)",
    "Beef, Sausage or Bacon (+$1.50)",
    "Meatballs (+$5)",
  ],
  wayToCook: [
    "Baked — Loaded with Mozzarella & Pepperoni (+$2)",
    "Just in Sauce (No Cheese)",
    "Topped with just Parmesan (+$1)",
    "Topped with Mozzarella and Parmesan (+$2)",
  ],
};

export const PASTA_EXTRAS: SimpleMenuItem[] = [
  { id: "dbl-cheese", name: "Double Cheese", price: 2.0 },
  { id: "ex-meatballs", name: "Extra Meatballs", price: 5.0 },
];

// ─── SUBS & SANDWICHES ─────────────────────────────────────────────────────────

export const SANDWICHES: SimpleMenuItem[] = [
  {
    id: "crispy-chicken-sandwich",
    name: "Crispy Chicken Sandwich",
    price: 15.93,
    description: "Brioche Bun, Crispy chicken, Swiss Cheese, lettuce, tomato, pickles & royal sauce",
    note: "Comes with a choice of Side (Fries, Onion Rings or Wedges)",
  },
  {
    id: "brisket-sandwich",
    name: "Brisket Sandwich",
    price: 15.93,
    description: "Brioche Bun, Slow smoked brisket, Sautéed onions & Mushrooms, cheddar & Hot Honey BBQ",
    note: "Comes with a choice of Side (Fries, Onion Rings or Wedges)",
  },
  {
    id: "veal-sandwich",
    name: "Veal Sandwich",
    price: 15.93,
    description: "Brioche Bun, Breaded veal, Marinara Sauce & Swiss Cheese",
    note: "Comes with a choice of Side (Fries, Onion Rings or Wedges)",
  },
];

export const SUBS: SimpleMenuItem[] = [
  {
    id: "super-assorted",
    name: "Super Assorted Sub",
    price: 13.93,
    description: "Sub Bread Foot Long, Cheese, Lettuce, Tomatoes, Onions, Ham, Salami, Italian Dressing & Sub Sauce",
  },
  {
    id: "meatball-sub",
    name: "Meatball Sub",
    price: 13.93,
    description: "Sub Bread Foot Long, Cheese, Meatballs & Marinara Sauce",
  },
  {
    id: "rib-sub",
    name: "Rib Sub",
    price: 14.93,
    description: "Sub Bread Foot Long, Cheese, Ribs & BBQ Sauce",
  },
  {
    id: "club-sub",
    name: "Club Sub",
    price: 13.93,
    description: "Sub Bread Foot Long, Cheese, Lettuce, Tomatoes, Ham, Salami, Bacon Strips & Mayo",
  },
  {
    id: "blt",
    name: "BLT",
    price: 13.93,
    description: "Sub Bread Foot Long, Cheese, Lettuce, Tomatoes, Bacon Strips & Mayo",
  },
  {
    id: "philly-cheesesteak",
    name: "Philly Cheese Steak",
    price: 14.93,
    description: "Sub Bread Foot Long, Cheese, Steak, Sautéed Mushrooms, Green Peppers & Onions",
  },
];

export const SUB_EXTRAS: SimpleMenuItem[] = [
  { id: "ex-bacon", name: "Extra Bacon", price: 6.0 },
  { id: "ex-roast-corned", name: "Extra Roast or Corned Beef", price: 9.0 },
  { id: "ex-cheese-sub", name: "Extra Cheese", price: 1.0 },
];

// ─── GARLIC BREADS ─────────────────────────────────────────────────────────────

export const GARLIC_BREADS: SimpleMenuItem[] = [
  { id: "plain-gb", name: "Plain Garlic Bread", price: 2.93 },
  { id: "gb-cheese", name: "Garlic Bread with Cheese", price: 6.93 },
  { id: "gb-cheese-bacon", name: "Garlic Bread with Cheese and Bacon", price: 8.93 },
  {
    id: "bruschetta",
    name: "Bruschetta Bread with Bacon",
    price: 10.93,
  },
  {
    id: "chilli-sticks",
    name: "Chilli Garlic Cheese Bread Sticks",
    price: 10.93,
  },
  {
    id: "pesto-sticks",
    name: "Pesto Cheese Garlic Bread Sticks",
    price: 10.93,
  },
];

// ─── DESSERTS ─────────────────────────────────────────────────────────────────

export const DESSERTS: SimpleMenuItem[] = [
  { id: "brownies", name: "Pack of Brownies", price: 2.99 },
  { id: "tiramisu", name: "Tiramisu", price: 11.93 },
  { id: "lava", name: "Choco Lava Cake", price: 11.93 },
];

// ─── DRINKS & DIPS ─────────────────────────────────────────────────────────────

export const DIPS_LIST =
  "Creamy Garlic, Jalapeño Cheddar, Hot, Honey Garlic, BBQ, Mild, Medium — $1 each";

export const BEVERAGES_LIST =
  "Coke, Diet Coke, Coke Zero, Ginger Ale, Ginger Ale Zero, Sprite, Nestea, Root Beer — $1.99 each";

// ─── PIZZA DEALS ───────────────────────────────────────────────────────────────

export type PizzaDeal = {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  imageAlt: string;
  badge?: string;
};

export const PIZZA_DEALS: PizzaDeal[] = [
  {
    id: "d2s",
    title: "2 Small Pizzas",
    price: 27.49,
    description: "2 Small Pizzas with 3 Toppings each",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80",
    imageAlt: "Two small stone-baked pizzas fresh from the oven",
  },
  {
    id: "d2m",
    title: "2 Medium Pizzas",
    price: 33.99,
    description: "2 Medium Pizzas with 3 Toppings each",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    imageAlt: "Two medium pizzas with fresh toppings",
    badge: "Popular",
  },
  {
    id: "d2l",
    title: "2 Large Pizzas",
    price: 42.99,
    description: "2 Large Pizzas with 3 Toppings each",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80",
    imageAlt: "Two large pizzas loaded with toppings",
    badge: "Best Value",
  },
  {
    id: "d2j",
    title: "2 Jumbo Pizzas",
    price: 49.99,
    description: "2 Jumbo Pizzas with 3 Toppings each",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    imageAlt: "Two jumbo-sized pizzas for the whole table",
  },
  {
    id: "d2p",
    title: "2 Party Pizzas",
    price: 57.99,
    description: "2 Party Pizzas with 3 Toppings each",
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=800&q=80",
    imageAlt: "Two giant party pizzas for a crowd",
    badge: "For a Crowd",
  },
  {
    id: "traditional",
    title: "Traditional Royal Special",
    price: 49.99,
    description: "1 Large Royal Special Pizza, 1 LB Wings, 1 Garlic Bread with Cheese, 2 Cans of Pop",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
    imageAlt: "Royal special pizza with wings and garlic bread",
    badge: "Fan Favourite",
  },
  {
    id: "family",
    title: "Royal Family Deal",
    price: 54.99,
    description: "2 Medium Pizzas with 3 Toppings each, 1 LB Wings, 4 Cans of Pop",
    image: "https://images.unsplash.com/photo-1555072956-7758afb20e8f?w=800&q=80",
    imageAlt: "Family deal with pizzas and wings",
    badge: "Family Pick",
  },
  {
    id: "get-together",
    title: "Royal Get-Together",
    price: 49.99,
    description: "2 Large Pizzas with 3 Toppings each, 2-liter Coke",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1170&auto=format&fit=crop",
    imageAlt: "Two large pizzas and a bottle of Coke",
  },
  {
    id: "game",
    title: "Royal Game Special",
    price: 99.99,
    description: "2 Extra Large Pizzas 3 Toppings each, 2 LB Wings, 2 Fries, 2-liter Coke",
    image: "https://images.unsplash.com/photo-1593504049359-74330189a345?q=80&w=627&auto=format&fit=crop",
    imageAlt: "Two large pizzas and wings game night special",
  },
  {
    id: "party",
    title: "Royal Party Special",
    price: 109.99,
    description: "2 Party Size Pizzas with 3 Toppings each, 2 LB Wings, 2 Garlic Breads with Cheese, 2-litre Coke",
    image: "https://images.unsplash.com/photo-1613564834361-9436948817d1?q=80&w=743&auto=format&fit=crop",
    imageAlt: "Party special with pizzas, wings and garlic bread",
  },
  {
    id: "kids",
    title: "Royal Kids Special",
    price: 21.99,
    description: "Small Pizza with 2 Toppings, 1 Fries, and a Can of Pop",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=1170&auto=format&fit=crop",
    imageAlt: "Kids special pizza with fries",
  },
  {
    id: "med-wings",
    title: "Medium Pizza with Wings",
    price: 34.99,
    description: "Medium Pizza with 3 Toppings, 1 LB Wings, and 2 Cans of Pop",
    image: "https://images.unsplash.com/photo-1682264788192-9abdec90c425?q=80&w=1974&auto=format&fit=crop",
    imageAlt: "Medium pizza with wings deal",
  },
  {
    id: "sub-special",
    title: "Royal Sub Special",
    price: 12.93,
    description: "Any Non-Super Sub with a Pop",
    image: "https://images.unsplash.com/photo-1669895616443-5d21d5acc6e0?q=80&w=1025&auto=format&fit=crop",
    imageAlt: "Royal sub special",
  },
  {
    id: "2lasagna",
    title: "2 Baked Lasagnas",
    price: 29.99,
    description: "2 Baked Lasagnas with 2 Cans of Pop",
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=1025&auto=format&fit=crop",
    imageAlt: "Two baked lasagnas",
  },
  {
    id: "2spag",
    title: "2 Baked Spaghettis",
    price: 29.99,
    description: "2 Baked Spaghettis with 2 Cans of Pop",
    image: "https://images.unsplash.com/photo-1606152196365-d1ce5ea838b5?q=80&w=687&auto=format&fit=crop",
    imageAlt: "Two baked spaghettis",
  },
];

// ─── WHY SECTIONS ──────────────────────────────────────────────────────────────

export type WhySection = {
  id: string;
  title: string;
  body: string;
};

export const WHY_SECTIONS: WhySection[] = [
  {
    id: "stone",
    title: "Stone-Baked Taste",
    body: "Authentic Italian-inspired pizzas baked on stone for a crisp base and balanced finish in every slice.",
  },
  {
    id: "simplicity",
    title: "Real Italian Simplicity",
    body: "No overcomplication, just traditional-style preparation focused on flavour, balance, and consistency.",
  },
  {
    id: "fresh",
    title: "Fresh, Every Order",
    body: "Prepared after you order, ensuring every pizza, sub, and pasta arrives fresh and properly made.",
  },
  {
    id: "appetite",
    title: "Built for True Appetite",
    body: "Portions designed to satisfy — not light servings, but real meals made to fill the table.",
  },
  {
    id: "flavour",
    title: "Flavour That Stays True",
    body: "Consistent perfect taste every time: no variation, no shortcuts, just dependable quality.",
  },
  {
    id: "share",
    title: "Made to Share",
    body: "Ideal for family meals, group orders, and everyday dining where variety and value matter.",
  },
  {
    id: "standard",
    title: "Italian-Inspired Standard",
    body: "A kitchen approach rooted in classic techniques, adapted for everyday local dining.",
  },
];

export type ComparisonRow = {
  label: string;
  royal: string;
  chain: string;
};

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    label: "Your first bite",
    royal: "Bold, fresh, made-to-order flavour",
    chain: "Standardized taste with less freshness",
  },
  {
    label: "Your options",
    royal: "Full menu: pizza, subs, wings, pastas & more",
    chain: "Mostly pizza-only choices",
  },
  {
    label: "Feeding a group",
    royal: "Bundle deals that actually make sense",
    chain: "Individual items that add up fast",
  },
  {
    label: "Customizing",
    royal: "Built your way, no shortcuts",
    chain: "Restricted choices and limited flexibility",
  },
  {
    label: "The experience",
    royal: "A place with history, people, and pride",
    chain: "Just another quick transaction",
  },
];

// ─── NAVIGATION / HOME ─────────────────────────────────────────────────────────

export const HOME_FEATURED_CATEGORIES = [
  { id: "pizzas", label: "Authentic Pizzas", href: "/menu?category=pizzas" },
  { id: "subs", label: "Toasted Subs & Sandwiches", href: "/menu?category=subs" },
  { id: "wings", label: "Saucy Wings", href: "/menu?category=wings" },
  { id: "pastas", label: "Creamy Pastas", href: "/menu?category=pastas" },
  { id: "starters", label: "Starters & Sides", href: "/menu?category=starters" },
  { id: "salads", label: "Fresh Salads", href: "/menu?category=salads" },
  { id: "garlic", label: "Oven-Baked Garlic Breads", href: "/menu?category=garlic-breads" },
  { id: "drinks", label: "Drinks & Dips", href: "/menu?category=drinks-dips" },
] as const;

export type MenuCategoryId =
  | "starters"
  | "pizzas"
  | "signature-pizzas"
  | "build-your-own"
  | "subs"
  | "pastas"
  | "wings"
  | "salads"
  | "sides";

export const MENU_CATEGORY_TABS: { id: MenuCategoryId; label: string }[] = [
  { id: "starters", label: "Starters" },
  { id: "pizzas", label: "Classic Pizzas" },
  { id: "signature-pizzas", label: "Signature Pizzas" },
  { id: "build-your-own", label: "Build Your Own Pizza" },
  { id: "subs", label: "Subs & Sandwiches" },
  { id: "pastas", label: "Pastas" },
  { id: "wings", label: "Wings" },
  { id: "salads", label: "Salads" },
  { id: "sides", label: "Sides" },
];