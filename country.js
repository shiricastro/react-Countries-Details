import React from 'react';
import axios from 'axios'; 

export default class ContriesDetails extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data:[]
		}
	}
	componentWillReceiveProps(nextProps){
		if(this.props.countryName !== nextProps.countryName){
			axios.get('https://restcountries.eu/rest/v2/name/'+nextProps.countryName+'/').then(response=>{
				this.setState({
					data:response.data
				})
			})
		}
	}

	render(){
		const data = this.state.data;
		console.log(data);
		if(data[0] !== undefined){
			return(<div className="containerCountry">

		          <div className="card">
		            <div className="card-image">
		              <img src={data[0].flag}/>
		              <span className="card-title">{data[0].name}</span>
		            </div>
		            <div className="card-content">
		            	<ul>
		            		<li><span>Population:</span> {data[0].population}</li>
		            		<li><span>Area: </span>{data[0].area}</li>
		            		<li><span>Native Name: </span>{data[0].nativeName}</li>
		            		<li><span>Capital: </span>{data[0].capital}</li>
		            		<li><span>Code: </span>{data[0].alpha2Code}</li>
		            	</ul>
		            </div>
		          </div>

			</div>);			
		}else{
			return <div className="contentEmpty"></div>
		}

	}
}
