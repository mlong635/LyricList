import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { createSong } from '../actions/actions';

class SongsNew extends Component {
  render(){
    const { fields: { title, notes, lyrics }, handleSubmit } = this.props;
    //to see all of the native methods console.log("title", title);

    return (
      <form onSubmit={handleSubmit(this.props.createSong)}>
        <h3>Create a New Song</h3>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" {...title}/>
        </div>

        <div className="form-group">
          <label>Notes</label>
          <input type="text" placeholder="e.g. 'Slow Blues key of E'" className="form-control" {...notes}/>
        </div>

        <div className="form-group">
          <label>Lyrics</label>
          <textarea className="form-control" {...lyrics}/>
        </div>

        <button type="submit" className="btn btn-primary">Save this Song</button>

      </form>
    );
  }
}

export default reduxForm({
  form: 'SongsNew',
  fields: ['title', 'notes', 'lyrics']
}, null, { createSong })(SongsNew);




