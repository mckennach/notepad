import React from 'react';
import PropTypes from 'prop-types';



const Title = props => {

  if(props.updateNoteActive){
    return(
      <input onBlur={e => props.updateTitle(false)} onChange={e => props.setNoteDataAt('title', e.target.value, props.index)} className="new-note-input" placeholder={props.title} autoFocus/>
    )
  }

  return(
    <h1 className="note-title-h1" onClick={e => props.updateTitle(true)}>{props.title}</h1>
  )
}

Title.propTypes = {
  setNoteDataAt: PropTypes.func.isRequired,
  updateNoteActive: PropTypes.bool.isRequired
}

export default Title
