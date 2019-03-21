import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Comment, Header} from 'semantic-ui-react';
import Cookies from 'js-cookie';
import './styles/CommentsInPost.css';

class CommentsOnPost extends Component {	

	constructor(props) {
		super(props);
		this.state = {
		};
		this.createCommentList = this.createCommentList.bind(this);
	}

	createCommentList(comment) {
		const commentID = comment.id;
		const author = comment.author.displayName;
		const date = comment.published;
		const commentText = comment.comment;
		return (
			<span key={commentID} className="singleComment">
				<Comment>
      				<Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' className="commentAvatar" />
					<Comment.Content>
						<Comment.Author> {author} </Comment.Author>
						<Comment.Metadata> {date} </Comment.Metadata>
						<Comment.Text> {commentText} </Comment.Text>
					</Comment.Content>
				</Comment>
			</span>
		);
	}

	render() {
		return (
			<Comment.Group>
				<Header as='h3' dividing>
					Comments
				</Header>
				{this.props.comments.map(this.createCommentList)}
			</Comment.Group>
		);
	}
}

export default CommentsOnPost;