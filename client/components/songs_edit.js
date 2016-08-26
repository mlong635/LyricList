import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createSong, editSong } from '../actions/actions';
import { Link } from 'react-router';

class SongsEdit extends Component {

  componentWillMount(){
    this.props.editSong(this.props.params.id)
    .then((song) => {
      console.log("SongsEdit rec'd from database" + song);
      this.setState({ song });
    });
  }

  onSubmit(props) {
    this.props.createSong(props)
    .then(() => {
      alert('Song successfully saved!');
    })
  }

  render(){
    if(!this.state) return <div>Loading...</div>

    let currentSong = this.state.song.payload.data;

    const { fields: { title, notes, lyrics }, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Edit Song</h3>
        <Link to="/" className="text-xs-right">Back to Your Song List</Link>

        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} value={currentSong.title} />
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className="form-group">
          <label>Notes (optional) </label>
          <input type="text" placeholder="e.g. 'Slow Blues key of E'" className="form-control" {...notes} value={currentSong.notes}/>
        </div>

        <div className={`form-group ${lyrics.touched && lyrics.invalid ? 'has-danger' : ''}`}>
          <label>Lyrics</label>
          <textarea className="form-control" {...lyrics} value={currentSong.lyrics}/>
          <div className="text-help">
            {lyrics.touched ? lyrics.error : ''}
          </div>
        </div>

        <button id="yolo" type="submit" className="btn btn-primary">Save this Song</button>
        <Link to="/" className="btn btn-danger">Discard Changes</Link><br></br><br></br>
        <Link to="/" className="btn btn-primary">Back to Your Song List</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if(!values.title){
    errors.title = "Enter a new Song Title"
  }

  if(!values.lyrics){
    errors.lyrics = "Enter some new lyrics"
  }
  return errors;
}

export default reduxForm({
  form: 'SongsNew',
  fields: ['title', 'notes', 'lyrics'],
  validate
}, null, { createSong, editSong })(SongsEdit);




