const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  is_showing: ["movies", null, "is_showing"],
  theater_id: ["movies", null, "theater_id"],
});

async function list() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select(
      "t.*",
      "m.movie_id",
      "m.title",
      "m.runtime_in_minutes",
      "m.rating",
      "m.description",
      "m.image_url",
      "mt.is_showing"
    )
    .then(reduceProperties("theater_id", {
      movie_id: ["movies", null, "movie_id"],
      title: ["movies", null, "title"],
      runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
      rating: ["movies", null, "rating"],
      description: ["movies", null, "description"],
      image_url: ["movies", null, "image_url"],
      is_showing: ["movies", null, "is_showing"]
    }));
}

module.exports = {
  list,
};