import { takeLatest, put, all, call, } from "redux-saga/effects";
import { filmActionTypes } from './film.types'
import {
    setBannerData,
    setMovies,
    startLoading,
    fetchDataSuccess,
    fetchDataFailure
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
    documentary: `${tmdb}discover/movie?api_key=${apiKey}&with_genres=99&page=6`

}
//-- https://image.tmdb.org/t/p/original${popular.results[randomNumber].backdrop_path


export function* fetchDataStartAsync() {
    try {
        yield put(startLoading())
        const randomNumber = Math.floor(Math.random() * 20)

        let fetchPopular = fetch(requests.popular)
        let fetchTrending = fetch(requests.trending)
        let fetchAction = fetch(requests.action)
        let fetchAdventure = fetch(requests.adventure)
        let fetchAnimation = fetch(requests.animation)
        let fetchComedy = fetch(requests.comedy)
        let fetchCrime = fetch(requests.crime)
        let fetchDocumentary = fetch(requests.documentary)

        let fetchHomepageData = yield Promise.all([
            fetchPopular,
            fetchTrending,
            fetchAction,
            fetchAdventure,
            fetchAnimation,
            fetchComedy,
            fetchCrime,
            fetchDocumentary
        ])

        let homepageData = yield Promise.all(fetchHomepageData.map( item => {
            return item.json()
        } ))

        let bannerData = homepageData[0].results[randomNumber]

        yield put(setBannerData(bannerData))
        yield put(setMovies(homepageData))
        yield put(fetchDataSuccess())

    } catch(error) {
        yield put(fetchDataFailure(error))
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