import React from 'react';
import { Message } from 'semantic-ui-react';
import './styles/NotFound.css';
const NotFound = () => {
    return (
        <div className="container">
			<img className="hmm" alt="hmm" src={require('../assets/images/hmm.png')}/>
        	<h1 className="text404"> 404 </h1>
        
        	<Message as="h2"
            className="notFoundMessage"
            negative
            >
            <Message.Header> Not Found </Message.Header>
            <p>The page you're looking for does not exist.</p>
            </Message>
        </div>
    )
}

export default NotFound