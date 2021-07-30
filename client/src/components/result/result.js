import { useContext } from 'react';
import hexdict from '../../data/hexdict.json'
import './result.css';
import { ResultContext } from '../question/question';

export default function Result() {
  const result = useContext(ResultContext);

  function lineRender (num) {
    if (num === 7) return '—————';
    if (num === 8) return '—— ——';
    if (num === 6) return '——X——';
    if (num === 9) return '——O——';
  }

  return (
    <div id="results">
      <h2>Results</h2>
      <table>
          <tr>
            <td id="linenumhead">line numbers</td>
            <td id="hexhead" className="hexlines">Hexagram</td>
          </tr>
          {result["divination"].map((el, index) => (
          <tr>
            <td className="linenums">{6 - index}</td>
            <td className="hexlines">{lineRender(el)}</td>
          </tr>
        ))}
        </table>
      {result["question"] ? <h3>Your question: {result["question"]}</h3> : <></>}
        <div id="hexinfo">
          <div className="hexinfos">
            <div className="hexagram" dangerouslySetInnerHTML={{ __html: hexdict[result["numbers"][0]]["hexagram"]}}></div>
            <div>
              <h1>{result["numbers"][0]}</h1>
              <p><span dangerouslySetInnerHTML={{ __html: hexdict[result["numbers"][0]]["chinese"]}}></span>: 
                <span>{hexdict[result["numbers"][0]]["pinyin"]}</span></p>
              <p>"{hexdict[result["numbers"][0]]["english"]}"</p>
            </div>
          </div>
        {result["numbers"][1] ? 
        <>
          <div id="changing">
            <p>changing</p>
            <p>into</p>
            <h1>&#8594;</h1>
          </div>
          <div className="hexinfos">
            <div className="hexagram" dangerouslySetInnerHTML={{ __html: hexdict[result["numbers"][1]]["hexagram"]}}></div>
            <div>
              <h1>{result["numbers"][1]}</h1>
              <p><span dangerouslySetInnerHTML={{ __html: hexdict[result["numbers"][1]]["chinese"]}}></span>: 
                <span>{hexdict[result["numbers"][1]]["pinyin"]}</span></p>
              <p>"{hexdict[result["numbers"][1]]["english"]}"</p>
            </div>
          </div>
        </> : <></>}
      </div>
    </div>
  );
}