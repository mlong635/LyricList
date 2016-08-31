import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSongs, fetchUserProfile } from '../actions/actions';
import { Link, browserHistory } from 'react-router';

class SongsIndex extends Component {

  componentWillMount(){
    console.log("songs_index componentWillMount() this.props", this.props);
    // this.props.fetchSongs();
    // this.props.fetchUserProfile();
  }

  renderSongs() {
    // console.log("this.props.songs", this.props.songs);
    
    if(this.props.userProfile){
      if(this.props.userProfile.songs.length===0){
        return (
          <li>
            You have no songs in your profile.  Please <Link to="/songs/new"> click Create a New Song </Link> to add a song to your profile!
          </li>
        );
      }

      return this.props.userProfile.songs.map((song) => {
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

  render(){
    console.log("songs_index render() this.props", this.props);

    let { userProfile } = this.props;
    // let { songs } = this.props;

    if(!userProfile) browserHistory.push('/login');

    // if(!songs) return <div>Loading...</div>;

    return (
      <div>
        <div className="text-xs-right">
          <Link to="/songs/new" className="btn btn-primary">
            Create a New Song
          </Link>
        </div>
        <h3>Your Songs</h3>
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

export default connect(mapStateToProps, { fetchSongs, fetchUserProfile })(SongsIndex);