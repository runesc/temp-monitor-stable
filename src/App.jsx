import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";


import Dashboard from '@/pages/Dashboard/Dashboard';
import SignIn from '@/pages/SignIn/SignIn';


import { AuthProvider } from '@/providers/AuthProvider';
import PrivateRoute from "@/PrivateRoute";



class App extends Component {
	render() {
		return (
			<AuthProvider>
				<Router>
			  		<>
					  <PrivateRoute exact path="/admin/dashboard" component={Dashboard} />
					  <Route exact path="/auth/signin" component={SignIn} />
			  		</>
			</Router>
		  </AuthProvider>
		);
	}
}

export default App;