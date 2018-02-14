import React, { Component } from 'react';
import axios from 'axios';
import {
  HashRouter,
  Route,
  Redirect
} from 'react-router-dom';

//React Components
import SideBar from './SideBar/SideBar';
import NotePad from './NotePad/NotePad';
import Loading from './Loading';
import Header from './Header';

export default class App extends Component {

    state = {
      notes: [],
      searchedNotes: [],
      updateNoteActive: false,
      loaded: false,
      toggled: true

    }
    apiUrl = '//5a792a928cfbce00128114dc.mockapi.io/notes';


componentDidUpdate(prevProps, prevState) {

}

waitForType = input => {
    // Get the input box
  var textInput = document.getElementsByID(input)

  // Init a timeout variable to be used below
  var timeout = null;

  // Listen for keystroke events
  textInput.onkeyup = function (e) {

      // Clear the timeout if it has already been set.
      // This will prevent the previous task from executing
      // if it has been less than <MILLISECONDS>
      clearTimeout(timeout);

      // Make a new timeout set to go off in 800ms
      timeout = setTimeout(function () {
          console.log('Input Value:', textInput.value);
      }, 500);
  };
}

componentDidMount() {
  this.getNotes();
}


getNotes = () => {
  axios.get(this.apiUrl)
    .then((res) => {
      this.setState({
        notes:res.data,
        searchedNotes: res.data,
        loaded:true
      });
    });
}

updateNote = (index) => {
    let note = this.state.notes[index];
    axios.put(this.apiUrl+'/'+note.id, note)
      .then((res) => {
        this.componentDidMount();

    });
}

addNewNote = history => {
  const id = this.state.notes.length + 1;
  let path = '/notes/' + this.state.notes.length;
  const note = {
    title: 'New Note',
    noteText: '',
    timeStamp: new Date(),
    id: id
  };

  axios.post(this.apiUrl, note)
     .then((res) => {
        history.push(path);
        this.setState({
          updateNoteActive: true,
          loaded: false
        });
        this.componentDidMount();
     });

}

updateTitle = isActive => {
  console.log(isActive);
  this.setState({updateNoteActive: isActive});
}


setNoteDataAt = (property, value, indexToChange) => {
  this.setState({
    notes: this.state.notes.map((note, index) => {
      if(index === indexToChange){

        return {
          //spread operator.. this will copy the rest of the object into the array,
          //that way you don't have to copy every key.
          ...note,
          timeStamp: new Date(),
          [property]: value

        }
      }
      return note
    })
  }, () => {

    this.updateNote(indexToChange);
  })


}

toggleSideBar = prevState => {
  console.log(prevState)
  this.setState({
    toggled: !prevState
  })
}

removeAll = () => {
  var deleteConfirm = window.confirm('Are you sure you want to delete all notes?');

  if(deleteConfirm){
    this.state.notes.forEach((id) => {
      console.log(id);
    });
  }
}


deleteNoteAt = (index) => {
  let note = this.state.notes[index];
//  var deleteConfirm = window.confirm('Are you sure you want to delete '+note.title);

  //if(deleteConfirm) {
    axios.delete(this.apiUrl+'/'+note.id)
     .then((res) => {
         this.componentDidMount();
     })
//  }

}

searchNotes = searchKey => {
  this.setState({searchedNotes: this.state.notes.filter( note => !note.title.toLowerCase().search(searchKey.toLowerCase()))});
}


render(){
  return(
    <HashRouter>

      <div className="container">
          <Loading
            loaded = {this.state.loaded}
          />

          <Route
            path='/notes'
            render={(props) =>
              <Header
                {...props}
                toggleSideBar={this.toggleSideBar}
                addNewNote={this.addNewNote}
                toggled={this.state.toggled}
              />
            }
          />


          <div className="page-wrapper flex">
            <Route exact
              path='/'
              render={ () => <Redirect to="/notes/0"/> }
            />
            <Route
              path="/notes"
              render={ (props) =>
                <SideBar {...props}
                  loaded={this.state.loaded}
                  addNewNote={this.addNewNote}
                  deleteNoteAt={this.deleteNoteAt}
                  notes={this.state.searchedNotes}
                  searchNotes={this.searchNotes}
                  toggled={this.state.toggled}

                   />

                 }
            />
            <Route
              path="/notes/:id"
              render={ (props) =>
                <NotePad {...props}
                  notes={this.state.searchedNotes}
                  setNoteDataAt={this.setNoteDataAt}
                  updateNote={this.updateNote}
                  addNewNote={this.addNewNote}
                  updateNoteActive={this.state.updateNoteActive}
                  updateTitle={this.updateTitle}
                  waitForType={this.waitForType}
                  toggled={this.state.toggled}
                  />}

            />
          </div>
      </div>
    </HashRouter>
  );
}

}
