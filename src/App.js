import React, { useEffect } from "react";
import { BrowserRouter, HashRouter, Link, Switch, Route } from "react-router-dom";
import {HTML5Backend } from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd';
import Games from './Components/Games'
import Welcome from './Components/Welcome';
import Profile from "./Components/Profile";
import ProfilePic from "./Components/ProfilePic";
import StartGame from "./Components/StartGame";
import Login from "./Components/Login";
import Menu from "./Components/Menu";
import Uploader from "./Components/Uploader";
import Register from "./Components/Register";
import Ranking from "./Components/Ranking";
import Tournaments from "./Components/Tournaments";
import My404Component from './Components/My404Component';
import axios from './scripts/axios';

export default class App extends React.Component {
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

  // drop(e) {
  //   e.preventDefault();
  //   const playerId = e.dataTransfer.getData('player__id');

  //   const player = document.getElementById(playerId);
  //   console.log('player = ', player);
    
  //   player.style.display = 'block'; 

  //   console.log('e.target = ', e.target);

  //   // e.target.appendChild(player);
  // }

  // dragOver(e) {
  //   e.preventDefault();
  // }

  render() {
    return (
      <BrowserRouter>
        <DndProvider backend={HTML5Backend }>

            <div 
              className="main__container"
              // onDrop={this.drop}
                      // onDragOver={this.dragOver}
            >
              < div className="main">
                <div className="main__logo-box">
                  <img src="img/logo512.png" alt="Logo" className="main__logo"></img>
                </div>

                {this.state.first && (
                  <div className='layout'>
                    <ProfilePic
                      clickHandler={() => {
                        console.log('open uploader');
                        this.setState({ uploaderIsVisible: true })

                      }
                      }
                      image={this.state.image}
                      first={this.state.first}
                      last={this.state.last}
                    />
    
                    <Menu />

                  </div>
                  
                )}
                
                {this.state.uploaderIsVisible && (
                  <Uploader
                    setImageUrl={image =>
                      this.setState({
                        image: image,
                        uploaderIsVisible: false
                      })
                    }
                    closeModal={() =>                          
                      this.setState({
                      uploaderIsVisible: false
                                      })
                                  }
                              />
                )}


                <Switch>
                  <Route exact path='/' component={Welcome} />
                  <Route exact path='/profile' component={Profile} />
                  <Route exact path='/games' component={Games} />
                  <Route exact path='/start' component={StartGame} />
                  <Route exact path='/ranking' component={Ranking} />
                  <Route exact path='/tournaments' component={Tournaments} />
                  <Route path='*' exact={true} component={My404Component} />
                </Switch>
            </div>
          </div>
        </DndProvider>
      </BrowserRouter>
    );
  }
}
