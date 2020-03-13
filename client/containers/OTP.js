import React, { Component } from 'react';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class OTP extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			otp: ''
		}
		this.OTPHandler = this.OTPHandler.bind(this)
		this.submitHandler = this.submitHandler.bind(this)
	}
	componentDidMount() {
		const email = this.props.match.params.email;
		this.setState({ email });
		Alert.success('OTP sent on your Email Id !!!', {
            position: 'bottom-left',
            effect: 'slide',
            timeout: "none"
        });
	}
	OTPHandler(e) {
		const otp = e.target.value;
		this.setState({ otp });
	}
	submitHandler(e) {
		e.preventDefault()
		if(this.state.otp.length != 4) {
			Alert.error('Please enter a valid OTP!!!', {
	            position: 'bottom-left',
	            effect: 'slide',
	            timeout: "none"
	        });
		}
		else {
			const body = JSON.stringify(this.state);
			fetch('/otp',{
					method: 'POST',
					headers: {
					    'Content-Type': 'application/json'
				  	},
				  	body
				})
			    .then(response => {
			    if(response.ok) {
					this.props.history.push('/home');
				}
				else 
					Alert.error('Invalid OTP !!!', {
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
				      <legend className="f2 fw6 ph0 mh0 white">One Time Password</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="otp">OTP</label>
				        <input className="b--white pa2 input-reset ba bg-black-80 white w-100" type="text" name="otp"  id="otp" 
				        	value={this.state.otp} onChange={this.OTPHandler} />
				      </div>
				    </fieldset>
				    <div className="">
				      <button className="b ph3 pv2 input-reset ba b--black bg-white pointer f6 dib" onClick={this.submitHandler}>Sign In</button>
				    </div>
				   </form>
			    	<Alert stack={{limit: 1}} />
				</main>
			)
	}
}

export default OTP;