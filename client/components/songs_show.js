import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOneSong } from '../actions/actions'

class SongsShow extends Component {

  componentWillMount(){
    console.log("this.props.params", this.props.params);
    this.props.fetchOneSong(this.props.params.id);
  }

  render() {
    console.log("this.props", this.props);
    let { song } = this.props;

    if(!song) return <div>Loading...</div>;

    return (
      <div>
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

export default connect(mapStateToProps, { fetchOneSong })(SongsShow);