const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const tmdb = "https://api.themoviedb.org/3/";
const apiKey = "08aabbbef104512bb5432031efeae18c";
const randomNumber = () => Math.floor(Math.random() * 20) + 1; // page number must be > 0

const requests = {
    discover: `${tmdb}discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_providers=netflix&with_watch_monetization_types=flatrate`,
    popular: `${tmdb}movie/popular?api_key=${apiKey}&language=en-US`,
    trending: `${tmdb}trending/movie/day?api_key=${apiKey}&language=en-US`,
    action: `${tmdb}discover/movie?api_key=${apiKey}&language=en-US&with_genres=28`,
    adventure: `${tmdb}discover/movie?api_key=${apiKey}&language=en-US&with_genres=12`,
    fantasy: `${tmdb}discover/movie?api_key=${apiKey}&language=en-US&with_genres=80`,
    scienceFiction: `${tmdb}discover/movie?api_key=${apiKey}&language=en-US&with_genres=878`,
    animation: `${tmdb}discover/movie?api_key=${apiKey}&language=en-US&with_genres=16`,
    comedy: `${tmdb}discover/movie?api_key=${apiKey}&language=en-US&with_genres=35`,
};

//-- Route Handlers --//
const getAllMovies = async (req, res) => {
    try {
        const fetchPopular = axios.get(
            `${requests.popular}&page=${randomNumber()}`
        );
        const fetchTrending = axios.get(
            `${requests.trending}&page=${randomNumber()}`
        );
        const fetchAction = axios.get(
            `${requests.action}&page=${randomNumber()}`
        );
        const fetchAdventure = axios.get(
            `${requests.adventure}&page=${randomNumber()}`
        );
        const fetchFantasy = axios.get(
            `${requests.fantasy}&page=${randomNumber()}`
        );
        const fetchScienceFiction = axios.get(
            `${requests.scienceFiction}&page=${randomNumber()}`
        );
        const fetchAnimation = axios.get(
            `${requests.animation}&page=${randomNumber()}`
        );
        const fetchComedy = axios.get(
            `${requests.comedy}&page=${randomNumber()}`
        );

        const fetchHomepageData = await Promise.all([
            fetchPopular,
            fetchTrending,
            fetchAction,
            fetchAdventure,
            fetchFantasy,
            fetchScienceFiction,
            fetchAnimation,
            fetchComedy,
        ]);

        const homepageData = fetchHomepageData.map((genre) => {
            return genre.data;
        });

        const fetchBannerData = await axios.get(
            `https://api.themoviedb.org/3/movie/${
                homepageData[0].results[randomNumber() - 1].id
            }?api_key=${apiKey}&language=en-US`
        );
        const bannerData = await fetchBannerData.data;

        res.status(200).send({
            bannerData,
            homepageData,
        });
    } catch (error) {
        console.log(error);
    }
};

const getMovie = async (req, res) => {
    try {
        const fetchBannerData = await axios.get(
            `https://api.themoviedb.org/3/movie/${req.params.movieId}?api_key=${apiKey}&language=en-US`
        );
        const bannerData = fetchBannerData.data;
        res.status(200).send({ bannerData });
    } catch (error) {
        console.log(error);
    }
};

//-- Routes --//
app.get("/movies", getAllMovies);
app.get("/movies/:movieId", getMovie);

//-- Production Route--//
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));

    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
}

//-- Runs server
app.listen(port, (error) => {
    if (error) throw error;
    console.log(`Server runnning on port ${port}`);
});
