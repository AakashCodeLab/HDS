import React from 'react';

import NotFound from '../components/404';
import Main from './Main';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import Disease from './Disease';
import AddDisease from './AddDisease';
import OTP from './OTP';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends React.Component {
	render() {
		return (
			<div className="h-75">
				<div className="flex justify-center align-center">
					 <Router>
					      <Switch>
					      	<Route exact path="/" component={Main} />
					      	<Route path="/login" component={LoginForm}/>
					      	<Route path="/signUp" component={SignUpForm}/>
					      	<Route path="/otp/:email" component={OTP}/>
					      	<Route path="/disease" component={Disease}/>
					      	<Route path="/addDisease" component={AddDisease}/>
					      	<Route component={NotFound}/>
					      </Switch>
					  </Router>
				</div>
			</div>
		);
	}
}

export default App;
