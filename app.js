const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { alive, ping } = require("./controllers/hello");

// Import routes
const userRoutes = require("./routes/user");

const DB_URL =
  "mongodb+srv://adminRushi:test@cluster0.nizxy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const app = express();

const port = 8000 || process.env.PORT;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.use(cors());
app.use(bodyParser.json());

app.get("/alive", alive);

app.get("/ping", ping);

app.get("/check", (req, res) => {
  res.send("Server is running");
});

mongoose.connect(
  DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to DB");
    }
  }
);

// Mount routes
app.use("/api", userRoutes);
