import React from 'react';
import ReactDOM from 'react-dom';
import  App  from "./components/App";
import "bootstrap/dist/css/bootstrap.css";
import {Provider} from "react-redux"
import {compose,createStore,applyMiddleware } from "redux";
import allReducers from "./reducers" 
import thunk from "redux-thunk"


import './main.css'; 
                    // Using Webpack, we usually import CSS from JavaScript, not from HTML.
                   // This is not standard JavaScript, it's a Webpack feature
                   // that is popular in the React community.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(allReducers, 
                       composeEnhancers(applyMiddleware(thunk)),
);

const mainComponent = (<Provider store={store}><App/></Provider>);

ReactDOM.render( mainComponent, document.getElementById('root') );
