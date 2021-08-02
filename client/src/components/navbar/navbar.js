import { useState } from 'react';
import './navbar.css';
import googleLogo from '../../assets/googlelogo.png';
import twitterLogo from '../../assets/twitterlogo2.png';
import githublogo from '../../assets/githublogo.png';


export default function Navbar ({isLoggedIn, setIsAsked, setQuestion, setResult, setLoginPage}) {
  const [hovering, setHovering] = useState(false);
  const [hexNumber, setHexNumber] = useState(0);
  
  const oauthLogin = (event) => {
    window.open(`http://localhost:3002/auth/${event.target.id}`, '_self');
    setHovering(false);
    setLoginPage(false);
  }

  function mouseEnter () {
    setHovering(true);
  }

  function mouseLeave () {
    setHovering(false);
  }

  function resetAsked () {
    setQuestion('');
    setIsAsked(false);
    setHovering(false);
    setLoginPage(false);
  }

  function handleChange (event) {
    setHexNumber(event.target.value);
  }

  function hexInput (event) {
    event.preventDefault();
    setResult({
      divination: [],
      numbers: [hexNumber],
      lines: [1,2,3,4,5,6],
      method: 'lookup',
      question: ''
    })
    setIsAsked(true);
    setLoginPage(false);
    setHovering(false);
    event.target.reset();
  }

  function loginClick () {
    setLoginPage(true);
    setHovering(false);
  }

  return (
    <div id="navbar">
      <button id="reset" onClick={resetAsked}>Home</button>
        <form onChange={handleChange} onSubmit={hexInput}>
        <label dangerouslySetInnerHTML={{__html: "<p>Browse by<br />hexagram number</p>"}}></label>
        <input type="number" min="1" max="64" id="hexinput" placeholder="#"/>
        <button type="submit">Submit</button>
      </form>
      <div id="pulldown">
        <button onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onClick={loginClick} >Login</button>
        {hovering ? 
            <div id="login">
              <button id="google" onClick={oauthLogin} disabled={isLoggedIn} onMouseEnter={mouseEnter}  >
              <img src={googleLogo} height="25px" alt="Google logo" />
              <p>Login with Google</p>
              </button>
              <button id="twitter" onClick={oauthLogin} disabled={isLoggedIn} onMouseEnter={mouseEnter} >
                <img src={twitterLogo} height="20px" alt="Google logo" />
                <p>Login with Twitter</p>
              </button>
              <button id="github" onClick={oauthLogin} disabled={isLoggedIn} onMouseEnter={mouseEnter} >
              <img src={githublogo} height="25px" alt="Google logo" />
              <p>Login with Github</p>
                </button>
            </div>
         :<></>}
      </div>
    </div>

  );
}
