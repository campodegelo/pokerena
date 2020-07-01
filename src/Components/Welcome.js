import React, { useEffect } from "react";
import { BrowserRouter, HashRouter, Link, Route } from "react-router-dom";
// import axios from "./scripts/axios";
import Play from "./Play";
import Login from "./Login";
import Register from './Register';
// import Games from './Components/Games'

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <div className="main__container">
          <main className="main">
            <div className="main__logo-box">
              <img src="img/logo512.png" alt="Logo" className="main__logo"></img>
            </div>
            <div className="main__text-box">
                <h1 className="heading-primary">
                    <span className="heading-primary--main">Pokerena</span>
                    <span className="heading-primary--sub">poker tipo exportação</span>
                </h1>
            </div>

                <div className="btn__container">
                  <Route exact path='/' component={Play} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                </div>
          </main>
        </div>

      </BrowserRouter>
    );
  }
}
