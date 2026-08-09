let express = require("express");
let app = express();
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.send({
    status: 1,
    message: "Auth is Working",
  });
});

app.listen(8006, () => {
  console.log("Server is running on Port 8006");
});
