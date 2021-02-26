import React, { Component } from 'react';
import { database } from '@/config/firebase';
import generateUniqueId from 'generate-unique-id'
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	CardText,
	FormGroup,
	Form,
	Input,
	Row,
	Col
} from "reactstrap";
import avatar from "@/assets/img/default-avatar.png";


class NewHosp extends Component {

	state = {
		hospName: '',
		area: '',
		location: '',
		address: '',
		adminName: '',
		adminPhone: ''
	}


	handleData = e => this.setState({[e.name] : e.value})


	uploadNewHosp = () => {
		const {hospName, area, location, address, adminName, adminPhone} = this.state

		const hospID = generateUniqueId()

		if (!hospName.trim() && !area.trim() && !location.trim() && !address.trim() && !adminName.trim() &&!adminPhone.trim()){
			this.props.notify("danger", "Error:", "Por favor rellena los campos correctamente.", "icon-simple-remove")
			return;
		}

		const hospital = {
			hospName, adminName, adminPhone, address,
			area: {
				[area]: {
					[location]: {
						new: true, devices: {}
					}
				}
			}
		}

		database.ref('hospitales/' + hospID).set(hospital).then(snapshot => {
			this.props.updateList(hospital, hospID) // inyectar hospital a firebase
		}).catch( () => {
			this.props.notify("danger", "Error (code 500) :", "No se ha podido registrar el hospital", "icon-simple-remove")
		})

		// clean state
		this.setState({ hospName: '', area: '', location: '', address: '', adminName: '', adminPhone: '' })
		this.props.notify("success", "Correcto:", "Se ha agregado un nuevo hospital", "icon-check-2")
	}


	render() {
		const {hospName} = this.state;
		return (
			<Row>
				<Col md="8">
					<Card className="bg-dark">
						<CardHeader>
							<h5 className="title">Crear nuevo hospital</h5>
						</CardHeader>
						<CardBody>
							<Form>
								<Row>
									<Col className="pr-md-1" md="5">
										<FormGroup>
											<label>Hospital </label>
											<Input
												placeholder="Nombre del Hospital"
												name="hospName"
												onChange={ e => this.handleData(e.target)}
												type="text"
											/>
										</FormGroup>
									</Col>
									<Col className="px-md-1" md="3">
										<FormGroup>
											<label>Area</label>
											<Input
												placeholder="Area"
												name="area"
												onChange={ e => this.handleData(e.target)}
												type="text" />
										</FormGroup>
									</Col>
									<Col className="pl-md-1" md="4">
										<FormGroup>
											<label>Ubicacion</label>
											<Input
												placeholder="Area (ejemplo:sala1)"
												name="location"
												onChange={ e => this.handleData(e.target)}
												type="text" />
										</FormGroup>
									</Col>
									<Col className="pr-md-1" md="6">
										<FormGroup>
											<label>Nombre del administrador </label>
											<Input
												placeholder="Nombre del encargado"
												name="adminName"
												onChange={ e => this.handleData(e.target)}
												type="tel"
											/>
										</FormGroup>
									</Col>
									<Col className="pr-md-1" md="5">
										<FormGroup>
											<label>Numero del administrador </label>
											<Input
												placeholder="Numero de celular"
												name="adminPhone"
												onChange={ e => this.handleData(e.target)}
												type="text"
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col md="12">
										<FormGroup>
											<label>Dirección del hospital</label>
											<Input
												name='address'
												placeholder="Dirección del hospital"
												onChange={ e => this.handleData(e.target) }
												type="text"
											/>
										</FormGroup>
									</Col>
								</Row>
							</Form>
						</CardBody>
						<CardFooter>
							<Button className="btn-fill float-right" color="info" onClick={ e => this.uploadNewHosp() }>
								Añadir Hospital
							</Button>
						</CardFooter>
					</Card>
				</Col>
				<Col md="4">
					<Card className="card-user bg-dark">
						<CardBody>
							<CardText />
							<div className="author">
								<div className="block block-one" />
								<div className="block block-two" />
								<div className="block block-three" />
								<div className="block block-four" />
								<a href="#pablo" onClick={(e) => e.preventDefault()}>
									<img
										alt="..."
										className="avatar"
										src={avatar}
									/>
									<h5 className="title">{hospName}</h5>
								</a>
								<p className="description"></p>
							</div>
							<div className="card-description text-center">
							</div>
						</CardBody>
					</Card>
				</Col>
			</Row>
		);
	}
}

export default NewHosp;