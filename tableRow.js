import React from 'react';


export default (props) => (<tr onClick = {props.onClick}>
	{props.dataHeader.map((x,idx) => {
		if(x.type === "string"){
			return(<td key={idx}>{props.data[x.name]}</td>)
		}else {
			return(<td key={idx}><img className="imgs" src={props.data[x.name]}/></td>)
		}})}

	</tr>); 