import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSongs, fetchUserProfile } from '../actions/actions';
import { Link, browserHistory } from 'react-router';

class UserSongsIndex extends Component {

  componentWillMount(){
    // console.log("songs_index componentWillMount() this.props", this.props);
    // console.log("this.props.routeParams.id", this.props.routeParams.id);
    this.props.fetchUserProfile(this.props.routeParams.id)
    .then((response) => {
      console.log("UserSongsIndex fetchUserProfile response", response);
      let userInfo = {};
      userInfo.username = response.payload.data.username;
      userInfo.songs = response.payload.data.songs;
      console.log("userInfo ", userInfo);
      this.setState({ userProfile: userInfo });
    });
  }

  renderSongs() {
    var userProfile = this.state!==null ? this.state.userProfile : undefined;
    
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
            <li className="list-group-item" key={song._id}>
              <Link to={"songs/" + song._id}>
              <span className="pull-xs-right">{song.notes}</span>
              <strong>{song.title}</strong>
              </Link>
            </li>
          );
        }); 
      }
    }
  }

  render(){
    console.log("songs_index render() this.props", this.props);
    console.log("songs_index this.state", this.state);

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

export default connect(mapStateToProps, { fetchSongs, fetchUserProfile })(UserSongsIndex);