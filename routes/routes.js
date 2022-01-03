const express = require('express');
const { getAllMovies, getMovie } = require('../controllers/controller')

const router = express.Router()

//-- Routes --//
router.route("/").get(getAllMovies);
router.route("/:movieId").get(getMovie);

module.exports = router