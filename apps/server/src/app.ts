import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import prisma from "./prisma/client";
import routes from "./routes";

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(cookieParser());

app.use("/api/v1", routes);

app.get("/test-db", async (req, res) => {
  const users = await prisma.user.findMany();

  res.json(users);
});

app.get("/", (req, res) => {
  res.json({
    message: "BizFlow AI CRM API Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});