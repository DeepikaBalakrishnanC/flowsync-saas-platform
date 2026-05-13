import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import helmet from "helmet";

import morgan from "morgan";

import http from "http";

import connectDB from "./config/database";

import authRoutes from "./routes/authRoutes";

import userRoutes from "./routes/userRoutes";

import adminRoutes from "./routes/adminRoutes";

import projectRoutes from "./routes/projectRoutes";

import taskRoutes from "./routes/taskRoutes";
import subscriptionRoutes from "./routes/subscriptionRoutes";

import { initSocket }
from "./sockets/socket";

dotenv.config();

connectDB();

const app = express();

const server =
  http.createServer(app);


// Initialize Socket.io
initSocket(server);


app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));


// Routes
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/user",
  userRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/projects",
  projectRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);

app.use(
  "/api/subscriptions",
  subscriptionRoutes
);


app.get("/", (req, res) => {

  res.json({

    success: true,

    message:
      "FlowSync SaaS API Running 🚀",

  });

});


const PORT =
  process.env.PORT || 5001;


server.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});
