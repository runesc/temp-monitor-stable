import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// reactstrap components
import {
	Collapse,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	NavbarBrand,
	Navbar,
	NavLink,
	Nav,
	Container,
} from "reactstrap";

import { auth } from '@/config/firebase';
import avatar from '@/assets/img/default-avatar.png';


/*
	TODO: Añadir logica al navbar

*/

class AdminNavbar extends Component {

	state = {
		collapseOpen: false,
	}


	signOut = () => {
		auth.signOut().then(() => this.props.history.push('/auth/signin'))
	}

	render() {
		const {brandText, role, formControl} = this.props
		const {collapseOpen} = this.state
		return (
			<>
				<Navbar className='bg-dark' expand="lg">
					<Container fluid>
						<div className="navbar-wrapper">
							<div className="navbar-minimize d-inline">
								<NavbarBrand href="#!" className="text-white" onClick={(e) => e.preventDefault()}>
              						{ brandText }
            					</NavbarBrand>
							</div>
						</div>
						<Collapse navbar isOpen={collapseOpen}>
						<Nav className="ml-auto" navbar>
							<UncontrolledDropdown nav>
								<DropdownToggle
									caret
									color="info"
									data-toggle="dropdown"
									nav
								>
									<div className="d-none d-lg-block d-xl-block" style={{paddingTop: "0.3rem"}} /> {/* INYECTAR AQUÍ LA CLASS NOTIFICATION SI HAY ALGUNA */}
									<i className="tim-icons icon-bell-55" />
									<p className="d-lg-none">Notifications</p>
								</DropdownToggle>
								<DropdownMenu className="dropdown-navbar" right tag="ul">

									{
										/* MAPEAR ESTE NAVLINK PARA ITERAR LAS NOTIFICACIONES */
									}

									<NavLink tag="li">
										<DropdownItem className="nav-item">
											Mike John responded to your email
										</DropdownItem>
									</NavLink>
								</DropdownMenu>
							</UncontrolledDropdown>
							<UncontrolledDropdown nav>
								<DropdownToggle
									caret
									color="default"
									data-toggle="dropdown"
									nav
									onClick={(e) => e.preventDefault()}
								>
									<div className="photo">
										<img
											alt="..."
											src={avatar}
										/>
									</div>
									<b className="caret d-none d-lg-block d-xl-block" />
									<p className="d-lg-none">Log out</p>
								</DropdownToggle>
								<DropdownMenu className="dropdown-navbar" right tag="ul">
									<NavLink tag="li">
										<DropdownItem className="nav-item">Settings</DropdownItem>
									</NavLink>
									{
										role === 'god' ? (
											<NavLink tag="li" onClick={formControl}>
												<DropdownItem className="nav-item" >God opt</DropdownItem>
											</NavLink>
										): null
									}
									<DropdownItem divider tag="li" />
									<NavLink tag="li">
										<DropdownItem className="nav-item" onClick={(e) => this.signOut()}>Log out</DropdownItem>
									</NavLink>
								</DropdownMenu>
							</UncontrolledDropdown>
							<li className="separator d-lg-none" />
						</Nav>
					</Collapse>
					</Container>
				</Navbar>
			</>
		);
	}
}

export default withRouter(AdminNavbar);