import React, { Component } from "react";

class List extends Component {

  render() {
     
    return (
      <ul className="list-group m-3 mt-3">
           
          {/* ?map后面还是要括号才行 */}
        {this.props.genres.map( (gen) => 
          <li className={ this.props.selectedGen ===  gen  ? "list-group-item active" : "list-group-item" }  key={gen._id} onClick={ () => this.props.onSelect(gen)}>
            {gen.name}
          </li>
        )}
      </ul>
    );
  }
}

export default List;
