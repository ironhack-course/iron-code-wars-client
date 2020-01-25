import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import Main from './containters/Main';

function App() {
  return (
    <div className="App">
    <Route path="/" component={Main} />
    {/* We might want to have rooms here at some point
    <Switch></Switch> */}
    </div>
  );
}

export default App;
