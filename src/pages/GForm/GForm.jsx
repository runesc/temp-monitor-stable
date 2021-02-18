import React, { Component } from 'react';
import avatar from "@/assets/img/default-avatar.png"
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
	Col,
} from "reactstrap";

class GForm extends Component {

    state = {
        hospName: '',
        hospArea: '',
        hospLoc: '',
        contactName: '',
        contactPhone: '',
        contactLastName: '',
        contactEmail: ''
    }

    handleData = (data) => {
        const {name, value} = data

        this.setState({ [name] : value })
    }

    render() {
        const { hospName, hospArea, hospLoc, contactName, contactPhone, contactLastName, contactEmail} = this.state;
        return (
            <>
               <Row>
					<Col md="8">
						<Card>
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
                                                    onChange={(e) => this.handleData(e.target)}
													type="text"
												/>
											</FormGroup>
										</Col>
										<Col className="px-md-1" md="3">
											<FormGroup>
												<label>Area</label>
												<Input
                                                placeholder="Area"
                                                name="hospArea"
                                                onChange={(e) => this.handleData(e.target)}
                                                type="text" />
											</FormGroup>
										</Col>
										<Col className="pl-md-1" md="4">
											<FormGroup>
												<label>Ubicacion</label>
												<Input
                                                    placeholder="Area (ejemplo:sala1)"
                                                    name="hospLoc"
                                                    onChange={(e) => this.handleData(e.target)}
                                                    type="text" />
											</FormGroup>
										</Col>
									</Row>
								</Form>
							</CardBody>
							<CardFooter>
								<Button className="btn-fill" color="primary" type="submit">
									Save
								</Button>
							</CardFooter>
						</Card>
					</Col>
					<Col md="4">
						<Card className="card-user">
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
									<p className="description">{hospArea}</p>
								</div>
								<div className="card-description text-center">
									{hospLoc}
								</div>
							</CardBody>
						</Card>
					</Col>
				</Row>
                <Row>
                    <Col md="8">
                        <Card>
                            <CardHeader>
                                <h5 className="title">Crear Nuevo  Contacto</h5>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col className="pr-md-1" md="5">
                                            <FormGroup>
                                                <label>Hospital asignado</label>
                                                <Input
                                                    name="hospAssigned"
                                                    onChange={(e) => this.handleData(e.target)}
                                                    type="text"/>
                                            </FormGroup>
                                        </Col>
                                        <Col className="px-md-1" md="3">
                                            <FormGroup>
                                                <label>Nombre del contacto</label>
                                                <Input
                                                name="contactName"
                                                onChange={(e) => this.handleData(e.target)}
                                                defaultValue="" type="text" />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pl-md-1" md="4">
                                            <FormGroup>
                                                <label>Telefono del contacto</label>
                                                <Input
                                                name="contactPhone"
                                                onChange={(e) => this.handleData(e.target)}
                                                placeholder="telefono" type="tel" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-md-1" md="6">
                                            <FormGroup>
                                                <label>Apellido</label>
                                                <Input
                                                name="contactLastName"
                                                onChange={(e) => this.handleData(e.target)}defaultValue="Mike" type="text" />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pl-md-1" md="6">
                                            <FormGroup>
                                                <label>Email</label>
                                                <Input
                                                name="contactEmail"
                                                onChange={(e) => this.handleData(e.target)}
                                                placeholder="email" type="email" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <label>Address</label>
                                                <Input
                                                defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                                placeholder="Home Address"
                                                type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-md-1" md="4">
                                            <FormGroup>
                                                <label>Ciudad</label>
                                                <Input defaultValue="Mike" type="text" />
                                            </FormGroup>
                                        </Col>
                                        <Col className="px-md-1" md="4">
                                            <FormGroup>
                                                <label>Direccion</label>
                                                <Input defaultValue="Andrew" type="text" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="8">
                                            <FormGroup>
                                                <label>Notas adicionales</label>
                                                <Input
                                                cols="80"
                                                defaultValue="Hospital de alta prioridad, verificar el servicio de manera inmediata"
                                                placeholder="Here can be your description"
                                                rows="4"
                                                type="textarea"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button className="btn-fill" color="primary" type="submit">
                                Save
                                </Button>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card className="card-user">
                            <CardBody>
                                <CardText />
                                <div className="author">
                                    <div className="block block-one" />
                                    <div className="block block-two" />
                                    <div className="block block-three" />
                                    <div className="block block-four" />
                                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                        <h5 className="title">{contactName + ' ' + contactLastName}</h5>
                                    </a>
                                    <p className="description">{contactEmail}</p>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </>
        );
    }
}

export default GForm;