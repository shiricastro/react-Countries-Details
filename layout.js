import React from 'react';
import Table from './table';
import Country from './country';

export default class layout extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			currentCountryName:""
		}
	}
	currentName(currentCountryName){
		const newState = this.state;
		newState['currentCountryName']= currentCountryName;
		this.setState(newState);
	}

	render(){
		return(
		<div className="containerLayout">
			<h1>Countries</h1>
			<div className="container">
				<Table countryName={currentCountryName=> this.currentName(currentCountryName)}/>
				<Country countryName={this.state.currentCountryName}/>
			</div>
		</div>);
	}
}