import React from 'react';
import Login from './components/login/login';
import './App.css';
import Question from './components/question/question';

export const LoginContext = React.createContext();

function App() {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userId, setUserId] = useState('');
  
  return (
    <div className="App">
      <h1>Yijing</h1>
      <h2>&#x2630; &#x2631; &#x2632; &#x2633; &#x2634; &#x2635; &#x2636; &#x2637;</h2>
      <Login />
      <Question />
    </div>
  );
}

export default App;
