import React, { Component } from 'react';

class SongsShow extends Component {
  render() {
    return <div> Show Song {this.props.params.id}</div>;
  }
}

export default SongsShow;