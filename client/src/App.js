import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setUserAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import { getDresses } from "./actions/dressActions";
import { getCustomers } from "./actions/customerActions";
import { getOrders } from "./actions/orderActions";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/userauth/Register";
import Login from "./components/userauth/Login";
import Admin from "./components/adminauth/Admin";
import AdminRegister from "./components/adminauth/Register";
import AdminLogin from "./components/adminauth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import TailorProfiles from "./components/profile/TailorProfiles";
import Dresslist from "./components/dresslist/Dresslist";
import PrivateRoute from "./components/common/PrivateRoute";
import AddDress from "./components/add-new/AddDress";
import CustomerList from "./components/customer/CustomerList";
import AddCustomer from "./components/add-new/AddCustomer";
import MyOrders from "./components/order/MyOrders";
import DeliveredOrders from "./components/order/DeliveredOrders";
import AddOrder from "./components/add-new/AddOrder";
import EditCustomer from "./components/edit/EditCustomer";
import EditOrder from "./components/edit/EditOrder";

import "./App.css";

//Check for User token
if (localStorage.jwtToken) {
  // Set userauth token header auth
  setUserAuthToken(localStorage.jwtToken);
  // Decode Token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Get dress lists
    store.dispatch(getDresses());
    store.dispatch(getCustomers());
    store.dispatch(getOrders());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/admin-register" component={AdminRegister} />
              <Route exact path="/admin-login" component={AdminLogin} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/tailors"
                  component={TailorProfiles}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/dress" component={Dresslist} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-dresstypes"
                  component={AddDress}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/customers"
                  component={CustomerList}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-customers"
                  component={AddCustomer}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-customer"
                  component={EditCustomer}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/orders" component={MyOrders} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/delivered"
                  component={DeliveredOrders}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-order" component={AddOrder} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-order" component={EditOrder} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
