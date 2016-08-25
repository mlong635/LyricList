import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOneSong } from '../actions/actions'

class SongsShow extends Component {

  componentWillMount(){
    console.log("this.props.params", this.props.params);
    this.props.fetchOneSong(this.props.params.id);
  }

  render() {
    return <div> Show Song {this.props.params.id}</div>;
  }
}

export default connect(null, { fetchOneSong })(SongsShow);