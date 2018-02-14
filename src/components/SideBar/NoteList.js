import React from 'react';
import PropTypes from 'prop-types';
import NoteLi from './NoteLi';
import { CSSTransitionGroup } from 'react-transition-group' // ES6

const NoteList = props =>
  <ul className="side-bar-ul full-width">

    <CSSTransitionGroup
    transitionName="delete"
    transitionAppear={true}
    transitionAppearTimeout={500}
    transitionEnter={false}
    transitionLeave={false}>

    {props.notes
      .map((note, index) =>
      <NoteLi
        {...props}
        key={index}
        title={note.title}
        note={note.noteText}
        index={index}
        timeStamp={note.timeStamp}
      />

    )}

    </CSSTransitionGroup>
  </ul>


NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
  deleteNoteAt: PropTypes.func.isRequired
}

export default NoteList
