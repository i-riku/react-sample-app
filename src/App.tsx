// src/App.tsx
import React from 'react';
import './App.css';
import GpuInfo from './GpuInfo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>GPU Info</h1>
        <GpuInfo />
      </header>
    </div>
  );
}

export default App;
