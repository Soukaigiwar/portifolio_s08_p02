const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MovieTagsController {
    async index(request, response) {
        const user_id = request.user.id;

        const tags = await knex("movie_tags").where({ user_id });

        if (!tags) {
            throw new AppError("Nenhuma tag cadastrada para esse usuário");
        };


        return response.json(tags);
    };
};

module.exports = MovieTagsController;
