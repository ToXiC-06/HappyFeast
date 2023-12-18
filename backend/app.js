const express = require("express");

const connectToDatabase = require("./db");
const app = express();
const PORT = 5000;

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:5173",
    "https://happy-feast06.netlify.app/"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Connecting to databse;
connectToDatabase();

// Routing GET-POST

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use("/api", require("./routes/CreateUser"));
app.use("/api", require("./routes/DisplayData"));
app.use("/api", require("./routes/OrderData"));

app.listen(PORT, () => {
  console.log(`Server Started at PORT ${PORT}`);
});
