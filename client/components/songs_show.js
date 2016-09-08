import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOneSong, deleteSong, editSong, saveUserProfile, sendEmail } from '../actions/actions';
import { Link, browserHistory } from 'react-router';
let thisSong = null;

class SongsShow extends Component {

  componentWillMount(){
    console.log("songs_show this.props", this.props);
    console.log("songs_show this.state", this.state);
    this.props.saveUserProfile()
    .then( result => {
      console.log("SongsShow componentWillMount savedUserProfile ", result.payload.data);
      console.log("this.props.params.title", this.props.params.id);
      thisSong = result.payload.data.userProfile.songs.filter( song => {
        console.log ("inside filter song.title", song.title);
        return song.title === this.props.params.title;
      })[0];
      console.log("songsShow componentWIllMount thisSong", thisSong);
      this.setState({ userProfile: result.payload.data.userProfile, thisSong: thisSong });
    })
  }

  onEditClick() {
    browserHistory.push('/songs/edit/'+this.props.params.title)
  }

  onEmailClick() {
    return new Promise ((resolve, reject) => {
      let targetEmail = prompt("What email address would you like this sent to?");
      targetEmail ? resolve(targetEmail) : reject("Invalid Email entered")
    })
    .then((targetEmail) => {
      let emailInfo = {sender: this.state.userProfile.username, email: targetEmail, body: this.state.thisSong.lyrics};
      this.props.sendEmail(emailInfo);
    })
    .then((targetEmail) => {
      // console.log("just received targetEmail", targetEmail);
      alert("Your song has been sent!");
    })
    .catch( error => console.log("onEmailClick promise chain error", error));
  }

  onDeleteClick() {
    return new Promise ((resolve, reject) => {
      let userSure = confirm("Delete "+this.props.params.title+"?  Are you sure?  \n\nWARNING: This is permanent!");
      userSure ? resolve() : reject();
    })
    .then( () => {
      this.props.deleteSong({ userProfile: this.state.userProfile, deleteSong: this.props.params.title})
    })
    .then( () => {
      browserHistory.push('/user/'+this.state.userProfile._id)
    })
    .catch( error => console.log("onDeleteClick promise chain error", error));
  }

  renderLyrics(){
    var thisSong = this.state!==null ? this.state.thisSong : undefined;    
    if(thisSong){
      return thisSong.lyrics.split('\n').map((line) => {
        return (
          <li className="list-group-item">{line}</li>
        );
      });
    }
  }

  render() {
    

    if(!this.state) return <div>Loading...</div>;

    let { thisSong } = this.state;
    var userProfile = this.state!==null ? this.state.userProfile : undefined;
    var linkBack = userProfile ? '/user/'+userProfile._id : '/user/';

    return (
      <div>
        <Link to={linkBack}>Back to Your Song List</Link>
        <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}>Delete Song</button>
        <button className="btn btn-primary pull-xs-right" onClick={this.onEditClick.bind(this)}>Edit Song</button>
        <h3>Title: {thisSong.title}</h3>
        <h6>Notes: {thisSong.notes}</h6>
        <h6>Date Created: {thisSong.dateCreated}</h6>
        <h6>Last Updated: {thisSong.lastUpdated}</h6>

        <ul className="list-group">
          {this.renderLyrics()}
        </ul>
        <button className="btn btn-primary" onClick={this.onEmailClick.bind(this)}>Send these Lyrics in an Email</button>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { userProfile: state.userProfile, thisSong: state.thisSong };
}

export default connect(mapStateToProps, { saveUserProfile, fetchOneSong, deleteSong, editSong, sendEmail })(SongsShow);

