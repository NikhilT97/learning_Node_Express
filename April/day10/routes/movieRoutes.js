const express = require('express')

const movieRouter = express.Router();


//routes
movieRouter.get("/get-movies", async (req, res) => {
  let data = await movieModel.find();

  res.status(200).json({ message: "all movies fetched", data });
});

movieRouter.post("/add-movie", async (req, res) => {
  //data object yenar body madhun
  await movieModel.create(req.body);
  res.status(201).json({ message: "added movie" });
});

movieRouter.patch("/update-movie/:movieId", async (req, res) => {
  //get movie id;
  const { movieId } = req.params;

  const movie = await movieModel.findByIdAndUpdate(movieId, req.body);

  res.status(201).json({ message: "updated movie" });
});

movieRouter.delete("/delete-movie/:movieId", async (req, res) => {
  const { movieId } = req.params;

  const movie = await movieModel.findByIdAndDelete(movieId);
  res.status(201).json({ message: "movie deleted"});
});


module.exports = { movieRouter}
