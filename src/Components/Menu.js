import React from "react";
import { BrowserRouter, HashRouter, Link, Route } from "react-router-dom";
import axios from '../scripts/axios';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    logout() {
        (async () => {
          const data = await axios.post("/logout");
          console.log("data from /logout: ", data);
          this.setState({});
          window.location.pathname = '/';
        })();
    }

    render () {
        return(
            <div className="menu">
                <ul className="menu__list">
                    <li className="menu__item">
                        <img className="menu__img" src='/img/spades.png' alt="spades"></img>
                        <Link to='/start' className="menu__link">Novo Torneio</Link>
                    </li>
                    <li className="menu__item">
                        <img className="menu__img" src='/img/diamond.png' alt="diamond"></img>
                        <Link to='/ranking' className="menu__link">Ranking</Link>
                    </li>
                    <li className="menu__item">
                        <img className="menu__img" src='/img/club.png' alt="club"></img>
                        <Link to='/tournaments' className="menu__link">Jogos passados</Link>
                    </li>
                    <li className="menu__item">
                        <img className="menu__img" src='/img/heart.png' alt="heart"></img>
                        <p className="menu__link--close" onClick={() => this.logout()}>Logout</p>
                    </li>
                </ul>
            </div>
        )
    }
}