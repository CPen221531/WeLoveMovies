if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const methodNotAllowed = require("./errors/methodNotAllowed");

const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.json({ 
    data: "Welcome to WeLoveMovies API" 
  });
});

app.all("/", (req, res) => {
  res.status(405).json({ error: "Method not allowed" });
});

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;