import hexdict from '../../hexdata/hexdict.json'
import './result.css';
import Translation from '../translation/translation';

function Result({question, result}) {
  
  const result1 = result[1][0];
  const result2 = result[1][1]

  function lineRender (num) {
    if (num === 7) return '—————';
    if (num === 8) return '—— ——';
    if (num === 6) return '——X——';
    if (num === 9) return '——O——';
  }

  return (
    <div id="results">
      <h2>Results</h2>
      <div id="hexdisplay">
        <div id="linenum">
          <p>line</p>
          <p>number</p>
        </div>
        <p id="hexagram">
          {result[0].map((el, index) => (
          <li key={index}><span id="linenums">{6 - index}</span>&nbsp;&nbsp;<span>{lineRender(el)}</span></li>
        ))}
        </p>
      </div>
      <h3>Your question: {question}</h3>
      <div id="hexinfo">
        <div>
          <h1>{result1}: <span dangerouslySetInnerHTML={{ __html: hexdict[result1]["hexagram"]}}></span></h1>
          <p><span dangerouslySetInnerHTML={{ __html: hexdict[result1]["chinese"]}}></span>: <span>{hexdict[result1]["pinyin"]}</span></p>
          <p>"{hexdict[result1]["english"]}"</p>
        </div>
        {result2 ? 
        <>
        <div id="changing">
          <p>changing</p>
          <p>into</p>
          <h1>&#8594;</h1>
        </div>
        <div>
          <h1>{result2}: <span dangerouslySetInnerHTML={{ __html: hexdict[result2]["hexagram"]}}></span></h1>
          <p><span dangerouslySetInnerHTML={{ __html: hexdict[result2]["chinese"]}}></span>: <span>{hexdict[result2]["pinyin"]}</span></p>
          <p>"{hexdict[result2]["english"]}"</p>
        </div></> : <></>}
      </div>
      <Translation result={result}/>
    </div>
  );
}

export default Result;