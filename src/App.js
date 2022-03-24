import React from 'react'
import './App.css';
import Home from './components/Home';
import Router from './Routes/Router'

function App() {
  return (
    <div className="App">
      <Router>
        <Home />
      </Router>
    </div>
  );
}

export default App;
