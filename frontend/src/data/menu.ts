/**
 * Central source for menu, deals, and site facts.
 * Update prices and copy here only.
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
  hours: "11:00 a.m. – 11:00 p.m.",
  established: 1973,
} as const;

export type PizzaPrices = {
  S: number;
  M: number;
  L: number;
  XL: number;
  P: number;
};

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
  "S = 10\" / 6 slices · M = 12\" / 8 slices · L = 14\" / 10 slices · XL = 16\" / 12 slices · P = 18\" / 14 slices";

export const SPECIALTY_PIZZAS: SpecialtyPizza[] = [
  {
    id: "royal-special",
    name: "Royal Special",
    startingAt: 16.93,
    sauce: "Tomato",
    toppings:
      "Double Mozzarella cheese, Pepperoni, Mushrooms, Bacon & Green peppers",
    prices: { S: 16.93, M: 20.93, L: 24.93, XL: 28.93, P: 32.93 },
  },
  {
    id: "royal-cheese",
    name: "The Royal Cheese",
    startingAt: 12.93,
    sauce: "Tomato",
    toppings: "Mozzarella cheese",
    prices: { S: 12.93, M: 16.93, L: 20.93, XL: 24.93, P: 28.93 },
  },
  {
    id: "royal-pepperoni",
    name: "The Royal Pepperoni",
    startingAt: 13.93,
    sauce: "Tomato",
    toppings: "Mozzarella cheese & Pepperoni",
    prices: { S: 13.93, M: 17.93, L: 21.93, XL: 25.93, P: 29.93 },
  },
  {
    id: "hawaiian-king",
    name: "Hawaiian King",
    startingAt: 15.93,
    sauce: "Tomato",
    toppings: "Double Mozzarella cheese, Ham & Pineapple",
    prices: { S: 15.93, M: 19.93, L: 23.93, XL: 27.93, P: 31.93 },
  },
  {
    id: "spicy-italian",
    name: "Spicy Italian",
    startingAt: 15.93,
    sauce: "Tomato",
    toppings: "Mozzarella cheese, Hot Italian Sausage, Onions & Green Pepper",
    drizzle: "Hot",
    prices: { S: 15.93, M: 19.93, L: 23.93, XL: 27.93, P: 31.93 },
  },
  {
    id: "canadian",
    name: "Canadian Pizza",
    startingAt: 15.93,
    sauce: "Tomato",
    toppings: "Mozzarella cheese, Pepperoni, Mushrooms & Bacon",
    prices: { S: 15.93, M: 19.93, L: 23.93, XL: 27.93, P: 31.93 },
  },
  {
    id: "bbq-chicken",
    name: "Majestic BBQ Chicken",
    startingAt: 16.93,
    sauce: "BBQ",
    toppings: "Mozzarella cheese, Crispy chicken, Onions & Green Peppers",
    prices: { S: 16.93, M: 20.93, L: 24.93, XL: 28.93, P: 32.93 },
  },
  {
    id: "garlic-chicken",
    name: "Garlic Chicken Delight",
    startingAt: 16.93,
    sauce: "Creamy Garlic",
    toppings: "Mozzarella cheese, Crispy chicken, Onions & Green Pepper",
    choiceOfDrizzle: "Hot or BBQ",
    prices: { S: 16.93, M: 21.93, L: 25.93, XL: 29.93, P: 33.93 },
  },
  {
    id: "four-cheese",
    name: "Four Cheese Delight",
    startingAt: 16.93,
    sauce: "Tomato",
    toppings: "Mozzarella, Cheddar, Parmesan & Feta Cheese",
    prices: { S: 16.93, M: 20.93, L: 24.93, XL: 28.93, P: 32.93 },
  },
  {
    id: "hockey",
    name: "Hockey Pizza",
    startingAt: 17.93,
    sauce: "Tomato",
    toppings: "Double Mozzarella cheese, Double Pepperoni & Mushrooms",
    prices: { S: 17.93, M: 22.93, L: 26.93, XL: 30.93, P: 35.93 },
  },
  {
    id: "pesto-chicken",
    name: "Pesto Chicken",
    startingAt: 17.93,
    sauce: "Pesto",
    toppings: "Mozzarella cheese, Crispy chicken, Spinach, Red Peppers & Onions",
    prices: { S: 17.93, M: 22.93, L: 26.93, XL: 30.93, P: 35.93 },
  },
  {
    id: "veggie-delight",
    name: "Veggie Delight",
    startingAt: 17.93,
    sauce: "Tomato",
    toppings:
      "Mozzarella cheese, Mushrooms, Green Peppers, Onions, Tomatoes & Black Olives",
    prices: { S: 17.93, M: 22.93, L: 26.93, XL: 30.93, P: 35.93 },
  },
  {
    id: "med-veggie",
    name: "Mediterranean Veggie",
    startingAt: 17.93,
    sauce: "Tomato",
    toppings:
      "Mozzarella cheese, Feta cheese, Black Olive, Onion, Sun-Dried Tomato & Spinach",
    prices: { S: 17.93, M: 22.93, L: 26.93, XL: 30.93, P: 35.93 },
  },
  {
    id: "meat-lovers",
    name: "Meat Lovers' Dream",
    startingAt: 16.93,
    sauce: "Tomato",
    toppings: "Mozzarella cheese, Pepperoni, Sausage, Bacon, Ham & Beef",
    prices: { S: 16.93, M: 20.93, L: 24.93, XL: 28.93, P: 32.93 },
  },
  {
    id: "greek",
    name: "Greek Pizza",
    startingAt: 16.93,
    sauce: "Tomato",
    toppings: "Mozzarella cheese, Black Olives, Onions, Tomatoes & Feta Cheese",
    prices: { S: 16.93, M: 20.93, L: 24.93, XL: 28.93, P: 32.93 },
  },
];

export const BUILD_YOUR_OWN_TIERS: {
  label: string;
  prices: PizzaPrices;
}[] = [
  { label: "Cheese Only", prices: { S: 12.93, M: 17.0, L: 20.93, XL: 24.93, P: 28.93 } },
  { label: "1 Topping", prices: { S: 13.93, M: 18.0, L: 21.93, XL: 25.93, P: 29.93 } },
  { label: "2 Toppings", prices: { S: 14.93, M: 19.0, L: 22.93, XL: 26.93, P: 30.93 } },
  { label: "3 Toppings", prices: { S: 15.93, M: 20.0, L: 23.93, XL: 27.93, P: 31.93 } },
  { label: "4 Toppings", prices: { S: 16.93, M: 21.0, L: 24.93, XL: 28.93, P: 32.93 } },
];

export const BYO_TOPPINGS = {
  sauces: [
    "Pizza Sauce",
    "Creamy Garlic",
    "Hot Sauce",
    "Pesto Sauce",
    "BBQ Sauce",
  ],
  additionalCheeses: ["Feta", "Cheddar", "Parmesan"],
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
    "Crispy Chicken",
    "Pepperoni",
    "Sausage",
    "Ground Beef",
    "Ham",
    "Bacon",
    "Crispy Veal",
    "Roast Beef",
    "Corned Beef",
    "Salami",
  ],
} as const;

export const BYO_EXTRAS: { name: string; prices: PizzaPrices }[] = [
  {
    name: "Different Sauce on Base",
    prices: { S: 1.0, M: 1.5, L: 2.0, XL: 2.5, P: 3.0 },
  },
  {
    name: "Additional Toppings",
    prices: { S: 1.0, M: 1.5, L: 2.0, XL: 2.5, P: 3.0 },
  },
  {
    name: "Extra Cheese",
    prices: { S: 1.5, M: 2.0, L: 2.5, XL: 3.0, P: 4.0 },
  },
  {
    name: "Drizzle on Top",
    prices: { S: 0.5, M: 1.0, L: 1.5, XL: 2.0, P: 2.5 },
  },
];

export type SimpleMenuItem = {
  id: string;
  name: string;
  price?: number;
  description?: string;
  prices?: { label: string; amount: number }[];
};

export const SUBS: SimpleMenuItem[] = [
  {
    id: "super-chicken",
    name: "Super Chicken Sub",
    price: 15.93,
    description: "Cheese, Lettuce, Tomato, Mayonnaise, Chicken",
  },
  {
    id: "super-assorted",
    name: "Super Assorted Sub",
    price: 13.93,
    description:
      "Cheese, Lettuce, Tomatoes, Onions, Sub Sauce, Italian Sauce, Salami, Ham, Extra Salami, Extra Ham",
  },
  {
    id: "rib",
    name: "Rib Sub",
    price: 13.93,
    description:
      "Cheese, Lettuce, Tomato, Sub Sauce, Italian Sauce, Onions, Salami & Ham",
  },
  {
    id: "salami",
    name: "Salami Sub",
    price: 12.93,
    description: "Cheese, Lettuce, Tomato, Onions, Sub Sauce, Salamis",
  },
  {
    id: "ham",
    name: "Ham Sub",
    price: 12.93,
    description: "Cheese, Lettuce, Sub Sauce, Italian Sauce, Ham",
  },
  {
    id: "blt",
    name: "BLT Sub",
    price: 13.93,
    description: "Cheese, Lettuce, Mayonnaise, Tomato & Bacon",
  },
  {
    id: "club",
    name: "Club Sub",
    price: 13.93,
    description:
      "Cheese, Lettuce, Mayonnaise, Tomato, Turkey, Bacon, Ham",
  },
  {
    id: "corned-beef",
    name: "Corned Beef Sub",
    price: 13.93,
    description: "Corned Beef, Mustard Sauce & Cheese",
  },
  {
    id: "roast-beef",
    name: "Roast Beef Sub",
    price: 13.93,
    description: "Roast Beef, Mustard Sauce & Cheese",
  },
  {
    id: "meatball",
    name: "Meatball Sub",
    price: 13.93,
    description: "Meatballs, Meat Sauce & Cheese",
  },
  {
    id: "pizza-sub",
    name: "Pizza Sub",
    price: 12.93,
    description: "Salami, Pizza Sauce, Onions & Cheese",
  },
  {
    id: "turkey",
    name: "Turkey Sub",
    price: 13.93,
    description: "Cheese, Lettuce, Tomato, Mayonnaise & Turkey",
  },
];

export const SUB_EXTRAS: SimpleMenuItem[] = [
  { id: "ex-bacon", name: "Extra Bacon", price: 6.0 },
  { id: "ex-roast-corned", name: "Extra Roast or Corned Beef", price: 9.0 },
  { id: "ex-cheese-sub", name: "Extra Cheese", price: 1.0 },
];

export const PASTAS: SimpleMenuItem[] = [
  { id: "spaghetti", name: "Spaghetti", price: 12.93 },
  { id: "spaghetti-meatball", name: "Spaghetti with Meatballs", price: 12.93 },
  { id: "rigatoni", name: "Rigatoni", price: 12.93 },
  { id: "lasagna", name: "Baked Lasagna", price: 13.93 },
  { id: "baked-spaghetti", name: "Baked Spaghetti", price: 13.93 },
  { id: "baked-rigatoni", name: "Baked Rigatoni", price: 13.93 },
  { id: "baked-ravioli", name: "Baked Ravioli", price: 14.93 },
  {
    id: "veal-parm",
    name: "Veal Parmesan with Spaghetti and Cheese",
    price: 15.93,
  },
  {
    id: "chicken-parm",
    name: "Chicken Parmesan with Spaghetti and Cheese",
    price: 17.93,
  },
];

export const PASTA_EXTRAS: SimpleMenuItem[] = [
  { id: "dbl-cheese", name: "Double Cheese", price: 2.0 },
  { id: "ex-meatballs", name: "Extra Meatballs", price: 5.0 },
];

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

export const WINGS: SimpleMenuItem[] = [
  {
    id: "w1",
    name: "1 Pound Wings with 1 Sauce of Choice",
    price: 14.93,
  },
  {
    id: "w2",
    name: "2 Pound Wings with 1 Sauce of Choice",
    price: 27.93,
  },
  {
    id: "w3",
    name: "3 Pound Wings with 2 Sauce of Choice",
    price: 40.93,
  },
  {
    id: "w5",
    name: "5 Pound Wings with 2 Sauce of Choice",
    price: 62.93,
  },
];

export const WING_SAUCES =
  "Hot, Medium, Mild, Buffalo, BBQ, Honey Garlic";

export const SALADS: SimpleMenuItem[] = [
  {
    id: "chef",
    name: "Chef Salad",
    description: "Iceberg Lettuce, Tomato, Italian Sauce",
    prices: [
      { label: "Medium", amount: 9.93 },
      { label: "Large", amount: 11.93 },
    ],
  },
  {
    id: "caesar",
    name: "Caesar Salad",
    description:
      "Romaine Lettuce, Creamy Caesar Dressing, Double-Smoked Bacon, Croutons, Parmesan Cheese",
    prices: [
      { label: "Medium", amount: 10.93 },
      { label: "Large", amount: 12.93 },
    ],
  },
  {
    id: "greek",
    name: "Greek Salad",
    description:
      "Iceberg Lettuce, Creamy Greek Dressing, Tomato, Black Olives, Feta Cheese",
    prices: [
      { label: "Medium", amount: 11.93 },
      { label: "Large", amount: 12.93 },
    ],
  },
];

export const SIDES: SimpleMenuItem[] = [
  { id: "fingers", name: "Chicken Fingers", price: 14.93 },
  { id: "rings", name: "Onion Rings", price: 7.93 },
  { id: "poppers", name: "Jalapeño Poppers", price: 8.93 },
  { id: "fries", name: "Fries", price: 6.93 },
  { id: "mozz", name: "Mozzarella Sticks", price: 8.93 },
];

export const DIPS_LIST =
  "Creamy Garlic, Jalapeño Cheddar, Hot, Honey Garlic, BBQ, Mild, Medium — $1 each";

export const BEVERAGES_LIST =
  "Coke, Diet Coke, Coke Zero, Ginger Ale, Ginger Ale Zero, Sprite, Nestea, Root Beer — $1.99 each";

export const DESSERTS: SimpleMenuItem[] = [
  { id: "brownies", name: "Pack of Brownies", price: 2.99 },
  { id: "tiramisu", name: "Tiramisu", price: 11.93 },
  { id: "lava", name: "Choco Lava Cake", price: 11.93 },
];

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
    description:
      "1 Large Royal Special Pizza, 1 LB Wings, 1 Garlic Bread with Cheese, 2 Cans of Pop",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
    imageAlt: "Royal special pizza with wings and garlic bread",
    badge: "Fan Favourite",
  },
  {
    id: "family",
    title: "Royal Family Deal",
    price: 54.99,
    description:
      "2 Medium Pizzas with 3 Toppings each, 1 LB Wings, 4 Cans of Pop",
    image: "https://images.unsplash.com/photo-1555072956-7758afb20e8f?w=800&q=80",
    imageAlt: "Family deal with pizzas and wings",
    badge: "Family Pick",
  },
  {
    id: "get-together",
    title: "Royal Get-Together",
    price: 49.99,
    description: "2 Large Pizzas with 3 Toppings each, 2-liter Coke",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Two large pizzas and a bottle of Coke",
  },
  {
    id: "game",
    title: "Royal Game Special",
    price: 99.99,
    description:
      "2 Extra Large Pizzas 3 Toppings each, 2 LB Wings, 2 Fries, 2-liter Coke",
       image: "https://images.unsplash.com/photo-1593504049359-74330189a345?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Two large pizzas and a bottle of Coke",
  },
  {
    id: "party",
    title: "Royal Party Special",
    price: 109.99,
    description:
      "2 Party Size Pizzas with 3 Toppings each, 2 LB Wings, 2 Garlic Breads with Cheese, 2-litre Coke",
       image: "https://images.unsplash.com/photo-1613564834361-9436948817d1?q=80&w=743&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Two large pizzas and a bottle of Coke",
  },
  {
    id: "kids",
    title: "Royal Kids Special",
    price: 21.99,
    description: "Small Pizza with 2 Toppings, 1 Fries, and a Can of Pop",
     image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Two large pizzas and a bottle of Coke",
  },
  {
    id: "med-wings",
    title: "Medium Pizza with Wings",
    price: 34.99,
    description: "Medium Pizza with 3 Toppings, 1 LB Wings, and 2 Cans of Pop",
     image: "https://images.unsplash.com/photo-1682264788192-9abdec90c425?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Two large pizzas and a bottle of Coke",
  },
  {
    id: "sub-special",
    title: "Royal Sub Special",
    price: 12.93,
    description: "Any Non-Super Sub with a Pop",
     image: "https://images.unsplash.com/photo-1669895616443-5d21d5acc6e0?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Two large pizzas and a bottle of Coke",
  },
  {
    id: "2lasagna",
    title: "2 Baked Lasagnas",
    price: 29.99,
    description: "2 Baked Lasagnas with 2 Cans of Pop",
     image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Two large pizzas and a bottle of Coke",
  },
  {
    id: "2spag",
    title: "2 Baked Spaghettis",
    price: 29.99,
    description: "2 Baked Spaghettis with 2 Cans of Pop",
     image: "https://images.unsplash.com/photo-1606152196365-d1ce5ea838b5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Two large pizzas and a bottle of Coke",
  },
];

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

export const HOME_FEATURED_CATEGORIES = [
  { id: "pizzas", label: "Authentic Pizzas", href: "/menu?category=pizzas" },
  { id: "subs", label: "Toasted Subs & Rolls", href: "/menu?category=subs" },
  { id: "wings", label: "Saucy Wings", href: "/menu?category=wings" },
  { id: "pastas", label: "Creamy Pastas", href: "/menu?category=pastas" },
  { id: "garlic", label: "Oven-Baked Garlic Breads", href: "/menu?category=garlic-breads" },
  { id: "salads", label: "Fresh Bowls of salads", href: "/menu?category=salads" },
  {
    id: "sides",
    label: "Sides & Desserts",
    href: "/menu?category=sides",
    
  },
   {
    id: "sides",
    label: "Drinks",
    href: "/menu?category=sides",
    
  },
  
] as const;

export type MenuCategoryId =
  | "pizzas"
  | "build-your-own"
  | "subs"
  | "pastas"
  | "garlic-breads"
  | "wings"
  | "salads"
  | "sides"
  | "desserts"
  | "drinks-dips";

export const MENU_CATEGORY_TABS: { id: MenuCategoryId; label: string }[] = [
  { id: "pizzas", label: "Pizzas" },
  { id: "build-your-own", label: "Build Your Own Pizza" },
  { id: "subs", label: "Subs" },
  { id: "pastas", label: "Pastas" },
  { id: "garlic-breads", label: "Garlic Breads" },
  { id: "wings", label: "Wings" },
  { id: "salads", label: "Salads" },
  { id: "sides", label: "Sides" },
  { id: "desserts", label: "Desserts" },
  { id: "drinks-dips", label: "Drinks / Dips" },
];
