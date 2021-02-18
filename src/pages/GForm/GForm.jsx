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
    render() {
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
													
													type="text"
												/>
											</FormGroup>
										</Col>
										<Col className="px-md-1" md="3">
											<FormGroup>
												<label>Area</label>
												<Input placeholder="Area" type="text" />
											</FormGroup>
										</Col>
										<Col className="pl-md-1" md="4">
											<FormGroup>
												<label>Ubicacion</label>
												<Input placeholder="Area (ejemplo:sala1)" type="text" />
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
										<h5 className="title">Mike Andrew</h5>
									</a>
									<p className="description">Ceo/Co-Founder</p>
								</div>
								<div className="card-description">
									Do not be scared of the truth because we need to restart the
									human foundation in truth And I love you like Kanye loves
									Kanye I love Rick Owens’ bed design but the back is...
								</div>
							</CardBody>
							<CardFooter>
								<div className="button-container">
									<Button className="btn-icon btn-round" color="facebook">
										<i className="fab fa-facebook" />
									</Button>
									<Button className="btn-icon btn-round" color="twitter">
										<i className="fab fa-twitter" />
									</Button>
									<Button className="btn-icon btn-round" color="google">
										<i className="fab fa-google-plus" />
									</Button>
								</div>
							</CardFooter>
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
                           type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Nombre del contacto</label>
                        <Input defaultValue="" type="text" />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Telefono del contacto</label>
                        <Input placeholder="telefono" type="tel" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Apellido</label>
                        <Input defaultValue="Mike" type="text" />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Email</label>
                        <Input placeholder="email" type="email" />
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
                    
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">Ceo/Co-Founder</p>
                </div>
                <div className="card-description">
                  Do not be scared of the truth because we need to restart the
                  human foundation in truth And I love you like Kanye loves
                  Kanye I love Rick Owens’ bed design but the back is...
                </div>
              </CardBody>
              <CardFooter>
                <div className="button-container">
                  <Button className="btn-icon btn-round" color="facebook">
                    <i className="fab fa-facebook" />
                  </Button>
                  <Button className="btn-icon btn-round" color="twitter">
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button className="btn-icon btn-round" color="google">
                    <i className="fab fa-google-plus" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
                
            </>
        );
    }
}

export default GForm;