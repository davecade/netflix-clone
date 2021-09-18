import React, { useEffect } from 'react';
import './App.scss';
import Navbar from './components/navbar/navbar.component'
import Banner from './components/banner/banner.component'
import Category from './components/category/category.component'
import Modal from './components/modal/modal.component'
import { fetchDataStart } from './redux/film/film.actions'
import { connect } from 'react-redux';

function App({ fetchDataStart, movies }) {
  //https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=<<api_key>>&language=en-US
  // (async () => {
  //   //--Testing movie
  //   let api = '08aabbbef104512bb5432031efeae18c'
  //   let fetchMovie = await fetch(`https://api.themoviedb.org/3/movie/661595/images?api_key=${api}&language=en-US`)
  //   let movie = await fetchMovie.json()
  //   console.log("MOVIE: ", movie)
  // })()

  useEffect(() => {
    //-- Fetch data using redux Sagas
    fetchDataStart()

}, [fetchDataStart])

  return (
    <div className="App">
      <Navbar />
      <Banner />
      {
        movies.map( (category, index) => (
          <Category categoryID={index} category={category.results} />
        ))
      }
      <Modal/>
    </div>
  );
}

const mapStateToProps = state => ({
  movies: state.film.movies,
})


const mapDispatchToProps = dispatch => ({
  fetchDataStart: () => dispatch(fetchDataStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);


