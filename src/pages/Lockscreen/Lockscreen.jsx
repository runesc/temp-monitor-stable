import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { auth, firebase } from "@/config/firebase"
// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	CardTitle,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Container,
	Alert,
	Col,
} from "reactstrap";

import avatar from '@/assets/img/default-avatar.png'
import { AuthContext } from "@/providers/AuthProvider";



class Lockscreen extends Component {
	static contextType = AuthContext

	state = {
		passFocus: false,
		email: "invitado@invitado.com",
		password: '',
		message: null
	}

	componentDidMount(){
		const { currentUser } = this.context

		// check if session exists
		if (currentUser){
			this.props.history.push('/admin/dashboard')
		}

		this.toggleClass()
	}

	toggleClass(){
		document.body.classList.toggle("lock-page");
		return () => {
			document.body.classList.toggle("lock-page");
		};
	}

	signIn = async e =>{
		const { history } = this.props
		e.preventDefault();

		const { email, password } = this.state

		if(!password.trim()){
			this.setState({message: "Contraseña incorrecta"})
			return
		}

		await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then( () => {
			// si el usuario logra iniciar sesion entonces ir a /admin/dashboard de lo contrario indicar un mensaje de error
			return auth.signInWithEmailAndPassword(email, password).then(() => history.push('/admin/dashboard')).then(() => this.setState({message: "Error intentalo de nuevo."}))
		}).catch(err => this.setState({message: err.message}))

	}

	render() {
		const { passFocus, password, message } = this.state
		return (
			<div className="content bg"> { /* añadir la class bg para agregar la imagen de fondo */}
				<Container>
					<Col className="ml-auto mr-auto" lg="4" md="6">
						{
							message ? <Alert color="danger">{ message }</Alert> : null
						}
						<Card className="card-lock card-white text-center">
							<CardHeader>
								<img alt="Imagen de invitado" src={avatar} />
							</CardHeader>
							<CardBody>
								<CardTitle tag="h4">Invitado</CardTitle>
								<InputGroup className="input-group-focus"   >
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="tim-icons icon-key-25" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										placeholder="Password"
										type="password"
										onChange={ e => this.setState({password: e.target.value}) }
									/>
								</InputGroup>
							</CardBody>
							<CardFooter>
								<Button
									className="btn-round"
									color="info"
									href="#pablo"
									size="lg"
									onClick={(e) => this.signIn(e)}
								>
									Unlock
								</Button>
							</CardFooter>
						</Card>
					</Col>
				</Container>
			</div>
		);
	}
}

export default withRouter(Lockscreen);