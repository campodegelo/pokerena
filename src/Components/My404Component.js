import React, { useEffect } from "react";
import { BrowserRouter, HashRouter, Link, Route } from "react-router-dom";
// import axios from "./scripts/axios";
import Play from "./Play";
import Login from "./Login";
import Register from './Register';
// import Games from './Components/Games'

export default class My404Component extends React.Component {
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
                    <span className="heading-primary--main">Erro 404</span>
                    <span className="heading-primary--sub">Página não encontrada</span>
                </h1>
            </div>

                <div className="btn__container">
                    <a href="/"  className="btn btn--white btn--animated">Página Inicial</a>
                </div>
          </main>
        </div>

      </BrowserRouter>
    );
  }
}
