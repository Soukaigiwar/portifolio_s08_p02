const { Router } = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const MovieNotesController = require("../controllers/MovieNotesControllers");

const movieNotesRoutes = Router();
const movieNotesControllers = new MovieNotesController();
movieNotesRoutes.use(ensureAuthenticated);

movieNotesRoutes.get("/:id", movieNotesControllers.show);
movieNotesRoutes.get("/", movieNotesControllers.index);
movieNotesRoutes.delete("/:id", movieNotesControllers.delete);
movieNotesRoutes.post("/", movieNotesControllers.create);

module.exports = movieNotesRoutes;
