// import { useState } from 'react';
import hexdict from '../hexdata/hexdict.json'
import './result.css';

function Result({question, result}) {
  const result1 = result[1][0];
  console.log(result)

  function lineRender (num) {
    if (num === 7) return '—————';
    if (num === 8) return '—— ——';
    if (num === 6) return '——X——';
    if (num === 9) return '——O——';
  }

  return (
    <div>
      <h2>Results</h2>
      <div id="hexdisplay">
        <div id="linenum">
          <p>line</p>
          <p>number</p>
        </div>
        <p id="hexagram">
          {result[0].map((el, index) => (
          <li key={index}><span id="linenums">{6 - index}</span>&nbsp;&nbsp;<div>{lineRender(el)}</div></li>
        ))}
        </p>
      </div>
      <p>{question}</p>
      <p>{result1}: <span dangerouslySetInnerHTML={{ __html: hexdict[result1]["hexagram"]}}></span></p>
      <p><span dangerouslySetInnerHTML={{ __html: hexdict[result1]["chinese"]}}></span>: <span>{hexdict[result1]["pinyin"]}</span></p>
      <p>"{hexdict[result1]["english"]}"</p>

    </div>
  );
}

export default Result;



