import { useState } from 'react';
import './navbar.css';


export default function Navbar ({isLoggedIn, setIsAsked, setQuestion, setResult}) {
  const [hovering, setHovering] = useState(false);
  const [hexNumber, setHexNumber] = useState(0);
  
  const oauthLogin = (event) => {
    window.open(`http://localhost:3002/auth/${event.target.id}`, '_self');
    setHovering(false);
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
  }

  function handleChange (event) {
    setHexNumber(event.target.value);
    console.log(event.target.value)
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
    event.target.reset();
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
        <button onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} >Login</button>
        {hovering ? 
        <div id="login" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
        <button id="google" onClick={oauthLogin} disabled={isLoggedIn} onMouseEnter={mouseEnter}  >Login with Google</button>
        <button id="twitter" onClick={oauthLogin} disabled={isLoggedIn} onMouseEnter={mouseEnter} >Login with Twitter</button>
        <button id="github" onClick={oauthLogin} disabled={isLoggedIn} onMouseEnter={mouseEnter} >Login with GitHub</button>
        </div>
         :<></>}
      </div>
    </div>

  );
}