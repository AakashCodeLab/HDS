import React, { Component } from 'react';
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

import { validateEmail } from '../utils/index';

class SignUpForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			email: '',
			password: ''
		}
		this.nameHandler = this.nameHandler.bind(this)
		this.emailHandler = this.emailHandler.bind(this)
		this.passwordHandler = this.passwordHandler.bind(this)
		this.submitHandler = this.submitHandler.bind(this)
	}
	componentDidMount() {
		if(localStorage.getItem('loggedIn'))
			this.props.history.push('/disease');
	}
	nameHandler(e) {
		const name = e.target.value
		this.setState({ name })
	}
	emailHandler(e) {
		const email = e.target.value
		this.setState({ email })
	}
	passwordHandler(e) {
		const password = e.target.value
		this.setState({ password })
	}
	submitHandler(e) {
		e.preventDefault()
		const { name, email, password } = this.state;
		const validEmail = validateEmail(email)
		
		if(name.length == 0 || email.length == 0 || password.length == 0) {
			Alert.error('Please fill all the fields!!!', {
	            position: 'bottom-left',
	            effect: 'slide',
	            timeout: "none"
	        });
		}
		else if(!validEmail) {
					Alert.error('Please enter a valid Email ID', {
			            position: 'bottom-left',
			            effect: 'slide',
			            timeout: "none"
			        });
				}
					else {
						const body = JSON.stringify(this.state);
						fetch('/signUp',{
								method: 'POST',
								headers: {
								    'Content-Type': 'application/json'
							  	},
							  	body
							})
							.then(docs => docs.json())
						    .then(response => {
						    if(response.success) {
								this.props.history.push(`/otp/${this.state.email}`);
							}
							else 
								Alert.error('Invalid Credentials !!!', {
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
			<article className="pa4 w-50 center">
			  <form method="get" className="bg-black-50 br4 pa5 white"  autoComplete="off">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f2 fw6 ph0 mh0">Sign Up</legend>
			      <div className="mt3">
			        <label className="db fw4 lh-copy f6" htmlFor="name">Name</label>
			        <input className="b--white white pa2 input-reset ba bg-black-80 w-100 measure" type="text" name="name"  id="name"
			        	value={this.state.name} onChange={this.nameHandler} />
			      </div>
			      <div className="mt3">
			        <label className="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
			        <input className="b--white white pa2 input-reset ba bg-black-80 w-100 measure" type="email" name="email-address"  id="email-address"
			        	value={this.state.email} onChange={this.emailHandler} />
			      </div>
			      <div className="mt3">
			        <label className="db fw4 lh-copy f6" htmlFor="password">Password</label>
			        <input className="b--white white b pa2 input-reset ba bg-black-80 w-100 measure" type="password" name="password"  id="password"
			        	value={this.state.password} onChange={this.passwordHandler} />
			      </div>
			    </fieldset>
			    <div className="mt3">
			    	<button className="b ph3 pv2 input-reset ba b--black bg-white pointer f6 dib" onClick={this.submitHandler}>Sign Up</button>
				</div>
			  </form>
              <Alert stack={{limit: 1}} />
			</article>
			)
	}
}

export default SignUpForm;