app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://royal-pizza-xi.vercel.app",
    ],
    credentials: true,
  })
);