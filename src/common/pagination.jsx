import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = (props) => {
  const { movieCount, pageSize,onPageChange,currentPage } = props;
  let i = Math.ceil(movieCount / pageSize);
  if (i === 1) return null;
  const items = _.range(1, i + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {items.map((item) => (
          <li className={ item === currentPage ? "page-item active" : "page-item" } key={item}>
            <a className="page-link" href="localhost:3000" onClick={ () => onPageChange(item) }>{item}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
   movieCount: PropTypes.number.isRequired,
   pageSize:PropTypes.number.isRequired,
   onPageChange:PropTypes.func.isRequired,
   currentPage:PropTypes.number.isRequired
}

export default Pagination;
