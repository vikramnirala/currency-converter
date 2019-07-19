import React from 'react';
import './App.css';
import LiveCC from './components/live_CC.js';
import HistoricalCC from './components/historical_CC.js';
import 'bootstrap/dist/css/bootstrap.css';
import { Container } from 'react-bootstrap';
function App() {
  return (
    <div className="App">
      <Container>
        <LiveCC />
        <HistoricalCC />
      </Container>
    </div>
  );
}

export default App;
