import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class Disease extends Component {
	constructor(props) {
		super(props)
		this.state = {
			symptoms: [],
			selectedSymptoms: [],
			displayDisease: false,
			whichDisease: []
		}
		this.submitSymptom = this.submitSymptom.bind(this)
		this.renderDisease = this.renderDisease.bind(this)
		this.renderCheckBoxes = this.renderCheckBoxes.bind(this)
		this.checkBox = this.checkBox.bind(this)
		this.disease = this.disease.bind(this)
		this.checkedBox = this.checkedBox.bind(this)
		this.logOut = this.logOut.bind(this)
	}
	componentDidMount() {
		if(!localStorage.getItem('loggedIn'))
			this.props.history.push('/');
		else {
			fetch('/disease/allSymptoms',{
				method: 'GET',
				headers: {
				    'Content-Type': 'application/json'
			  	}
			})
			.then(docs => docs.json())
		    .then(response => {
			    if(response.success) {
			    	const symptoms = response.msg;
					this.setState({ symptoms });
				}
		  	});
		}
	}
	submitSymptom() {
		this.setState({ displayDisease: true });
		const body = JSON.stringify({symptoms:this.state.selectedSymptoms});
		fetch('/disease/symptoms',{
			method: 'POST',
			headers: {
			    'Content-Type': 'application/json'
		  	},
		  	body
		})
		.then(docs => docs.json())
	    .then(response => {
	    if(response.success) {
	    	const whichDisease = response.msg.map(disease => ({
	    		name: disease.name,
	    		symptoms: disease.symptoms
	    	}));
	    	this.setState({ whichDisease });
			Alert.success('Successfully Found your Disease!!', {
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
	checkedBox(e) {
		const id = e.target.id;
		const { selectedSymptoms, symptoms } = this.state;
		let tempSelectedSymptoms = selectedSymptoms;
		if(tempSelectedSymptoms.indexOf(symptoms[id]) == -1) {
			tempSelectedSymptoms.push(symptoms[id]);
		}
		else {
			const index = selectedSymptoms.indexOf(symptoms[+id]);
			tempSelectedSymptoms.splice(index,1);
		}
		this.setState({
			selectedSymptoms: tempSelectedSymptoms
		})
	}
	renderDisease() {
		let temp = [];
		const { whichDisease } = this.state;
		for(let i = 0; i < whichDisease.length; i++)
			temp.push(this.disease(whichDisease[i].name,whichDisease[i].symptoms));
		return temp;
	}
	disease(name,symptoms) {
		return (
			<div key={Math.random().toString().slice(-6)}>
				<h1 className="bg-black-70 f1">
					<div className="red pa2">
						Name: 
					</div>
					<div className="green">
						{name}
					</div>
					<div className="orange pa2">
						Symptoms: 
					</div>
					{symptoms.map((symptom,i) => <span key={i} className="blue ma2 f3 b dib pa2">{symptom}</span>)}
				</h1>
			</div>
		)
	}
	renderCheckBoxes() {
		let temp = [];
		const { symptoms } = this.state;
		for(let i = 0; i < symptoms.length; i++)
			temp.push(this.checkBox(symptoms[i],i));
		return temp;
	}
	checkBox(value,id) {
		return (
				<li className="dib ma2 bg-black-70 pointer f3 b pa4 white ba b--white" key={id}>
					<input id={id} type="checkbox" checked={this.state.selectedSymptoms.indexOf(value) != -1} onChange={this.checkedBox}/>
					<label htmlFor={id}>{value}</label>
				</li>
			
		)
	};
	logOut() {
		localStorage.removeItem('loggedIn');
			this.props.history.push('/');
	}
	render() {
		return (
			<div className='white tc'>
				<header className="sans-serif">
				  <div className="cover bg-left bg-center-l">
				    <div className="bg-black-30">
				      <nav className="dt w-100 mw8 center"> 
				        <div className="dtc v-mid tr pa3">
						  <button className="f6 fw4 bg-black-80 no-underline white pointer dn dib-ns pv2 ph3" onClick={this.logOut}>Logout</button> 
				        </div>
				      </nav>
				    </div>
				  </div>
				</header>       
				<h1 className='f1 green i'>Home Page</h1>
  				{
  				!this.state.displayDisease && this.state.symptoms && this.state.symptoms.length != 0 && 
					(
					<span>
						<h1 className="f1 blue">Select the Symptoms: </h1>
						<ul className="list">
							{this.renderCheckBoxes()}
						</ul>
	  					<button className="outline-0 f2 grow no-underline br-pill ba bw2 pa3 dib dark-blue bg-black-80 b--blue pointer" onClick={this.submitSymptom}>
	  						Save Symptoms
	  					</button>
						<Link className="outline-0 f2 grow no-underline br-pill ba bw2 pa3 ma3 dib dark-green bg-black-80"to='/addDisease'>Add Disease</Link>
					</span>
  					)
				}
				{
  					!this.state.displayDisease && (!this.state.symptoms || this.state.symptoms.length == 0) &&
					(
						<div className="flex justify-center flex-column">
							<h1 className="f1 blue">No Disease Exist Yet</h1>
							<Link className="outline-0 f2 grow no-underline br-pill ba bw2 pa3 ma3 dib dark-green bg-black-80"to='/addDisease'>Add Disease</Link>
						</div>
					)
  				}
  				{
  					this.state.displayDisease && 
  					(
						<div>
							{this.state.whichDisease.length != 0 && 
								(
									<span>
										<div className="f1 yellow bg-black-50 dib pa3 ba b--blue bw2">You may have the following Diseases but please consult a doctor : </div>
										{this.renderDisease()}
									</span>
								)
							}
							{this.state.whichDisease.length == 0 && 
								(
									<span>
										<div className="f1 red bg-black-50 dib pa3 ba b--blue bw2">Sorry no disease found for the selected symptom</div>
										<br/>
										<Link className="outline-0 f2 grow no-underline br-pill ba bw2 pa3 ma3 dib dark-green bg-black-80"to='/'>Home</Link>
									</span>
								)
							}
              				<Alert stack={{limit: 1}} />
						</div>
  					)
  				}
			</div>
		)
	}
}

export default Disease;