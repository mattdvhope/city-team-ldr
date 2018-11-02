import React from "react"
import { Route } from "react-router-dom"
import Dashboard from "../components/Dashboard"
import ViewClassTimes from "../components/ViewClassTimes"
import ClassesAtCenter from "../components/ClassesAtCenter"
import OffSiteLocations from "../components/OffSiteLocations"
import FormerStudents from "../components/FormerStudents"
import Login from "../components/Login"
import PrivateRoute from "../components/PrivateRoute"
import Status from "../components/Status"

const App = (word) => (
  <div>

  	<Status />
		<PrivateRoute path="/app/dashboard" component={Dashboard} />
    <PrivateRoute path="/app/view-class-times" component={ViewClassTimes} />
    <PrivateRoute path="/app/classes-at-center" component={ClassesAtCenter} />
    <PrivateRoute path="/app/off-site-locations" component={OffSiteLocations} />
		<PrivateRoute path="/app/former-students" component={FormerStudents} />


{/* <Route path="/app/login" component={Login} /> */}
  </div>
)

export default App


