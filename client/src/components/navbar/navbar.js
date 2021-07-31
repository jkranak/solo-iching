import './navbar.css';

export default function Navbar ({isLoggedIn, setIsAsked, setQuestion}) {
  const googleLogin = () => {
    window.open('http://localhost:3002/auth/google', '_self');
  }

  const twitterLogin = () => {
    window.open('http://localhost:3002/auth/twitter', '_self');
  }

  const gitHubLogin = () => {
    window.open('http://localhost:3002/auth/github', '_self');
  }

  function resetAsked () {
    setQuestion('');
    setIsAsked(false);
  }

  return (
    <div id="navbar">
      <button id="reset" onClick={resetAsked}>Home</button>
      <button onClick={googleLogin} disabled={isLoggedIn}>LoginGoogle</button>
      <button onClick={twitterLogin} disabled={isLoggedIn}>LoginTwitter</button>
      <button onClick={gitHubLogin} disabled={isLoggedIn}>LoginGitHub</button>
    </div>

  );
}