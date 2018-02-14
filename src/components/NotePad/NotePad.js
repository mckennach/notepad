import React from 'react';
import PropTypes from 'prop-types';
import Timestamp from 'react-timestamp';
import Title from './Title';


const NotePad = props => {
  var noteObj = props.notes[props.match.params.id];
  let title = ''; let noteText = ''; let timeStamp = ''; let index = ''
  var toggled = '';
  if(props.toggled){
    toggled = 'toggle-active'
  }

  if(noteObj !== undefined){
    title = noteObj.title;
    noteText = noteObj.noteText;
    index = props.match.params.id
    timeStamp = <Timestamp className="note-pad-time-stamp" time={noteObj.timeStamp}  />
  }



  return(
    <div className={`note-pad full-width ${toggled}`}>
      <div className="flex center note-pad-title">
        <Title
          title={title}
          setNoteDataAt={props.setNoteDataAt}
          index={index}
          updateNoteActive={props.updateNoteActive}
          updateTitle={props.updateTitle}
        />

        {timeStamp}
      </div>


      <textarea
        onChange={e => props.setNoteDataAt('noteText', e.target.value, index)}
        className="full-width note-pad-text-area"
        value={noteText}>
      </textarea>
    </div>
  )
}

NotePad.propTypes = {
  notes: PropTypes.array.isRequired,
  setNoteDataAt: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
  addNewNote: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  waitForType: PropTypes.func.isRequired,
  updateNoteActive: PropTypes.bool.isRequired,
  toggled: PropTypes.bool.isRequired

}

export default NotePad
