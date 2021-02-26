import React, { Component } from 'react';
import NotificationAlert from "react-notification-alert";
import NewHosp from '@/components/NewHosp/NewHosp';
import NewUser from '@/components/NewUser/NewUser';
import { database } from '@/config/firebase';


class GForm extends Component {

	state = {
		listaHospitales: {}
	}
	notificationAlertRef = React.createRef()

	/* Esta funcion recorre los hospitales ya existentes y los guarda en el
	estado para tener un registro de los hospitales existentes los cuales serán usados
	para cuando se cree un nuevo usuario y se asigne su lugar de trabajo*/
	componentDidMount = () => {
		database.ref('hospitales').once('value', snapshot => {
			this.setState({ listaHospitales: snapshot.val() })
		})
	}

	// Esta funcion actualiza la lista de hospitales para posteriormente enviarla como prop a NewUser
	updateList = (hospital, hospID) => {
		const {listaHospitales} = this.state;
		listaHospitales[hospID] = hospital

		this.setState({listaHospitales})
	}

	notify = (type, title="", message="", icon) => {
		let options = {
		   	place: 'tr',
		   	message: (
				<div>
					<div>
				   		<b>{title}</b> {message}
					</div>
			 	</div>
		   	),
		   	type: type,
		   	icon: `tim-icons ${icon}`,
		   	autoDismiss: 7,
		};
		this.notificationAlertRef.current.notificationAlert(options);
	};

	render() {
		const {listaHospitales} = this.state;
		return (
			<>
				<div className="rna-container">
        			<NotificationAlert ref={this.notificationAlertRef} />
      			</div>
				<NewHosp updateList={this.updateList} notify={this.notify}/>
				<NewUser hospitales={listaHospitales} notify={this.notify} />
			</>
		);
	}
}

export default GForm;