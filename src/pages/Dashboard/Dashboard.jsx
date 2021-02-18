import React, { Component, createRef } from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";
import { auth, database } from '@/config/firebase'

import { AuthContext } from "@/providers/AuthProvider";
import { chartExample1 } from "@/variables/charts.js";
// reactstrap components
import {
	Button,
	ButtonGroup,
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	Table,
	Row,
	Col
} from "reactstrap";


import AdminNavbar from '@/components/AdminNavbar/AdminNavbar';
import TrItem from '@/components/TrItem/TrItem';
import GForm from '@/pages/GForm/GForm';


class Dashboard extends Component {
	static contextType = AuthContext

	state = {
		userInfo: {},
		userDbInfo: {},
		showForm: false,
		connDevices: [],
		selectedDevice: 0,
		prevListenedDevice: 0,
		listenDevice: 0,
		chartData: {},
		options: {},
	}

	chartRef = createRef(); // Esto es una ref (se usará para el streaming del grafico)

	// Obtener y actualizar el la grafica que se escuchará
	getIndex = listenDevice => this.setState({listenDevice, selectedDevice: listenDevice})

	// Esta funcion está desactualizada pero es un mal necesario
	componentWillMount = () => this.setState({userInfo: this.context.currentUser})

	showForm = () => this.setState({showForm: !this.state.showForm}) // crear switch de formuario

	render() {
		const { connDevices, chartData, userDbInfo, showForm } = this.state
		return (
			<div className="wrapper">
				<div className="main-panel">
					<AdminNavbar brandText="MONITOREO DE TEMPERATURA" role={userDbInfo.role} formControl={(e) => this.showForm()}/>

					<div className="content">
						{
							showForm ? (<GForm/>): (
						<>
						<Row>
							<Col xs="12">
								<Card className="card-chart">
									<CardHeader>
										<Row>
											<Col className="text-left" sm="6">
												<h5 className="card-category">Datos de</h5>
												<CardTitle tag="h2">Ubicación Del Dispositivo</CardTitle>
				  							</Col>
										</Row>
									</CardHeader>
									<CardBody>
										{
											/**
												AñADIR INFORMACIÓN DEL GRAFICO AQUÍ
											*/
										}
										<div className="chart-area">
				  							<Line ref={this.chartRef} data={chartData} options={chartExample1.options} />
										</div>
			  						</CardBody>
								</Card>
							</Col>
						</Row>
						<Row>
							<Col lg="12">
								<Card className="bg-dark">
									<CardHeader>
										<div className="tools float-right">
											<UncontrolledDropdown>
												<DropdownToggle caret className="btn-icon" color="link" data-toggle="dropdown" type="button" >
					  								<i className="tim-icons icon-settings-gear-63" />
												</DropdownToggle>

												<DropdownMenu right>
													<DropdownItem onClick={(e) => e.preventDefault()}>
														Añadir dispositivo
					  								</DropdownItem>
													<DropdownItem onClick={(e) => e.preventDefault()}>
														Editar dispositivo
					  								</DropdownItem>
													<DropdownItem className="text-danger" href="#pablo" onClick={(e) => e.preventDefault()}>
														Eliminar dispositivo
					 	 							</DropdownItem>
												</DropdownMenu>
											</UncontrolledDropdown>
										</div>
										<CardTitle tag="h5"> Tabla de dispositivos </CardTitle>
									</CardHeader>
									<CardBody>
										<Table responsive>
											<thead className="text-primary">
												<tr>
													<th>#</th>
													<th>Hospital</th>
													<th>área</th>
													<th>Ubicación</th>
													<th className="text-danger">Temperatura</th>
													<th className="text-info">Humedad</th>
													<th>Contacto</th>
													<th>Grafico</th>
													<th className="text-warning">Voltaje</th>
												</tr>
											</thead>
											<tbody>
												{
													// Mapear dispositivos conectados y listarlos
													connDevices.length >= 0 ? (
														connDevices.map((d, key) => <TrItem key={key} loc={d.Ubicacion} temp={d.temp} hum={d.hum} contact={d.Contacto} getIndex={ e => this.getIndex(key)} />)
													) : null
												}
											</tbody>
										</Table>
									</CardBody>
								</Card>
							</Col>
						</Row>
						</>
						)}
					</div>
				</div>
			</div>
		);
	}

	componentDidMount = () =>{
		const {userInfo} = this.state
		database.ref('users/' + userInfo.uid).once('value').then( snapshot => this.setState({userDbInfo: snapshot.val()}))
	}
}

export default Dashboard;