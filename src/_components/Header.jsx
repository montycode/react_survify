import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { history } from "@/_helpers";
import { authenticationService } from "@/_services";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authenticationService.currentUserValue,
    };
  }

  logout() {
    authenticationService.logout();
    history.push("/login");
  }

  render() {
    return (
      <Fragment>
        <nav className="bg-main px-6 py-4 shadow">
          <div className="flex flex-col container mx-auto md:flex-row md:items-center md:justify-between">
            <div className="flex justify-between items-center">
              <div>
                <a href="#" class="text-white text-xl font-bold md:text-2xl">
                  Survify
                </a>
              </div>
            </div>

            <div class="md:flex flex-col md:flex-row -mx-4">
              <Link
                to="/"
                className="my-1 text-gray-300 hover:text-white mx-4 md:my-0"
              >
                Home
              </Link>
              <Link
                onClick={this.logout}
                className="my-1 text-gray-300 hover:text-white mx-4 md:my-0"
              >
                Logout
              </Link>
            </div>
          </div>
        </nav>
      </Fragment>
    );
  }
}

export { Header };
