import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.css"
import * as serviceWorker from './serviceWorker';
import { combineReducers,createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/rootReducer' 
import thunk from "redux-thunk"

// const reducers= combineReducers({
//     empty: emptyReducer
// })
const store = createStore(rootReducer,applyMiddleware(thunk));
ReactDOM.render(<Provider store={store}><App /></Provider>,document.getElementById('root'));

serviceWorker.unregister();
