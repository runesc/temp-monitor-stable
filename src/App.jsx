import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";


import Dashboard from '@/pages/Dashboard/Dashboard';
import Lockscreen from '@/pages/Lockscreen/Lockscreen';


import { AuthProvider } from '@/providers/AuthProvider';
import PrivateRoute from "@/PrivateRoute";



class App extends Component {
	render() {
		return (
			<AuthProvider>
				<Router>
			  		<>
					  <PrivateRoute exact path="/admin/dashboard" component={Dashboard} />
					  <Route exact path="/auth/lock-screen" component={Lockscreen} />
			  		</>
			</Router>
		  </AuthProvider>
		);
	}
}

export default App;