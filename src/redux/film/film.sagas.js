import { takeLatest, put, all, call, } from "redux-saga/effects";
import { filmActionTypes } from './film.types'
import { setBannerImage } from './film.actions'

const apiKey = '08aabbbef104512bb5432031efeae18c'

export function* fetchDataStartAsync() {
    try {
        const randomNumber = Math.floor(Math.random() * 20)
        let fetchData = yield fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_providers=netflix&with_watch_monetization_types=flatrate`)
        let data = yield fetchData.json()
        let bannerImage = `https://image.tmdb.org/t/p/original${data.results[randomNumber].backdrop_path}`
        yield put(setBannerImage(bannerImage))
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