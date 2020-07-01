import React from "react";
import ReactDOM from "react-dom";
import "./css/style.css";
import App from "./App";
import Welcome from './Components/Welcome';
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";
import { init } from "./scripts/socket";

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(reduxPromise))
);

// const isLoggedIn = window.location.pathname !== "/welcome";

// let elem = (
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

let elem = <Welcome />;

const isLoggedIn = window.location.pathname !== "/";

if (isLoggedIn) {
    init(store);
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(elem, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
