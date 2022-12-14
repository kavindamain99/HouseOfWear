import express, { json, urlencoded } from "express";
import path from "path";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import mongoose from "mongoose";



import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

app.use(json({ limit: "30mb", extended: true }));
app.use(urlencoded({ limit: "30mb", extended: true }));

app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.use("/api/addresses", addressRoutes);


app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
const PORT = process.env.PORT || 5000;

mongoose
  .connect(
    "mongodb+srv://kavinda:mern@cluster0.px0cl.mongodb.net/HouseOfWears?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() =>
    app.listen(PORT, () =>
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
          .bold
      )
    )
  )
  .catch((error) => console.log(error.message.red.bold));
