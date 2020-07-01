import React, { useEffect } from "react";
import { BrowserRouter, HashRouter, Link, Route } from "react-router-dom";
import axios from "../scripts/axios";

export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <BrowserRouter>
                  <div className="main__text-box">
                      <h1 className="heading-primary">
                          <span className="heading-primary--main">Jogos passados</span>
                      </h1>
                  </div>
                  
            </BrowserRouter>
          );
    }
}


