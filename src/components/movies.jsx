import React, { Component } from "react";
import _ from "lodash";
import Pagination from "../common/pagination";
import { paginate } from "../utiles/paginate";
import List from "./list";
import {  getGenres } from "../services/fakeGenreService";
import {  getMovies } from "../services/fakeMovieService";
import MoviesTable from "./moviesTable";
//develop tool怎么用？
class Movies extends Component {
  state = {
    upMovies: [],
    currentPage: 1,
    pageSize: 4,
    genres: [],
    sortColumn: {path:'title', order: 'asc'},
    //测试activeAll渲染顺序
    activeAll: false,
  };

  componentDidMount() {
    const genres = [{_id:"", name: "All items" }, ...getGenres()];
    this.setState({ upMovies: getMovies(), genres });
  }

  deleteMovie(id) {
    let newMovies = this.state.upMovies.filter((movie) => movie._id !== id);
    this.setState({ upMovies:  newMovies });
  }

  handelLike = (movie) => {
    const movies = [...this.state.upMovies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handelPageChange = (page) => {
    this.setState({ currentPage: page });
  };

  selectItem = (gen) => {
    this.setState({ selectedGen: gen, currentPage: 1 });
    this.setState({ activeAll: !this.state.activeAll });
    //?测试activeAll渲染顺序
    console.log(this.state.activeAll);
  };

  handelSort = sortColumn => {
    this.setState( {sortColumn})
  }

  render() {
    const { upMovies, currentPage, pageSize, genres, selectedGen, activeAll,sortColumn } =
      this.state;

    const filtedMovies =
      selectedGen && selectedGen._id
        ? upMovies.filter((m) => m.genre._id === selectedGen._id)
        : upMovies;
    
    const sortMovies = _.orderBy(filtedMovies, [sortColumn.path],[sortColumn.order])
   
    const moviesAll = paginate(sortMovies, currentPage, pageSize);
    console.log('On init:',this.state.activeAll);

    return (
      <div className="row">
        <div className="col-2">
          <List
            onSelect={this.selectItem}
            genres={genres}
            selectedGen={selectedGen}
            //测试activeAll渲染顺序
            activeAll={activeAll}
          />
        </div>
        <div className="col" style={{ padding: "0 20px" }}>
          {upMovies.length === 0 ? (
            <h2>There are no movies.</h2>
          ) : (
            <h2>Showing {filtedMovies.length} in the database.</h2>
          )}
          <MoviesTable
            moviesAll={moviesAll}
            onDelete={this.deleteMovie}
            onLike={this.handelLike}
            sortColumn={sortColumn}
            onSort={this.handelSort}
          />
          <Pagination
            movieCount={filtedMovies.length}
            pageSize={pageSize}
            onPageChange={this.handelPageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
