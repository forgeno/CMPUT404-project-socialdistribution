import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Comment, Header, Form, Input, Button, Loader} from 'semantic-ui-react';
import ProfileBubble from './ProfileBubble';
import Cookies from 'js-cookie';
import HTTPFetchUtil from "../util/HTTPFetchUtil";
import PropTypes from 'prop-types';
import { toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import './styles/CommentsInPost.css';

class CommentsOnPost extends Component {	

	constructor(props) {
		super(props);
		this.state = {
			comments: [],
			commentText: '',
			isFetching: false,
		};
		this.createCommentList = this.createCommentList.bind(this);
		this.getComments = this.getComments.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.submitComment = this.submitComment.bind(this);
	}

	componentDidMount() {
		this.getComments();
	}

	getComments() {
		this.setState({
			isFetching: true,
		});
		const requireAuth = true;
		const urlPath = "/api/posts/" + this.props.postID + "/comments/";
		// TODO use this one when comments implemented.
		// const urlPath = "/api/posts/" + this.props.postID;
		
			HTTPFetchUtil.getRequest(urlPath, requireAuth)
			.then((httpResponse) => {
				if(httpResponse.status === 200) {
					httpResponse.json().then((results) => {	
						var commentList = [];
						// TODO switch this when comments implemented
						// results.forEach(result => {
							// commentList.push(this.createCommentFromJson(result.comment));
						//}
						
						results.forEach(result => {
							commentList.push(this.createCommentFromJson(result));
						});
						
						this.setState({
							comments: commentList,
							isFetching: false,
						});
					})
				}
				else {
					toast(
						{
							type: 'error',
							icon: 'window close',
							title: 'Failed',
							description: <p> Failed to retrieve comments. </p>,
						}
					);
					// TODO no default comments here
					this.setState({
						isFetching: false,
						comments: this.props.comments,
					});
					console.log("EEE", this.state.isFetching);
				}
			})
			.catch((error) => {
				console.error(error, "ERROR");
			});
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}
	
	
	submitComment() {
		const urlPath = "/api/posts/" + this.props.postID + "/comments";
		const requireAuth = true;
		const requestBody = {
			comment: {
				author: {
					id: Cookies.get("userID"),
				},
				comment: this.state.commentText,
				contentType: "text/plain",
			}
		}
		
		HTTPFetchUtil.sendPostRequest(urlPath, requireAuth, requestBody)
		    .then((httpResponse) => {
		        if (httpResponse.status === 200) {
					this.setState({
						commentText: '',
					});	
					
					toast(
						{
							type: 'success',
							icon: 'check circle outline',
							title: 'Success',
							description: <p> Your comment was added successfully. </p>,
						}
					);
					this.getComments();						
		        }
		        else {
					toast(
						{
							type: 'error',
							icon: 'window close',
							title: 'Failed',
							description: <p> Failed to add comment </p>,
						}
					);
		        }
		    })
		    .catch((error) => {
		        console.error(error);
			});		
	}
	
	createCommentList(comment) {
		const commentID = comment.id;
		const author = comment.author.displayName;
		const authorID = comment.author.id;
		const date = comment.published;
		const commentText = comment.comment;
		return (
			<span key={commentID} className="singleComment">
				<Comment>
					<span className="profileBubbleInComment">
						<ProfileBubble 
							displayName={author} 
							userID={authorID}
							profilePicture={null} 
							profileBubbleClassAttributes={"ui circular bordered mini image"} 
						/>
					</span>
					
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
	//TODO: Change appearance in case of no comments
		return (
			<span>
				<Comment.Group>
					<Header as='h3' dividing>
						Comments
					</Header>
					<Loader active={this.state.isFetching}/>
					{this.state.comments.map(this.createCommentList)}
				</Comment.Group>
				<Form>
					<Input 	
								name="commentText"
								action={<Button onClick={this.submitComment}> Submit </Button>}
								className="commentInputBox" 
								placeholder="Add a comment..."
								size="small"
								value={this.state.commentText}
								onChange={this.handleChange}
					/>
				</Form>
			</span>
		);
	}
}

// TODO: Remove this default comment when comments implemented
CommentsOnPost.defaultProps = {
	comments: [
		{ 	"author": {
				"id":"http://git-friends.com/author/THIS-IS-A-TEST-AND-NOT-REAL",
				"url": "http://git-friends.com/author/THIS-IS-THE-SAME-IN-EXAMPLEARTICLEJSON",
				"host": "http://git-friends.com/",
				"displayName": "Greg Johnson",
				"github": "http://github.com/gjohnson",
			},
			"comment": "THIS IS MY COMMENT",
			"contentType": "text/markdown",
			"published": "2015-03-09",
			"id": "blah-blah-blah-blah-blah-blah-blah-blah-blah11"
		},
		{ 	"author": {
				"id":"http://git-friends.com/author/THIS-IS-A-TEST-AND-NOT-REAL",
				"url": "http://git-friends.com/author/THIS-IS-THE-SAME-IN-EXAMPLEARTICLEJSON",
				"host": "http://git-friends.com/",
				"displayName": "Kevin Johnson",
				"github": "http://github.com/kjohnson",
			},
			"comment": "ANOTHER ONE",
			"contentType": "text/markdown",
			"published": "2015-03-09",
			"id": "blah-blah-blah-blah-blah-blah-blah-blah-blah"
		},
	],
}

CommentsOnPost.propTypes = {
	postID: PropTypes.string.isRequired,
}

export default CommentsOnPost;
