import React from 'react';
import PropTypes from 'prop-types';


const SearchBar = props =>
  <div className="search-bar  flex center">
    <i className="material-icons">search</i>
    <input onKeyUp={ e => props.searchNotes(e.target.value)} placeholder="Search" className="search-bar-input full-width" type="text"/>
  </div>


SearchBar.propTypes = {
  searchNotes: PropTypes.func.isRequired
}

export default SearchBar
