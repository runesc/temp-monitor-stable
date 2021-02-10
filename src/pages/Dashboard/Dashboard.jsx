import React, { Component } from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
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



class Dashboard extends Component {
	state = {
    dispositivos: [],
    defaultChart: 0,
    data: {
      labels: [],
      datasets: [{
          data: [],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  }
};

  bigChartData = () => {
    return [10,12,30,49]
  }

  setBgChartData = (name) => {}

  componentDidMount = async() => {
    const {dispositivos, defaultChart} = this.state

    let devices = database.ref('dispositivos') // Esto es una referencia a la db en firebase

    await devices.on('value', (snapshot) => {

      // Preparar los datos de la lista de dispositivos
      const data = snapshot.val()

      let d = []

      data.map((device) => {
        if(device){
         d.push(device)
        }
      })

      // Quiero que me actualices la lista dispositivos
      let deviceList = dispositivos
      deviceList = [...d]

      // Extraer datasets del dispostivo seleccionado por default
      let chartLabels = this.state.data.labels // aqui se cargan los datos de la linea de tiempo (por default es lista por lo tanto )
      chartLabels.push(new Date().toLocaleTimeString('es-mx',{hour:'2-digit',minute:'2-digit',second:'2-digit'}) )


      // Esto actualiza los datos del chart
      let chartDatasets = this.state.data.datasets[0].data
      if(deviceList[defaultChart].temp){
        chartDatasets.push(deviceList[defaultChart].temp)
      }

      this.setState({
        dispositivos: deviceList,
        data: {
          labels: [...chartLabels],
          datasets: [{
              data: [...chartDatasets],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      }
    })

    })

  }

  selectChartData = (defaultChart) =>{
    this.setState({defaultChart})
  }
	render() {
		const {dispositivos} = this.state;

		return (
			<div className="wrapper">
				<div className="main-panel" style={{backgroundColor: "#212121"}}>
					<AdminNavbar brandText='Monitoreo de temperatura'/>

<div className="content">
      { /**  Esto manipula los graficos de la pagina */}
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <Row>
                <Col className="text-left" sm="6">
                  <h5 className="card-category">Datos de</h5>
                  <CardTitle tag="h2">Ubicacion del dispositivo</CardTitle>
                </Col>
                <Col sm="6">
                  <ButtonGroup
                    className="btn-group-toggle float-right"
                    data-toggle="buttons"
                  >
                    <Button
                      color="info"
                      id="0"
                      size="sm"
                      tag="label"
                      className={classNames("btn-simple", {
                        active: this.bigChartData === "data1",
                      })}
                      onClick={() => this.setBgChartData("data1")}
                    >
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        Accounts
                      </span>
                      <span className="d-block d-sm-none">
                        <i className="tim-icons icon-single-02" />
                      </span>
                    </Button>
                    <Button
                      color="info"
                      id="1"
                      size="sm"
                      tag="label"
                      className={classNames("btn-simple", {
                        active: this.bigChartData === "data2",
                      })}
                      onClick={() => this.setBgChartData("data2")}
                    >
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        Purchases
                      </span>
                      <span className="d-block d-sm-none">
                        <i className="tim-icons icon-gift-2" />
                      </span>
                    </Button>
                    <Button
                      color="info"
                      id="2"
                      size="sm"
                      tag="label"
                      className={classNames("btn-simple", {
                        active: this.bigChartData === "data3",
                      })}
                      onClick={() => this.setBgChartData("data3")}
                    >
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        Sessions
                      </span>
                      <span className="d-block d-sm-none">
                        <i className="tim-icons icon-tap-02" />
                      </span>
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Line
                  data={this.state.data}
                />
								{/*options={chartExample1.options}*/}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      { /** Aqui va la lista de la ubicación de los sensores */}
      <Row>
        <Col lg="12">
          <Card>
            <CardHeader>
              <div className="tools float-right">
                <UncontrolledDropdown>
                  <DropdownToggle
                    caret
                    className="btn-icon"
                    color="link"
                    data-toggle="dropdown"
                    type="button"
                  >
                    <i className="tim-icons icon-settings-gear-63" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Another action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Something else
                    </DropdownItem>
                    <DropdownItem
                      className="text-danger"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Remove Data
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
              <CardTitle tag="h5">Tabla de dispositivos</CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Ubicación</th>
                    <th>Temperatura</th>
                    <th>Humedad</th>
                    <th>Contacto</th>
                    <th>Grafico</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    dispositivos.length !== 0 ? (
                      dispositivos.map( (i, k) =>
                        <h1 key={k}>Hola</h1>
                      )
                    ) : <tr>Sin datos</tr>
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