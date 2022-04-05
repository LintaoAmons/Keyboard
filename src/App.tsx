import React from 'react';
import { Keyboard } from './core/Keyboard'
import { KeyMapOverview } from './core/KeyMapOverview/KeyMapOverview';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Lintao's Keyboard</h1>
      <Keyboard />
      <KeyMapOverview />
    </div>
  );
}

export default App;
