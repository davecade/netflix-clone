import { takeLatest, put, all, call, } from "redux-saga/effects";
import { filmActionTypes } from './film.types'
import movieTrailer from 'movie-trailer'
import {
    setBannerData,
    setMovies,
    startLoading,
    fetchDataSuccess,
    fetchDataFailure,
    setSelectedMovie
} from './film.actions'

const tmdb = 'https://api.themoviedb.org/3/'
const apiKey = '08aabbbef104512bb5432031efeae18c'

const requests = {
    discover: `${tmdb}discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_providers=netflix&with_watch_monetization_types=flatrate`,
    popular: `${tmdb}movie/popular?api_key=${apiKey}&language=en-US&page=1`,
    trending: `${tmdb}trending/movie/day?api_key=${apiKey}&page=2`,
    action: `${tmdb}discover/movie?api_key=${apiKey}&with_genres=28&page=3`,
    adventure: `${tmdb}discover/movie?api_key=${apiKey}&with_genres=12&page=4`,
    animation: `${tmdb}discover/movie?api_key=${apiKey}&with_genres=16&page=5`,
    comedy: `${tmdb}discover/movie?api_key=${apiKey}&with_genres=35&page=6`,
    crime: `${tmdb}discover/movie?api_key=${apiKey}&with_genres=80&page=7`,

}
//-- https://image.tmdb.org/t/p/original${popular.results[randomNumber].backdrop_path


export function* fetchDataStartAsync() {
    try {
        yield put(startLoading())
        const randomNumber = () => Math.floor(Math.random() * 20)

        let fetchPopular = fetch(`${requests.popular}&page=${randomNumber()}`)
        let fetchTrending = fetch(`${requests.trending}&page=${randomNumber()}`)
        let fetchAction = fetch(`${requests.action}&page=${randomNumber()}`)
        let fetchAdventure = fetch(`${requests.adventure}&page=${randomNumber()}`)
        let fetchAnimation = fetch(`${requests.animation}&page=${randomNumber()}`)
        let fetchComedy = fetch(`${requests.comedy}&page=${randomNumber()}`)
        let fetchCrime = fetch(`${requests.crime}&page=${randomNumber()}`)

        let fetchHomepageData = yield Promise.all([
            fetchPopular,
            fetchTrending,
            fetchAction,
            fetchAdventure,
            fetchAnimation,
            fetchComedy,
            fetchCrime
        ])

        let homepageData = yield Promise.all(fetchHomepageData.map( item => {
            return item.json()
        } ))
        console.log("homepageData", homepageData)
        let bannerData = homepageData[0].results[randomNumber()]

        yield put(setBannerData(bannerData))
        yield put(setMovies(homepageData))
        yield put(fetchDataSuccess())

    } catch(error) {
        yield put(fetchDataFailure(error))
    }
}

export function* getSelectedMovieAsync({payload: { title, id }}) {
    try {

        if(title) {
            let fetchMovieTrailer = yield movieTrailer(title || "")
            yield put(setSelectedMovie({ url: fetchMovieTrailer, id: id, title: title }))
        } else {
            yield put(setSelectedMovie({ url: '', id: '', title: '' }))
        }

    } catch(error) {
        console.log(error)
    }
}


export function* onFetchDataStart(){
    yield takeLatest(filmActionTypes.FETCH_DATA_START, fetchDataStartAsync)
}

export function* onGetSelectedMovie(){
    yield takeLatest(filmActionTypes.GET_SELECTED_MOVIE, getSelectedMovieAsync)
}

export function* filmSagas() {
    yield all([
        call(onFetchDataStart),
        call(onGetSelectedMovie)
    ])
}