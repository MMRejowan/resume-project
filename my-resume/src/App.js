import React, { useState } from 'react';
import Bootloader from './components/Bootloader';
import TerminalOS from './components/TerminalOS';
import './styles/TerminalOS.css';

function App() {
  const [isBooted, setIsBooted] = useState(false);

  return (
    <div className="App">
      {!isBooted ? (
        <Bootloader onBoot={() => setIsBooted(true)} />
      ) : (
        <TerminalOS onReboot={() => setIsBooted(false)} />
      )}
    </div>
  );
}

export default App;
