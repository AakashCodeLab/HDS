import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const styles = {
	h1: {
		'fontSize': '5em'
	}
};

class Main extends Component {
	constructor(props) {
		super(props)
		this.state = {
			
		}
	}
	componentDidMount() {
		if(localStorage.getItem('loggedIn'))
			this.props.history.push('/disease');
	}
	render() {
		return (
			<header className="sans-serif">
			  <div className="cover bg-left bg-center-l">
			    <div className="bg-black-50 pb5 pb6-m pb7-l">
			      <nav className="dt w-100 mw8 center"> 
			        <div className="dtc v-mid tr pa3">
			          <Link className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" to="/login" >Login</Link> 
			          <Link className="f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba" to="/signUp" >Sign Up</Link>
			        </div>
			      </nav> 
			      <div className="tc-l mt4 mt5-m mt6-l ph3">
			        <h1 className="f2 f1-l fw2 white-90 mb0 lh-title" style={styles.h1}>Disease Diagnostic System</h1>
			        <h2 className="fw1 f3 white-80 mt3 mb4">Diagnose which disease you have based on the symptoms</h2>
			        <Link className="f6 no-underline grow dib v-mid bg-blue white ba b--blue ph3 pv2 mb3" to="/login">Login</Link>
			        <span className="dib v-mid ph3 white-70 mb3">or</span>
			        <Link className="f6 no-underline grow dib v-mid white ba b--white ph3 pv2 mb3" to="/signUp">Sign Up</Link>
			      </div>
			    </div>
			  </div> 
			</header>
		)
	}
}

export default Main