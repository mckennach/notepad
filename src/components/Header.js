import React from 'react';
import PropTypes from 'prop-types';

const Header = props => {
  var toggled = '';
  if(props.toggled){
    toggled = 'toggle-active'
  }
  return (
      <header className="flex space-between full-width top">
        <button className={toggled} onClick={ () => props.toggleSideBar(props.toggled)}><i className="active header-icon material-icons">view_compact</i></button>
        <button onClick={ () => props.addNewNote(props.history)}><i className="header-icon material-icons">add_box</i></button>
      </header>
  )
}

Header.propTypes = {
  addNewNote: PropTypes.func.isRequired,
  toggleSideBar: PropTypes.func.isRequired,
  toggled: PropTypes.bool.isRequired
}


export default Header
