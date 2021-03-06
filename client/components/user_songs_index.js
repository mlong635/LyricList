import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchUserProfile, saveUserProfile } from '../actions/actions';
import { Link, browserHistory } from 'react-router';

class UserSongsIndex extends Component {

  componentWillMount(){
    
    this.props.fetchUserProfile(this.props.routeParams.id)
    .then((response) => {
      let userInfo = {};
      userInfo.username = response.payload.data.username;
      userInfo.songs = response.payload.data.songs;
      userInfo._id = response.payload.data._id;
      let newState = { userProfile: userInfo };
      this.props.saveUserProfile(newState);
      this.setState(newState);
    });
  }

  renderSongs() {
    var userProfile = this.state!==null ? this.state.userProfile : undefined;
    var linkBack = userProfile ? userProfile._id : '/user/';
    
    if(userProfile){
      if(userProfile.songs.length===0){
        return (
          <li>
            You have no songs in your profile.  Please <Link to="/songs/new"> click Create a New Song </Link> to add a song to your profile!
          </li>
        );
      }
      else {
        return userProfile.songs.map((song) => {
          return (
            <li className="list-group-item" key={song.title}>
              <Link to={"songs/" + song.title}>
              <span className="pull-xs-right">Notes: {song.notes}</span>
              <strong>{song.title}</strong>&nbsp;&nbsp;&nbsp;&nbsp;
              Date Created: {song.dateCreated}&nbsp;&nbsp;&nbsp;&nbsp;
              Last Updated: {song.lastUpdated}&nbsp;&nbsp;&nbsp;&nbsp;
              </Link>
            </li>
          );
        }); 
      }
    }
  }

  render(){
    console.log("user_songs_index render() this.props", this.props);
    console.log("user_songs_index this.state", this.state);

    var userProfile = this.state!==null ? this.state.userProfile : undefined;

    if(!userProfile) return <div>Loading...</div>;

    return (
      <div>
        <div className="text-xs-right">
          <Link to="/songs/new" className="btn btn-primary">
            Create a New Song
          </Link>
        </div>
        <h3>Welcome, {userProfile.username}!   Here are Your Songs:</h3>
        <ul className="list-group">
          {this.renderSongs()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { userProfile: state.userProfile };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUserProfile, saveUserProfile }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSongsIndex);