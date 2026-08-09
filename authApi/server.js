let express = require("express");
let mongoose = require("mongoose");
const registerUser = require("./controllers/userController");
let userRoutes = require("./routes/userRoutes");
let app = express();
require("dotenv").config();
app.use(express.json());
app.post("/api/users/register", registerUser);

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
