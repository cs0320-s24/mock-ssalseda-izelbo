import { useState } from 'react';
import '../styles/App.css';
import { LoginScreen } from './LoginScreen';
import REPL from './REPL';

/**
 * This is the highest level component!
 */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);


  return (
    <div className="App">
      <p className="App-header">
        <h1>Mock</h1>
        <LoginScreen isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </p>

      { isLoggedIn && <REPL /> }
    </div>
  );
}

export default App;