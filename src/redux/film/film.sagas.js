import { takeLatest, put, all, call, } from "redux-saga/effects";
import { filmActionTypes } from './film.types'
import { setBannerImage, setTrending, setPopular } from './film.actions'

const apiKey = '08aabbbef104512bb5432031efeae18c'

const requests = {
    discover: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_providers=netflix&with_watch_monetization_types=flatrate`,
    trending: `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
}

export function* fetchDataStartAsync() {
    try {
        const randomNumber = Math.floor(Math.random() * 20)
        let fetchTrending = yield fetch(requests.trending)
        let trending = yield fetchTrending.json()

        let fetchPopular = yield fetch(requests.discover)
        let popular = yield fetchPopular.json()
        let bannerImage = `https://image.tmdb.org/t/p/original${popular.results[randomNumber].backdrop_path}`
        yield put(setBannerImage(bannerImage))
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