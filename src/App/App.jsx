import React from "react";
import { Router, Route } from "react-router-dom";

import { history } from "@/_helpers";
import { authenticationService } from "@/_services";
import { PrivateRoute, Header, Footer } from "@/_components";
import { HomePage, LoginPage, RegisterPage } from "@/Pages";

import "tailwindcss/tailwind.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe((x) =>
      this.setState({ currentUser: x })
    );
  }

  render() {
    const { currentUser } = this.state;
    return (
      <Router history={history}>
        <div className="flex flex-col min-h-screen">
          {currentUser && <Header />}
          <PrivateRoute exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          {currentUser && <Footer />}
        </div>
      </Router>
    );
  }
}

export { App };
