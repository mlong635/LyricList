import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOneSong, deleteSong, editSong, saveUserProfile } from '../actions/actions';
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

  onDeleteClick() {
    this.props.deleteSong(this.props.params.title)
    .then( () => browserHistory.push('/user/'+this.state.userProfile._id));
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
        <h3>{thisSong.title}</h3>
        <h6>Notes: {thisSong.notes}</h6>
        <p>{thisSong.lyrics}</p>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { userProfile: state.userProfile, thisSong: state.thisSong };
}

export default connect(mapStateToProps, { saveUserProfile, fetchOneSong, deleteSong, editSong })(SongsShow);