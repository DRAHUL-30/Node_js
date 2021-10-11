require("dotenv").config();
const cors = require("cors");
const PORT = 3001 || process.env.PORT;

const express = require("express");
const app = express();

const mongo = require("./Shared/mongo");
const jwt = require("jsonwebtoken");

const userRoutes = require("./Router/users.route");
const postRoutes = require("./Router/posts.route");

const middleware = require("./Shared/middleware");

app.use(cors());

(async () => {
  try {
    await mongo.connect();
    app.use(express.json());

    app.use((req, res, next) => {
      console.log("common is calling");
      next();
    });

    app.use("/users", userRoutes);

    app.use(middleware.authToken);

    app.use(middleware.logging);

    app.use("/posts", postRoutes);

    app.listen(process.env.PORT, () =>
      console.log(`Running in port ${process.env.PORT}`)
    );
  } catch (err) {
    console.log(err);
    console.log("Error in server");
  }
})();
