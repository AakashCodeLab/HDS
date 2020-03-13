import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import unique from 'array-unique';

class AddDisease extends Component {
	constructor() {
		super()
		this.state = {
			name: '',
			symptoms: []
		}
		this.nameHandler = this.nameHandler.bind(this)
		this.symptomsHandler = this.symptomsHandler.bind(this)
		this.submitHandler = this.submitHandler.bind(this)
	}
	componentDidMount() {
		if(!localStorage.getItem('loggedIn'))
			this.props.history.push('/disease');
	}
	nameHandler(e) {
		const name = e.target.value
		this.setState({ name })
	}
	symptomsHandler(values) {
		const symptoms = unique(values);
		this.setState({ symptoms })
	}
	submitHandler(e) {
		e.preventDefault()
		if(this.state.name == '' && this.state.password == '') {
			Alert.error('Please fill all the fields!!!', {
	            position: 'bottom-left',
	            effect: 'slide',
	            timeout: "none"
	        });
		}
		else {
			const body = JSON.stringify(this.state);
			fetch('/disease',{
				method: 'POST',
				headers: {
				    'Content-Type': 'application/json'
			  	},
			  	body
			})
			.then(docs => docs.json())
		    .then(response => {
		    if(response.success) {
				Alert.success(response.msg, {
		            position: 'bottom-left',
		            effect: 'slide',
		            timeout: "none"
		        });
			}
			else 
				Alert.error(response.msg, {
		            position: 'bottom-left',
		            effect: 'slide',
		            timeout: "none"
		        });
		  })
		  .catch(error => {
		    Alert.error(`Server Issue: ${error}`, {
	            position: 'bottom-left',
	            effect: 'slide',
	            timeout: "none"
	        });
		  });
		}
	}
	render() {
		return (
				<main className=" bg-black-50 br4 pa5 white">
				  <form className="measure center br4 pa5" autoComplete="off">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0 white">Add Disease</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input className="b--white pa2 input-reset ba bg-black-80 white w-100" type="text" name="name"  id="name" 
				        	value={this.state.name} onChange={this.nameHandler} />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="symptoms">Symptoms</label>
				        <TagsInput className="b--white b pa2 input-reset ba bg-black-80 white w-100" value={this.state.symptoms} onChange={this.symptomsHandler} id="symptoms"/>
				      </div>
				    </fieldset>
				      <button className="outline-0 f4 grow no-underline br-pill ba bw2 pa3 ma3 dib dark-green bg-black-80 pointer b--green" onClick={this.submitHandler}>Add Disease</button>
				      <Link to="/disease" className="outline-0 f4 grow no-underline br-pill ba bw2 pa3 ma3 dib dark-blue bg-black-80 pointer b--blue">Home</Link>
				  </form>
              		<Alert stack={{limit: 1}} />
				</main>
			)
	}
}

export default AddDisease;