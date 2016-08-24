import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSongs } from '../actions/actions';
import { Link } from 'react-router';

class SongsIndex extends Component {

  componentWillMount(){
    this.props.fetchSongs();
  }

  render(){
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/songs/new" className="btn btn-primary">
            Create a New Song
          </Link>
        </div>
        List of Songs
      </div>
    );
  }
}

export default connect(null, { fetchSongs })(SongsIndex);