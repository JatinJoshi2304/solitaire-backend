import express from "express";
import { connectDB } from "./config/db.js"; // note the .js extension for ESM imports
import dotenv from "dotenv";
import roomRouters from "./routes/roomRoute.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("Hello from Solitaire backend!");
});

app.use("/api/rooms", roomRouters);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
// Export the app for testing or further configuration
