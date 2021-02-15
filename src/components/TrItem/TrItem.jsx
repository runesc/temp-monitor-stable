import React, { Component } from 'react';

import {Button} from 'reactstrap'

class TrItem extends Component {
	render() {
		const { loc, temp, hum, contact, getIndex, voltage } = this.props
		return (
			<tr>
				<td><input type="checkbox" onClick={getIndex} /></td>
				<td>xd</td>
				<td>ds</td>
				<td> { loc ? loc : 'N/A' } </td>
				<td><span className="text-danger">{ temp } (°C)</span></td>
				<td><span className="text-info"> { hum }% </span></td>
				<td>{ contact ? contact : 'N/A' }</td>
				<td>
					<Button className="btn-round" color="info" size="sm" onClick={getIndex} > Mostrar grafico </Button>
				</td>
				<td><span className="text-warning"> { voltage ? voltage : '0'}v </span></td>
			</tr>
		);
	}
}

export default TrItem;