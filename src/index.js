import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';
import { BrowserRouter as Router } from 'react-router-dom';

const store = createStore(reducer);

ReactDOM.render(
<Router>
    <Provider store={store}>
        <App />
    </Provider>
</Router>
, document.getElementById('root'));

