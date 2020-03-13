import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
			<div className="tc bg-black-80 pa3">
				<h1 className="f1 white">404</h1>
				<h3 className="f3 white">The Page you're looking for is Not Found</h3>
				<hr/>
		      <Link to="/" className="f2 grow no-underline br-pill ba bw2 pa3 ma3 dib dark-blue">Goto Login</Link>
		      <Link to="/signUp" className="f2 grow no-underline br-pill ba bw2 pa3 ma3 dib dark-green">Goto SignUp</Link>
			</div>
		)
}

export default NotFound