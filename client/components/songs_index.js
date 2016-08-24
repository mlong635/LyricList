import React, { Component } from 'react';

class PostsIndex extends Component {

  componentWillMount(){
    console.log("Testing songs_index.js componentWillMount");
  }

  render(){
    return (
      <div>List of Songs</div>
    );
  }
}

export default PostsIndex;