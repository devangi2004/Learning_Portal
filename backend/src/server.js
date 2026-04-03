import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const bootstrap = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`SmartPrep API running on port ${PORT}`);
  });
};

bootstrap().catch((error) => {
  console.error("Failed to start SmartPrep API", error);
  process.exit(1);
});
