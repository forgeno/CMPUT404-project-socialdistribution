import React, { Component } from 'react';
import { Dropdown, Modal } from 'semantic-ui-react';
import AnimatedButton from './AnimatedButton';
import './styles/VisibilitySettings.css';
import HTTPFetchUtil from '../util/HTTPFetchUtil.js';

//import {connect} from 'react-redux';

function getMyFriends() {
//	var userID = "Kevin";  
//	const requireAuth = true,
//		urlPath = "/api/author/{}/friends/".format(self.userID),
//		HTTPFetchUtil.getRequest(urlPath, requireAuth)
//		.then((httpResponse) => {
//			if(httpResponse.status === 200) {
//				httpResponse.json().then((results) => {
//				return(results);
//				})
//			}
//		})
//		.catch((error) => {
//		console.error(error);
//		});

		return [{key: 'Placeholder', text: 'Placeholder', value: 'Placeholder'},
		];
}



class VisibilitySettings extends Component {
	componentWillMount() {
		this.setState({
			multiple: true,
			search: true,
			searchQuery: null,
			value: [],
			options: getMyFriends(),
			visibility: this.props.visibility,
			open: false,
			showModal: false,
		})
	}
	
	openCloseDropdown = () => {
		if (this.state.showModal === false) {
			this.setState({
				open: !this.state.open,
			});
		}
	}
	
	handleVisibilityChange = (e, { value }) => {
		this.setState({ visibility: value });
		this.props.handleChange('visibility', {value});
	}

	handleChange = (e, { value }) => {
		this.setState({ value });
		console.log(value);
		this.props.handleChange('visibleTo', {value});
	}
		
	handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery })
	
	closeModal = () => {
		this.setState({
			showModal: false, 
			visibility: 'PRIVATE',
			});
		this.props.handleChange('visibility', {value: 'PRIVATE'});
	}
	
	render() {
		const { multiple, options, search, value} = this.state;

		return (
			<Dropdown text={this.state.visibility} open={this.state.open} onClick={this.openCloseDropdown} labeled button className='dropDownBar'>
				<Dropdown.Menu open={this.state.open}>
					<Dropdown.Header icon='tags' content='Visible To' />
					<Dropdown.Divider />
					<Dropdown.Item text='PUBLIC' value="PUBLIC" onClick={this.handleVisibilityChange}/>
					<Dropdown.Item text='FRIENDS' value="FRIENDS" onClick={this.handleVisibilityChange}/>
					<Dropdown.Item text='FOAF' value="FOAF" onClick={this.handleVisibilityChange}/>
					<Dropdown.Item text='SERVERONLY' value="SERVERONLY" onClick={this.handleVisibilityChange}/>
					<Dropdown.Item text='PRIVATE' value="PRIVATE" onClick={ () => this.setState({showModal: true, open: false})}/>
				
					<Modal 
					open={this.state.showModal}
					onClose={this.closeModal}
					>
					<Modal.Header> Who should be able to see your post? </Modal.Header>
						<Modal.Content>
							<Dropdown
								fluid
								selection
								multiple={multiple}
								closeOnChange={true}
								search={search}
								options={options}
								value={value}
								placeholder='Add Users'
								onChange={this.handleChange}
								onSearchChange={this.handleSearchChange}
							/>
						</Modal.Content>
						<Modal.Actions>
							<AnimatedButton iconForButton="checkmark icon" buttonText="Close" clickFunction={this.closeModal}/>
						</Modal.Actions>
					</Modal>
				</Dropdown.Menu>
			</Dropdown>
		)
	}
}

export default VisibilitySettings;