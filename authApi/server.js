let express = require("express");
let mongoose = require("mongoose");
require("dotenv").config();

let userRoutes = require("./routes/userRoutes");

let app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port ${process.env.PORT}`);
});
