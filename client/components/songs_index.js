import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSongs } from '../actions/actions';
import { Link } from 'react-router';

class SongsIndex extends Component {

  componentWillMount(){
    this.props.fetchSongs();
  }

  renderSongs() {
    return this.props.songs.map((song) => {
      return (
        <li className="list-group-item" key={song.id}>
          <span className="pull-xs-right">{song.notes}</span>
          <strong>{song.title}</strong>
        </li>
      );
    })
  }

  render(){
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
  return { songs: state.songs.all };
}

export default connect(mapStateToProps, { fetchSongs })(SongsIndex);