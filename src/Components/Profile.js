import React, { useEffect } from "react";
import { BrowserRouter, HashRouter, Link, Route } from "react-router-dom";
import axios from "../scripts/axios";
import ProfilePic from "./ProfilePic";
import Uploader from './Uploader';
import Menu from "./Menu";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <BrowserRouter>
                  <div className="main__text-box">
                      <h1 className="heading-primary">
                          <span className="heading-primary--main">{this.props.first} {this.props.last}</span>
                      </h1>
                  </div>
                  
            </BrowserRouter>
          );
    }
}


