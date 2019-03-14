import React, { Component} from 'react';
import { Feed } from 'semantic-ui-react';
import StreamPost from '../components/StreamPost';
import YourStreamPost from '../components/YourStreamPost';
import HTTPFetchUtil from '../util/HTTPFetchUtil.js';
import PropTypes from 'prop-types';

class StreamFeed extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			events: [],
		};
		this.getPosts = this.getPosts.bind(this);
		this.createPostFromJson = this.createPostFromJson.bind(this);
	};	

	createPostFromJson(payload){
		return(
			<StreamPost 
			key={payload.id}
			username={payload.author.displayName} 
			profilePicture={null}
			date={payload.published}
			title={payload.title}
			description={payload.description}
			content={payload.content}
			contentType={payload.contentType}
			
			author={payload.author.id}
			viewingUser={this.state.userID}
			/>
		)
	};
	
	componentDidMount() {
		this.getPosts();							
	}

	getPosts() {
		const requireAuth = true, urlPath = this.props.urlPath;
			HTTPFetchUtil.getRequest(urlPath, requireAuth)
			.then((httpResponse) => {
				if(httpResponse.status === 200) {
					httpResponse.json().then((results) => {	
						this.setState({
							posts: results.posts,
						});
						var postList = [];
						this.state.posts.forEach(result => {
							postList.push(this.createPostFromJson(result));
						});
						
						this.setState({events: postList});
					})
				}
				else {
					alert("Failed to fetch posts");
				}
			})
			.catch((error) => {
				console.error(error, "ERROR");
			});
	}
	
	render() {
		return(	
			<Feed>
				{this.state.events}
			</Feed>
		)
    }
}

StreamFeed.propTypes = {
	urlPath: PropTypes.string,
	userID: PropTypes.string,
}

export default StreamFeed;