import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { createSong, saveUserProfile } from '../actions/actions';
import { Link, browserHistory } from 'react-router';
let user_id = null;

class SongsNew extends Component {

  componentWillMount(){
    console.log("songs_new componentWillMount this.props ", this.props);
    console.log("songs_new componentWillMount this.state ", this.state);
    let retrieved = this.props.saveUserProfile()
    .then(result => {
      console.log("songs_new componentWillMount result", result);
      console.log("retrieved", result.payload.data);
      user_id = result.payload.data.userProfile._id;
      this.setState({ userProfile: result.payload.data.userProfile })
    })
  }

  onSubmit(props) {
    let songInfo = { userProfile: this.state.userProfile, newSong: props }
    this.props.createSong(songInfo)
    .then(() => {
      alert('Song successfully saved!');
    })
  }

  // onClick(){
  //   console.log("onClick this.state", this.state);
  //   browserHistory.push('/user/' + this.state.userProfile._id);
  // }

  render(){
    const { fields: { title, notes, lyrics }, handleSubmit } = this.props;
    //to see all of the native methods console.log("title", title);
    console.log("songs_new render() this.props ", this.props);
    console.log("songs_new render() this.state ", this.state);

    var userProfile = this.state!==null ? this.state.userProfile : undefined;
    var linkBack = userProfile ? '/user/'+userProfile._id : '/user/';

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a New Song</h3>
        <Link to={linkBack} className="text-xs-right">Back to Your Song List</Link>

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
          <textarea className="form-control" rows="10" {...lyrics}/>
          <div className="text-help">
            {lyrics.touched ? lyrics.error : ''}
          </div>
        </div>

        <button id="yolo" type="submit" className="btn btn-primary">Save this Song</button>
        <Link to={linkBack} className="btn btn-danger">Discard</Link><br></br><br></br>
        <Link to={linkBack} className="btn btn-primary">Back to Your Song List</Link>
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

function mapStateToProps(state) {
  return { userProfile: state.userProfile };
}

export default reduxForm({
  form: 'SongsNew',
  fields: ['title', 'notes', 'lyrics'],
  validate,
  mapStateToProps
}, null, { createSong, saveUserProfile })(SongsNew);




