import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { createSong, editSong, saveUserProfile } from '../actions/actions';
import { Link } from 'react-router';
let thisSong = null;

class SongsEdit extends Component {

  componentWillMount(){
    console.log("Songs_edit componentWillMount this.props", this.props);
    this.props.saveUserProfile()
    .then( result => {
      console.log("Songs_edit componentWillMount savedUserProfile ", result.payload.data);
      thisSong = result.payload.data.userProfile.songs.filter( song => {
        console.log("inside filter function ", song.title);
        return song.title === this.props.params.id;
      })[0];
      console.log("Songs Edit ComponentWillMount thisSong", thisSong);
      this.setState({ userProfile: result.payload.data.userProfile, thisSong: thisSong });
    })
  }

  onSubmit(props) {
    this.props.createSong(props)
    .then(() => {
      alert('Song successfully saved!');
    })
  }

  render(){
    if(!this.state) return <div>Loading...</div>;

    let { thisSong } = this.state;
    var userProfile = this.state!==null ? this.state.userProfile : undefined;
    var linkBack = userProfile ? '/user/'+userProfile._id : '/user/';

    const { fields: { title, notes, lyrics }, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Edit Song</h3>
        <Link to={linkBack} className="text-xs-right">Back to Your Song List</Link>

        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} value={thisSong.title} />
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className="form-group">
          <label>Notes (optional) </label>
          <input type="text" placeholder="e.g. 'Slow Blues key of E'" className="form-control" {...notes} value={thisSong.notes}/>
        </div>

        <div className={`form-group ${lyrics.touched && lyrics.invalid ? 'has-danger' : ''}`}>
          <label>Lyrics</label>
          <textarea className="form-control" {...lyrics} value={thisSong.lyrics}/>
          <div className="text-help">
            {lyrics.touched ? lyrics.error : ''}
          </div>
        </div>

        <button id="yolo" type="submit" className="btn btn-primary">Save this Song</button>
        <Link to={linkBack} className="btn btn-danger">Discard Changes</Link><br></br><br></br>
        <Link to={linkBack} className="btn btn-primary">Back to Your Song List</Link>
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
}, null, { createSong, editSong, saveUserProfile })(SongsEdit);




