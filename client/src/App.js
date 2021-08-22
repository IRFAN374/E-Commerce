import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// Screens
import PrivatePage from "./components/screen/PrivatePage";
import LoginPage from "./components/screen/LoginPage";
import RegisterPage from "./components/screen/RegisterPage";
import ForgotPasswordPage from "./components/screen/ForgotPasswordPage";
import ResetPasswordPage from "./components/screen/ResetPasswordPage";
import Navbar from './components/screen/Navbar'

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <PrivateRoute exact path="/" component={PrivatePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/forgotpassword" component={ForgotPasswordPage} />
          <Route exact path="/passwordreset/:resetToken" component={ResetPasswordPage} />
        </Switch>
        <Navbar />
      </div>
    </Router>
  );
};

export default App;
