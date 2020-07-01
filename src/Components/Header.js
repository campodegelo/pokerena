import React, { useEffect } from "react";
import { BrowserRouter, HashRouter, Link, Route } from "react-router-dom";
import axios from "../scripts/axios";
import Login from "./Login";
import Register from "./Register";
import Play from "./Play";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

//   logout() {
//     (async () => {
//       const data = await axios.post("/logout");
//       console.log("data from /logout: ", data);

//       this.setState({
//         loggedUser: null
//       });
//     })();
//   }

  componentDidMount() {
    

    axios.get("/user").then(({ data }) => {
      console.log("logged user : ", data)
      if (data.success !== false) {
        this.setState({ loggedUser: data });
      }
    });
  }

  render() {
    return (
      <HashRouter>
        <div className="header__container">
          <header className="header">
            <div className="header__logo-box">
              <img src="img/logo512.png" alt="Logo" className="header__logo"></img>
            </div>
            <div className="header__text-box">
                <h1 className="heading-primary">
                    <span className="heading-primary--main">Pokerena</span>
                    <span className="heading-primary--sub">poker tipo exportação</span>
                </h1>
                {/* <Route exact path="/" component={Play} /> */}
                {/* <Route exact path="/play" component={Play} /> */}

                <div className="btn__container">
                    {/* <Link to="/login"  className="btn btn--white btn--animated">login</Link>
                    <Link to="/register"  className="btn btn--white btn--animated">registrar</Link> */}
                  <Route exact path='/' component={Play} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                </div>

                {/* <a href="/" cla ssName="btn btn--white btn--animated">Discover our tours</a> */}
                {/* {!this.state.loggedUser && (
                  <div className="menu-user">
                  <Link to="/play" className="btn btn--white btn--animated">jogar</Link>
                  </div>
                )} */}
                
            </div>
            {/* {!this.state.loggedUser && (
              <div className="menu-user">
                <Link to="/register" className="btn btn--white btn--animated">entrar</Link>
                <Link to="/login" className="btn btn--white btn--animated">registrar</Link>
              </div>
            )}
            {this.state.loggedUser && (
              <div className="menu-user">
                <p onClick={() => this.logout()}>logout</p>
              </div>
            )} */}
          </header>
        </div>
      </HashRouter>
    );
  }
}
