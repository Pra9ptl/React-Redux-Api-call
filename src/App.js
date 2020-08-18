import React from 'react';
import {applyMiddleware, createStore, compose} from "redux";
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import './App.css';
import Auth from './components/Auth/Auth';
import Store from './store/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(Store, composeEnhancers(
    applyMiddleware(thunk)
));

function App() {

    return (
        <Provider store={store}>
            <div className="App">
                <Auth/>
            </div>
        </Provider>
    );
}

export default App;
