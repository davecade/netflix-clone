import React, { useEffect } from 'react';
import './App.scss';
import Navbar from './components/navbar/navbar.component'
import Banner from './components/banner/banner.component'
import Category from './components/category/category.component'
import { fetchDataStart } from './redux/film/film.actions'
import { connect } from 'react-redux';

function App({ fetchDataStart, movies }) {

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


