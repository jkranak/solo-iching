import { useContext } from 'react';
import translations from '../../data/translations.json';
import './translation.css';
import hexdict from '../../data/hexdict.json';
import { ResultContext } from '../../App';

function Translation({translator}) {
  const result = useContext(ResultContext);

  return (
      <div id="translationtext">
        <h2>Commentary on Hexagram {result["numbers"][0]} ({hexdict[result["numbers"][0]]["pinyin"]})</h2>
        {translator === 'wilhelm' ? <h2>Judgment</h2> : <></>}
        <div>{translations[translator][result["numbers"][0]].main.map((el, index) => (
            <p className="comments" key={index + 6}>{el}</p>
          ))}
          {translator === 'wilhelm' ? 
            <>
              <h2>Image</h2>
              <div>{translations[translator][result["numbers"][0]].image.map((el, index) => (
                <p className="comments"  key={index + 12}>{el}</p>
              ))}</div>
            </> 
            : <></>}
          {result["lines"].length ? 
            <>
              <h2>Line Commentary</h2> 
              <div id="linecomm">{result["lines"].map((el) => (
                <p className="comments"  key={el + 24}>{el}: {translations[translator][result["numbers"][0]][el].map((line, index) => (
                  <span key={index + 30}>{line}</span>
                ))}</p>
              ))}</div>            
            </>
          : <></>}
              {result["numbers"][1] ? <>
              <h2>Commentary on Hexagram {result["numbers"][1]} ({hexdict[result["numbers"][1]]["pinyin"]})</h2>
              {translations[translator][result["numbers"][1]].main.map((el, index) => (
              <p className="comments" key={index + 18}>{el}</p>
            ))}
            </> : <></>}
        </div>
      </div>
  );
}

export default Translation;