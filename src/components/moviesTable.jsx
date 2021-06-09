import React, { Component } from 'react';
import Like from "../common/like";


class MoviesTable extends Component {
    setSort = path => {
        //改成{}因为state里面声明的对象？
        const sortColumn = {...this.props.sortColumn} 
        sortColumn.path = path
        //不能直接写成 sortColumn.order = "asc" ? "desc" : "asc"
        sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc'
       
        this.props.onSort(sortColumn)
    }

    render() { 
        const { moviesAll,onDelete,onLike } = this.props

    return ( 
        <table className="table">
        <thead>
          <tr>
            <th scope="col" onClick={() => this.setSort('title')} >Title</th>
            <th scope="col" onClick={() => this.setSort('genre.name')} >Genre</th>
            <th scope="col" onClick={() => this.setSort('numberInStock')} >numberInStock</th>
            <th scope="col" onClick={() => this.setSort('dailyRentalRate')} >dailyRentalRate</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {moviesAll.map((movie) => (
            <tr key={movie._id}>
              <th scope="row" key={movie}>
                {movie.title}
              </th>
              <td>{movie.genre.name}</td>
              <td> {movie.numberInStock}</td>
              <td> {movie.dailyRentalRate}</td>
              <td>
                <Like
                  liked={movie.liked}
                  onLike={() => onLike(movie)}
                />
              </td>
              <td>
                <button
                  className=" btn btn-primary "
                  onClick={() => {
                    onDelete(movie._id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     );
    }
}
 
export default MoviesTable;
