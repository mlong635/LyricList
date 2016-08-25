import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { createSong } from '../actions/actions';
import { Link } from 'react-router';

class SongsNew extends Component {
  render(){
    const { fields: { title, notes, lyrics }, handleSubmit } = this.props;
    //to see all of the native methods console.log("title", title);

    return (
      <form onSubmit={handleSubmit(this.props.createSong)}>
        <h3>Create a New Song</h3>

        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title}/>
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className="form-group">
          <label>Notes (optional) </label>
          <input type="text" placeholder="e.g. 'Slow Blues key of E'" className="form-control" {...notes}/>
        </div>

        <div className={`form-group ${lyrics.touched && lyrics.invalid ? 'has-danger' : ''}`}>
          <label>Lyrics</label>
          <textarea className="form-control" {...lyrics}/>
          <div className="text-help">
            {lyrics.touched ? lyrics.error : ''}
          </div>
        </div>

        <button id="yolo" type="submit" className="btn btn-primary">Save this Song</button>
        <Link to="/" className="btn btn-danger">Discard</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if(!values.title){
    errors.title = "Enter a Song Title"
  }

  if(!values.lyrics){
    errors.lyrics = "Enter some lyrics"
  }
  return errors;
}

export default reduxForm({
  form: 'SongsNew',
  fields: ['title', 'notes', 'lyrics'],
  validate
}, null, { createSong })(SongsNew);




