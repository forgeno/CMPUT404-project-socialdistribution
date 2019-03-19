import React, { Component} from 'react';
import StreamFeed from '../components/StreamFeed';
import store from '../store/index.js';
import './styles/PublicStream.css';

class PublicStream extends Component {	
	
	render() {
		const storeItems = store.getState().loginReducers;
		return(	
			<div className="pusher">
			<h1 className="publicStreamHeader"> Public Stream </h1>
				<StreamFeed storeItems={storeItems} urlPath="/api/posts/" />
			</div>
			)
    }
}


export default PublicStream;