import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateSong, editSong, saveUserProfile, deleteSong } from '../actions/actions';
import { Link, browserHistory } from 'react-router';
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
    let songInfo = { userProfile: this.state.userProfile, newSong: props }
    this.props.updateSong(songInfo)
    .then(() => {
      alert('Song successfully saved!');
    })
  }

  onDeleteClick() {
    return new Promise ((resolve, reject) => {
      let userSure = confirm("Delete "+this.state.thisSong+"?  Are you sure?  \n\nWARNING: This is permanent!");
      userSure ? resolve() : reject();
    })
    .then( () => {
      this.props.deleteSong({ userProfile: this.state.userProfile, deleteSong: this.state.thisSong.title})
    })
    .then( () => {
      console.log("making it this far ", this.state.userProfile._id);
      browserHistory.push('/user/'+this.state.userProfile._id)
    })
    .catch( error => console.log("onDeleteClick promise chain error", error));
  }

  handleTitleChange(event){
    let newSongState = this.state.thisSong;
    newSongState.title = event.target.value;
    this.setState({ thisSong: newSongState });
  }

  handleNotesChange(event){
    let newSongState = this.state.thisSong;
    newSongState.notes = event.target.value;
    this.setState({ thisSong: newSongState });
  }

  handleLyricChange(event){
    let newSongState = this.state.thisSong;
    newSongState.lyrics = event.target.value;
    this.setState({ thisSong: newSongState });
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
        <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}>Delete Song</button>

        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} value={thisSong.title} onChange={this.handleTitleChange.bind(this)}/>
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className="form-group">
          <label>Notes (optional) </label>
          <input type="text" placeholder="e.g. 'Slow Blues key of E'" className="form-control" {...notes} value={thisSong.notes} onChange={this.handleNotesChange.bind(this)}/>
        </div>

        <div className={`form-group ${lyrics.touched && lyrics.invalid ? 'has-danger' : ''}`}>
          <label>Lyrics</label>
          <textarea className="form-control" rows="10" {...lyrics} value={thisSong.lyrics} onChange={this.handleLyricChange.bind(this)}/>
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

function mapStateToProps(state){
  return { userProfile: state.userProfile, thisSong: state.thisSong };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateSong, editSong, saveUserProfile, deleteSong }, dispatch);
}

// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({
  form: 'SongsEdit',
  fields: ['title', 'notes', 'lyrics'],
  // validate
}, mapStateToProps, mapDispatchToProps)(SongsEdit);

////// old code below

// export default reduxForm({
//   form: 'SongsNew',
//   fields: ['title', 'notes', 'lyrics'],
//   validate,
//   mapStateToProps
// }, null, { updateSong, editSong, saveUserProfile, deleteSong })(SongsEdit);


// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// export default connect(mapStateToProps, mapDispatchToProps)(SongsEdit);



