import React from 'react';
import PropTypes from 'prop-types';
import Timestamp from 'react-timestamp';
import {
  NavLink
} from 'react-router-dom';

const NoteLi = props =>

  <NavLink className="" to={`${props.match.url}/${props.index}`}>
    <li className="relative side-bar-li">
      <span className="note-li-title">{props.title}</span>
      <br />
      <Timestamp className="time-stamp" time={props.timeStamp}  />
      <span onClick={ () => props.deleteNoteAt(props.index)} className="absolute right remove-icon"><i className="material-icons">clear</i></span>
    </li>
  </NavLink>



  NoteLi.propTypes = {
    title: PropTypes.string.isRequired
  }

export default NoteLi
