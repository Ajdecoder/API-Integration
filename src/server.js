const express = require("express");
const app = express();
const routes = require("./routes");
app.use(express.json());
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Welcome to the API Integration Server");
})

const PORT = 3000;
app.listen(PORT, () => console.log("Server running on http://localhost:" + PORT));