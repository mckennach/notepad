import React from 'react';
import PropTypes from 'prop-types';
import NoteList from './NoteList';
import SearchBar from './SearchBar';





const SideBar = props => {
  var toggled = '';
  if(props.toggled){
    toggled = 'toggle-active'
  }


  return (

    <div className={`flex-column overflow-hidden relative flex background-black side-bar ${toggled}` }>
    <SearchBar
      searchNotes={props.searchNotes}
     />

    <NoteList
      {...props}
      notes={props.notes}
      deleteNoteAt={props.deleteNoteAt}
    />

  </div>
)

}



SideBar.propTypes = {
  notes: PropTypes.array.isRequired,
  deleteNoteAt: PropTypes.func.isRequired,
  searchNotes: PropTypes.func.isRequired,
  toggled: PropTypes.bool.isRequired
}

export default SideBar
