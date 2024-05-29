import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import axios from "axios";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import CropsRoutes from "./routes/CropsRoutes.js";
import newsRoute from "./routes/newsRoute.js";
import organicFertiRoute from "./routes/organicFertiRoute.js";
import greenhouseRoute from "./routes/greenhouseRoute.js";
import stubbleRoute from "./routes/stubbleRoute.js";
import seedRoute from "./routes/seedRoute.js";
import soilRoute from "./routes/soilRoute.js";
import advanceEqpRoute from "./routes/advanceEqpRoute.js";
import postRoute from "./routes/postRoute.js";

import cors from "cors";
// import path from 'path';
// import { fileURLToPath } from 'url';

//configure env
dotenv.config();

//databse config
connectDB();

//es module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// app.use(express.static(path.join(__dirname, './client/build')));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/crops", CropsRoutes);
app.use("/api/v1/news", newsRoute);
app.use("/api/v1/organicFerti", organicFertiRoute);
app.use("/api/v1/greenhouse", greenhouseRoute);
app.use("/api/v1/stubble", stubbleRoute);
app.use("/api/v1/advanceEqp", advanceEqpRoute);
app.use("/api/v1/seed", seedRoute);
app.use("/api/v1/soil", soilRoute);
app.use('/api/v1/posts', postRoute);

app.get("/weather", async (req, res) => {
  const { lat, lon } = req.query;
  const apiKey = process.env.WEATHER_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

//rest api
// app.use("*", function(req, res) {
//   res.sendFile(path.join(__dirname, './client/build/index.html'));
// });

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`.red);
});
