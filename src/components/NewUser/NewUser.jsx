import React, { Component } from 'react';
import axios from 'axios';
import Select from "react-select";
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


class NewUser extends Component {

	state = {
		selectedHospital: null,
		name: '',
		lastname: '',
		phone: '',
		email: '',
		password: '',
		role: ''
	}

	// Esta funcion mapea la lista de hospitales recibidos por las props
	getOptions() {
		const {hospitales} = this.props
		var selectOptions = []

		// intentar mapear hospitales
		if(hospitales){
			Object.entries(hospitales).map( ([key, val]) => selectOptions.push( {value: key, label: val.hospName } ))
			return selectOptions
		}
	}

	// Esta funcion atrapa los datos que se escriben en el input y se envían al estado
	handleData = e => this.setState({[e.name]: e.value})


	/*
		Esta funcion se conecta a la api que se ha creado en heroku y se utiliza para crear un usuario
		nuevo en auth y asignarle un espacio en RTDB
	*/
	createUser = () => {
		const {selectedHospital, name, lastname, phone, email, password, role} = this.state;

		// Comprobar que por lo menos haya usuario y contraseña
		if (!email.trim() || !password.trim()){
			this.props.notify("danger", "Error:", "Por favor rellena los campos correctamente.", "icon-simple-remove")
			return // Romper flujo
		}

		// llamar aqui a la API hecha en heroku
		axios.post('http://localhost:5000/users', {
			name, lastname, phone, email, password,
			worksfot: selectedHospital,
			role
		}).then( response => {
			if (response.code === 200){
				this.props.notify("success", "Correcto:", "Se ha creado un nuevo usuario.", "icon-check-2")
				return
			}


			// TODO: Se notifica undefined
			this.props.notify('danger', `Error (${response.code}):`, `${response.message}`, "icon-simple-remove")
		}).catch( err => console.log(err))
	}

	render() {
		return (
			<Row>
				<Col md="8">
					<Card className="bg-dark">
						<CardHeader>
							<h5 className="title">Crear Nuevo Trabajador</h5>
						</CardHeader>
						<CardBody>
							<Form>
								<Row>
									<Col className="pr-md-1" md="3">
										<FormGroup>
											<label>Hospital asignado</label>
											<Select
												className="react-select info"
												classNamePrefix="react-select"
												placeholder="Selecciona un hospital"
												onChange={(value) => this.setState({selectedHospital: value.value})}
												options={this.getOptions()}
												/>
										</FormGroup>
									</Col>
									<Col className="px-md-1" md="3">
										<FormGroup>
											<label>Nombre del trabajador</label>
											<Input
												name="name"
												placeholder="Nombre"
												onChange={(e) => this.handleData(e.target)}
												type="text" />
										</FormGroup>
									</Col>
									<Col className="px-md-1" md="3">
										<FormGroup>
											<label>Apellido</label>
											<Input
												name="lastname"
												onChange={(e) => this.handleData(e.target)}
												placeholder="Apellido"
												type="text" />
										</FormGroup>
									</Col>
									<Col className="pl-md-1" md="3">
										<FormGroup>
											<label>Télefono</label>
											<Input
												name="phone"
												onChange={(e) => this.handleData(e.target)}
												placeholder="Télefono"
											   type="tel" />
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col className="pr-md-1" md="4">
										<FormGroup>
											<label>Email</label>
											<Input
												name="email"
												placeholder="Correo electronico"
												onChange={(e) => this.handleData(e.target)}
												type="email" />
										</FormGroup>
									</Col>
									<Col className="pl-md-1" md="4">
										<FormGroup>
											<label>Contraseña</label>
											<Input
												name="password"
												placeholder="Contraseña"
												onChange={(e) => this.handleData(e.target)}
												type="password" />
										</FormGroup>
									</Col>
									<Col className="pl-md-1" md="4">
										<FormGroup>
											<label>Rol</label>
											<Select
												className="react-select info"
												classNamePrefix="react-select"
												placeholder="Rol del usuario"
												name="role"
												type="option"
												onChange={(value) => this.setState({role: value.value})}
												options={[
													{value: 'client', label: 'Cliente'},
													{value: 'admin', label: 'Administrador'}
												]}
												/>
										</FormGroup>
									</Col>
								</Row>
							</Form>
						</CardBody>
						<CardFooter>
							<Button className="btn-fill float-right" color="info" type="submit" onClick={ () => this.createUser()}>
								Añadir
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
										{/*<h5 className="title">{contactName + ' ' + contactLastName}</h5>}*/}
									</a>
									{/*<p className="description">{contactEmail}</p>*/}
								</div>
						</CardBody>
					</Card>
				</Col>
			</Row>
		);
	}
}

export default NewUser;
