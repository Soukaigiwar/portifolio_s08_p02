const { response } = require("express");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MovieNotesController {
    async create(request, response) {
        const { title, description, rating, tags } = request.body;
        const user_id = request.user.id;

        if (!rating || rating <= 0 || rating >= 6) {
            throw new AppError("A avaliação (rating) precisa ser entre 1 e 5.");
        };

        const [note_id] = await knex("movie_notes").insert({
            title,
            description,
            user_id,
            rating
        });

        const movieTagsInsert = tags.map(name => {
            console.log("dentro");
            return {
                note_id,
                name,
                user_id,
            };
        });

        await knex("movie_tags").insert(movieTagsInsert);

        return response.status(201).json();
    };

    async show(request, response) {
        const { id } = request.params;
        const user_id = request.user.id;

        const movieNote = await knex("movie_notes")
            .where({ user_id })
            .where({ id })
            .first();

        const movieTags = await knex("movie_tags")
            .where({ note_id: id })
            .orderBy("name");

        return response.json({
            ...movieNote,
            movieTags
        });
    };

    async index(request, response) {
        const user_id = request.user.id;

        const movieNotes = await knex("movie_notes")
            .where({ user_id })
            .orderBy("title");

        return response.json(movieNotes);
    };

    async delete(request, response) {
        const { id } = request.params;
        const user_id = request.user.id;

        await knex("movie_notes")
            .where({ user_id })
            .where({ id }).delete();

        return response.json();
    };
};

module.exports = MovieNotesController;
