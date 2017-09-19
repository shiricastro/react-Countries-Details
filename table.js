import React from 'react';
import axios from 'axios'; 
import TableRow from './tableRow';

export default class ContriesTable extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data:[],
			search:"",
			range: 0,

			CBData:[
			{
				name:"name",
				value:"Name",
				type:"string",
				checked:true
			},
			{
				name:"population",
				value:"Population",
				type:"string",
				checked:true				
			},
			{
				name:"area",
				value:"Area",
				type:"string",
				checked:true				
			},
			{
				name:"flag",
				value:"Flag",
				type:"img",
				checked:true				
			},
			{
				name:"alpha2Code",
				value:"Code",
				type:"string",
				checked:true				
			},
			{
				name:"nativeName",
				value:"Native Name",
				type:"string",
				checked:false				
			},						
			{
				name:"capital",
				value:"Capital",
				type:"string",
				checked:false				
			},
			{
				name:"gini",
				value:"Gini",
				type:"string",
				checked:false				
			}							
			]
		}
	}
	inputChange(e){
		this.setState({
			[e.target.id]:e.target.value
		});
	}
	chackBoxChange(e){
		const chackBoxData = [];
		for(let i=0; i< this.state.CBData.length ; i++) {
			chackBoxData.push(Object.assign({},this.state.CBData[i]));
		}
		const type= chackBoxData.findIndex((x) => e.target.name === x.name);
		chackBoxData[type].checked = e.target.checked;
		this.setState({CBData: chackBoxData});
	}
	createCollection(){
		const {data, search, range} = this.state;  		
		if (!search && !range){
			return data;
		}
	    if(!search && range){
			return this.filterByRange(data);
		}
		if(search && !range){
			return this.filterBySearch(data);
		}
		return this.filterByRange(this.filterBySearch(data));
	}
	filterByRange(collection){
		const {range} = this.state;
		return collection.filter(x => x.population > range);	
	}
	filterBySearch(collection){
		const {search} = this.state; 
		return collection.filter(x => x.name.toLowerCase().indexOf(search) !== -1);	
	}
	componentDidMount(){
		axios.get('https://restcountries.eu/rest/v2/all').then(response => {
			const dataVal = response.data;
			this.setState({
				data:dataVal			
			})
		})
	}
	shouldComponentUpdate(nextProps,nextState){
		return this.state.range !== nextState.range  ||
			   nextState.search !== this.state.search ||
			   nextState.data.length !== this.state.data.length ||
			   nextState.CBData !== this.state.CBData;		
	}
	currentContryName(countryName){
		this.props.countryName(countryName);
	}
	render(){
		const dataToRender = this.createCollection();
		return(<div className="containerTabel">
				<div className="filterContainer">
					<div className="chackBox">
						{this.state.CBData.map((x, idx)=> (<label key={idx} data={x}>{x.value}<input type="checkbox" name={x.name} checked={x.checked} onChange={e => this.chackBoxChange(e)}/></label>))}	
					</div>
					<label>
						<span>Search: </span>
						<input type="search" value={this.state.search} id="search" onChange={e => this.inputChange(e)} className="searchInput"/>
					</label>
					<label>
					<span className="rangeSpan">MAX Range: </span>
						<input type="range" value={this.state.range} id="range" min="0" max="100000000" onChange={e => this.inputChange(e)} className="rangeInput"/>
						<span className="spanRange">{this.state.range}</span>
					</label>
				</div>
				<div className="wrapTable">
				<table>
					<thead>
						<tr>
							{this.state.CBData.map((x, idx)=> {if(x.checked){ return (<th key={idx} >{x.value}</th>)}})}
						</tr>
					</thead>
					<tbody>
						{dataToRender.map((obj, idx)=> (<TableRow onClick={()=> this.currentContryName(obj.name)} key={idx} data={obj} dataHeader={this.state.CBData.filter(x => x.checked)} />))}	
					</tbody>
				</table>
				</div>
			</div>);
	}
}
