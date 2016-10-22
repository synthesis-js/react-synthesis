// Comment.js
import React from 'react';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	postId: this.props.postData._id,
    	comments: [],
    	input: ''
    }
    this.getCommentsFromDB = this.getCommentsFromDB.bind(this);
  }

  componentDidMount() {
  	// if directed straight to view, get post id from window location
  	if(this.props.postData._id === undefined) {
  		let idString = window.location.pathname.split("/post/")[1];
  		this.state.postId = idString;
  	}
  	this.getCommentsFromDB();
  }

  getCommentsFromDB() {
  	let that = this;
  	let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if(xhr.status === 200 && xhr.readyState === 4) {
        that.filterComments(JSON.parse(xhr.responseText));
      }     
    }
    xhr.open('GET', '/api/comments');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
  }

  filterComments(commentData) {
  	// loop through comments, returning ones for current post
  	let postId = this.state.postId;
  	let filteredComments = commentData.filter(comment => {
  		if(comment.post_id === postId) {
  			return comment;
  		} 
  	})
  	this.setState({comments: filteredComments});
  }

  updateInput(e) {
  	// update state with changing input from comment box
  	let newInput = e.target.value;
  	this.setState({input: newInput});
  }

  addComment() {
  	let comment = this.state.input;
  	let postId = this.state.postId;
  	// build comment object
  	let commentObj = {};
  	commentObj.post_id = postId;
  	commentObj.body = comment;
  	// placeholder
  	commentObj.author = 'Mario';
  	commentObj.author_email = 'Mario@email.com';
  	// end placeholder

  	// push comments to comment list in state
  	let commentList = this.state.comments.slice();
  	commentList.push(commentObj);
  	this.setState({comments: commentList});

  	this.saveCommentToDB(commentObj)
  	this.clearInput();
  }

  saveCommentToDB(commentObj) {
  	let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if(xhr.status === 200 && xhr.readyState === 4) {
        console.log('saved')
      }     
    }
    xhr.open('POST', '/api/comment');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(commentObj));
  }

  clearInput() {
  	let input = '';
  	this.refs.commentInput.value = input;
  	this.setState({input: input});
  }

  render() {
  	let commentList = this.state.comments.map((comment, i) => {
  		return <div key={i}>{comment.body}</div>
  	})
  	
    return (
    	<div className="col-md-6 col-md-offset-3">
    		<h4>Comments</h4>
    		<div className="form-group">
    			<input className="form-control comment-box" ref="commentInput" placeholder="leave a comment" onChange={(e) => {this.updateInput(e)}} />

    			<button className="btn btn-default" onClick={(e) => {this.addComment(e)}}>Enter</button>
    		</div>
    		<div className="comment-list">
    			{commentList}
    		</div>
    	</div>
    )
  }
}

module.exports = Comments;
