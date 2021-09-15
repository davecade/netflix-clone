import { takeLatest, put, all, call, } from "redux-saga/effects";
import { filmActionTypes } from './film.types'
import { setBannerData, setTrending, setPopular } from './film.actions'

//-- GENRE's
//-- https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28

const apiKey = '08aabbbef104512bb5432031efeae18c'

const requests = {
    discover: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_providers=netflix&with_watch_monetization_types=flatrate`,
    trending: `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`,
    popular: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
}
//-- https://image.tmdb.org/t/p/original${popular.results[randomNumber].backdrop_path
export function* fetchDataStartAsync() {
    try {
        const randomNumber = Math.floor(Math.random() * 20)
        let fetchPopular = yield fetch(requests.popular)
        let popular = yield fetchPopular.json()
        let bannerData = popular.results[randomNumber]
        let fetchTrending = yield fetch(requests.trending)
        let trending = yield fetchTrending.json()


        let fetchGenre = yield fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28`)
        let genre = yield fetchGenre.json()
        console.log("genre", genre)

        yield put(setBannerData(bannerData))
        yield put(setTrending(trending.results))
        yield put(setPopular(popular.results))
    } catch(error) {
        console.log(error)
    }
}


export function* onFetchDataStart(){
    yield takeLatest(filmActionTypes.FETCH_DATA_START, fetchDataStartAsync)
}


export function* filmSagas() {
    yield all([
        call(onFetchDataStart)
    ])
}