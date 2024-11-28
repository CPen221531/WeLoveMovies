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

// CORS and JSON parsing middleware
app.use(cors());
app.use(express.json());

// Root route with welcome message
app.get("/", (request, response) => {
  response.json({ 
    data: "Welcome to WeLoveMovies API" 
  });
});

// Router middleware
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

// Method not allowed handler for root path
app.all("/", methodNotAllowed);

// Error handling middleware
app.use(notFound); // 404 handler
app.use(errorHandler); // Generic error handler

module.exports = app;