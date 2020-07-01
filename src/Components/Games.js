import React, { useEffect } from "react";
import { BrowserRouter, HashRouter, Link, Switch, Route } from "react-router-dom";
import axios from "../scripts/axios";
import ProfilePic from "./ProfilePic";
import Uploader from './Uploader';
import Menu from "./Menu";
import Profile from "./Profile";
import Ranking from './Ranking';
import Start from './StartGame';
import Tournaments from './Tournaments';

export default class Games extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

        (async () => {
            const {data} = await axios.get("/user");
            console.log('data from /user is ', data.data);
            if (typeof data.data === 'undefined') {
                window.location.pathname = '/';
            } else {
                this.setState(data.data)
            }
        })();
    }

    render () {
        return (
            <BrowserRouter>
              <div className="container">
                {/* <main className="main"> */}
                  {/* <div className="main__logo-box">
                    <img src="img/logo512.png" alt="Logo" className="main__logo"></img>
                  </div> */}
                  
                  {/* <Route exact path="/games"
                        render={()=> (
                            <Profile
                              first={this.state.first}
                              last={this.state.last}
          
                            />
                        )}
                    /> */}
                
                
                    <Switch>
                        <Route exact path="/games"
                            render={()=> (
                                <Profile
                                first={this.state.first}
                                last={this.state.last}
            
                                />
                            )}
                        />
                        <Route exact path='/start' component={Start} />
                        <Route exact path='/ranking' component={Ranking} />
                        <Route exact path='/tournaments' component={Tournaments} />
                        </Switch>
                {/* </main> */}

              </div>
      
            </BrowserRouter>
          );
    }
}
