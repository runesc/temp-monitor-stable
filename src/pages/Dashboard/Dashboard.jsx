import React, { Component, createRef } from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";
import { auth, database } from '@/config/firebase'


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

import { chartExample1 } from "@/variables/charts.js";


class Dashboard extends Component {

	state = {
		connDevices: [],
		selectedDevice: 0,
		prevListenedDevice: 0,
		listenDevice: 0,
		chartData: {
			labels: ["", "", "", "", ""],
			datasets: [{
				data: [10,20,0, 40,20],
				backgroundColor: ['rgba(255, 0, 0, 0.2)']
			},
			{
				data: [],
				backgroundColor: ['rgba(54, 162, 235, 0.2)'],
				type: 'line'
			}]
		},
		options: {
			scales: {
			  xAxes: [{
				type: 'realtime'
			  }],
			  yAxes: [
			  {
				barPercentage: 1.6,
				gridLines: {
				  drawBorder: false,
				  color: "rgba(29,140,248,0.0)",
				  zeroLineColor: "transparent",
				},
				ticks: {
				  suggestedMin: 0,
				  suggestedMax: 60,
				  padding: 20,
				  fontColor: "#9a9a9a",
				},
			  },
			],
			},
			plugins: {
			  streaming: {}
			}
		}
	}
	chartRef = createRef();

	componentDidMount = () => {
		/*const dbRef = database.ref('/dispositivos/')

		let temperature = []
		let humidity = []
		let labels = []

		// Buscar cambios en los dispositivos
		dbRef.on('value', (snapshot) => {
			const data = snapshot.val().filter(e => {return e != null}) // Limpiar campo null

			temperature.push(data[0].temp)
			humidity.push(data[0].hum)
			labels.push(new Date().toLocaleTimeString('es-mx',{hour:'2-digit',minute:'2-digit',second:'2-digit'}) )
			this.setState({
				connDevices: [...data],
				chartData: {
					labels: [...labels],
					datasets: [{
						data: [...temperature],
						backgroundColor: ['rgba(255, 0, 0, 0.2)']
					},
					{
						data: [...humidity],
						backgroundColor: ['rgba(54, 162, 235, 0.2)'],
						type: 'line'
					}]
				}
			})
		})*/
	}

	// Obtener y actualizar el la grafica que se escuchará
	getIndex = listenDevice => this.setState({listenDevice, selectedDevice: listenDevice})


	render() {
		const { connDevices, chartData } = this.state
		return (
			<div className="wrapper">
				<div className="main-panel">
					<AdminNavbar brandText="MONITOREO DE TEMPERATURA"/>

					<div className="content">
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
						{ /**  LISTA DE DISPOSITIVOS  */ }
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
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;