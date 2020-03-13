import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import { validateEmail } from '../utils/index';

class LoginForm extends Component {
	constructor() {
		super()
		this.state = {
			email: '',
			password: ''
		}
		this.emailHandler = this.emailHandler.bind(this)
		this.passwordHandler = this.passwordHandler.bind(this)
		this.submitHandler = this.submitHandler.bind(this)
	}
	componentDidMount() {
		if(localStorage.getItem('loggedIn'))
			this.props.history.push('/disease');
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
		const validEmail = validateEmail(this.state.email)
		if(!validEmail && this.state.password == '') {
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
						fetch('/login',{
							method: 'POST',
							headers: {
							    'Content-Type': 'application/json'
						  	},
						  	body
						})
						.then(docs => docs.json())
					    .then(response => {
					    if(response.success) {
					    	localStorage.setItem('loggedIn', 'true');
							this.props.history.push('/disease');
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
				<main className=" bg-black-50 br4 pa5 white">
				  <form className="measure center br4 pa5" autoComplete="off">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0 white">Login</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input className="b--white pa2 input-reset ba bg-black-80 white w-100" type="email" name="email-address"  id="email-address" 
				        	value={this.state.email} onChange={this.emailHandler} />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input className="b--white b pa2 input-reset ba bg-black-80 white w-100" type="password" name="password"  id="password" 
				        	value={this.state.password} onChange={this.passwordHandler} />
				      </div>
				    </fieldset>
				    <div className="">
				      <button className="b ph3 pv2 input-reset ba b--black bg-white pointer f6 dib" onClick={this.submitHandler}>Sign In</button>
				    </div>
				    <div className="lh-copy mt3">
				      <Link to="/signUp" className="f6 link dim white db">Sign up</Link>
				    </div>
				  </form>
              		<Alert stack={{limit: 1}} />
				</main>
			)
	}
}

export default LoginForm;