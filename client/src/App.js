import React, { Fragment, useEffect, useState } from "react";
import "./App.scss";
import Navbar from "./components/navbar/navbar.component";
import Banner from "./components/banner/banner.component";
import Category from "./components/category/category.component";
import Modal from "./components/modal/modal.component";
import { fetchDataStart } from "./redux/film/film.actions";
import { connect } from "react-redux";
import MainLoader from "./components/MainLoader/mainloader.component";

const App = ({ fetchDataStart, movies, loading }) => {
    //--https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=<<api_key>>&language=en-US

    const [displayLoader, setDisplayLoader] = useState(true);

    useEffect(() => {
        //-- Fetch data using redux Sagas
        fetchDataStart();

        if (!loading) {
            setTimeout(() => {
                setDisplayLoader(false);
            }, 5000);
        }
    }, [fetchDataStart, loading]);

    return (
        <Fragment>
            <MainLoader displayLoader={displayLoader} />
            <div
                className="App"
                style={{ display: displayLoader ? "none" : "block" }}
            >
                <Navbar />
                <Banner />
                {movies.map((category, index) => (
                    <Category
                        key={index}
                        categoryID={index}
                        category={category.results}
                    />
                ))}
                <Modal />
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    movies: state.film.movies,
    loading: state.film.loading,
});

const mapDispatchToProps = (dispatch) => ({
    fetchDataStart: () => dispatch(fetchDataStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
