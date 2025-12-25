const express = require("express");
const app = express();
require("dotenv").config();

const main = require("./config/db");
const redisClient = require("./config/redis");

const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const authRouter = require("./routes/userAuth");
const problemRouter = require("./routes/problemCreator");
const submitRouter = require("./routes/submit");

// ================== MIDDLEWARE ==================

app.use(cors({
  origin: [
    "http://localhost:5173",
    process.env.FRONTEND_URL
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use(fileUpload({
  useTempFiles: true
}));

// ================== ROUTES ==================

app.use("/user", authRouter);
app.use("/problem", problemRouter);
app.use("/submission", submitRouter);

// ================== START SERVER ==================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await main();
    console.log("MongoDB Connected");

    if (redisClient) {
      await redisClient.connect();
      console.log("Redis Connected");
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Server startup error:", err);
    process.exit(1);
  }
};

startServer();
