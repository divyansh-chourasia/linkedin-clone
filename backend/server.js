import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());

import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import { connectDB } from "./lib/db.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);


app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
    connectDB();
});
