import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { auth, firebase } from "@/config/firebase"
import classnames from "classnames";
// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	CardTitle,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Container,
	Col,
  } from "reactstrap";

import cardInfo from '@/assets/img/card-info.png'
import './Signin.css'
import { AuthContext } from "@/providers/AuthProvider";


class SignIn extends Component {
	static contextType = AuthContext

	state = {
		emailFocus: false,
		passFocus: false,
		email:"",
		password:""
	}

	componentDidMount(){
		const { currentUser } = this.context
		// check if session exists
		if (currentUser){
			this.props.history.push('/admin/dashboard')
		}
		this.toggleClass()
	}


	toggleClass = () => {
		document.body.classList.toggle("login-page");
		return function cleanup() {
			document.body.classList.toggle("login-page");
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
		const {emailFocus, passFocus} = this.state;
		return (
			<div className="content add-margin">
				<Container>
					<Col className="ml-auto mr-auto" lg="4" md="6">
					<Form className="form">
							<Card className="card-login card-white">
								<CardHeader>
									<img
										alt="..."
										src={cardInfo}
									/>
									<CardTitle tag="h1">Log in</CardTitle>
								</CardHeader>
								<CardBody>
									<InputGroup
										className={classnames({
											"input-group-focus": emailFocus,
										})}
									>
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="tim-icons icon-email-85" />
											</InputGroupText>
										</InputGroupAddon>
										<Input
											placeholder="email"
											type="email"
											onChange={ e => this.setState({email: e.target.value}) }
										/>
											{
												/*onFocus={(e) => setState({ ...state, emailFocus: true })}
												onBlur={(e) => setState({ ...state, emailFocus: false })}*/
											}
									</InputGroup>
									<InputGroup
										className={classnames({
											"input-group-focus": passFocus,
										})}
									>
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="tim-icons icon-lock-circle" />
											</InputGroupText>
										</InputGroupAddon>
										<Input
											placeholder="Password"
											type="password"
											onChange={ e => this.setState({password: e.target.value}) }
										/>
											{/*onFocus={(e) => setState({ ...state, passFocus: true })}
											onBlur={(e) => setState({ ...state, pasFocus: false })}*/}
									</InputGroup>
								</CardBody>
								<CardFooter>
									<Button
										block
										className="mb-3"
										color="info"
										href="#pablo"
										onClick={e => this.signIn(e)}
										size="lg"
									>
										Iniciar sesión
									</Button>
								</CardFooter>
							</Card>
						</Form>
					</Col>
				</Container>
			</div>
		);
	}
}

export default withRouter(SignIn);