const { Router } = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const MovieTagsControllers = require("../controllers/MovieTagsControllers");
const movieTagsController = new MovieTagsControllers();
const movieTagsRoutes = Router();
movieTagsRoutes.use(ensureAuthenticated);

movieTagsRoutes.get("/", movieTagsController.index);

module.exports = movieTagsRoutes;
