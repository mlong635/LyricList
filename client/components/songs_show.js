import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOneSong, deleteSong } from '../actions/actions';
import { Link, browserHistory } from 'react-router';

class SongsShow extends Component {

  componentWillMount(){
    this.props.fetchOneSong(this.props.params.id);
  }

  onDeleteClick() {
    this.props.deleteSong(this.props.params.id)
    .then( () => browserHistory.push('/'));
  }

  render() {
    let { song } = this.props;

    if(!song) return <div>Loading...</div>;

    return (
      <div>
        <Link to="/">Back to Your Song List</Link>
        <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}>Delete Song</button>
        <h3>{song.title}</h3>
        <h6>Notes: {song.notes}</h6>
        <p>{song.lyrics}</p>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { song: state.songs.song}
}

export default connect(mapStateToProps, { fetchOneSong, deleteSong })(SongsShow);