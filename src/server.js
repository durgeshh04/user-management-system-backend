import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config({ quiet: true });

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Application running on PORT:${process.env.PORT}`);
});
