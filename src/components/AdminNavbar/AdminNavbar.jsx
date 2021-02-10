import React, { Component } from 'react';

// reactstrap components
import {
	Button,
	Collapse,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	Input,
	InputGroup,
	NavbarBrand,
	Navbar,
	NavLink,
	Nav,
	Container,
	Modal,
	UncontrolledTooltip,
  } from "reactstrap";

class AdminNavbar extends Component {
	render() {
		return (
			<>
				<Navbar className="navbar-absolute dark-navbar-fixed" expand="lg" style={{ position: "fixed", backgroundColor: "#1e1e2f" }}>
					<Container fluid>
						<div className="navbar-wrapper">
							<NavbarBrand onClick={(e) => e.preventDefault()} style={{color: "white"}}>
								{this.props.brandText}
							</NavbarBrand>
						</div>
					</Container>
				</Navbar>
			</>
		);
	}
}

export default AdminNavbar;