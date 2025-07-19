require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const { PORT, NODE_ENV, DATABASE_URL } = require("./config/index");
const ConnectDB = require("./config/database");
const userRoute = require("./routes/userRoutes");
const blogRoute = require("./routes/blogRoutes");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1", userRoute);
app.use("/api/v1", blogRoute);

// default routes
app.get("/", (req, res) => {
  res.status(200).send(
    `<h2>Hii.. welcome to homepage of blogApp</h2>
       <p>Environment: ${NODE_ENV}</p>`
  );
});

// db connection
ConnectDB();

app.listen(PORT || 5000, (error) => {
  if (error) throw new Error("connection issue");
  console.log(`server is live at port ${PORT}`);
});
