let express = require("express");
let mongoose = require("mongoose");
let app = express();
require("dotenv").config();
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.send({
    status: 1,
    message: "Auth is Working",
  });
});
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
