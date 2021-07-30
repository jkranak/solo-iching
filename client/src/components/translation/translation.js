import { useContext, useState } from 'react';
import translations from '../../data/translations.json';
import './translation.css';
import hexdict from '../../data/hexdict.json';
import { ResultContext } from '../question/question';

function Translation() {
  const [translator, setTranslator] = useState('legge');
  const result = useContext(ResultContext);

  function handleClick (event) {
    event.preventDefault();
    setTranslator(event.target.id);
  }

  return (
    <div id="translation">
      <div id="tbuttons">
        <p>Currently Displaying translation by {translator === 'legge' ? <a href="https://sacred-texts.com/ich/">James Legge</a> : translator === 'wilhelm' ? <a href="http://www.pantherwebworks.com/i_ching/index.html">Richard Wilhelm</a> : <a href="http://grichter.sites.truman.edu/home/">Gregory C. Richter</a>}.</p>
        <p>Show other translations:&nbsp;</p>
        {translator !== 'legge' ? <button id="legge" onClick={handleClick}>James Legge</button> : <></>}
        {translator !== 'wilhelm' ? <button id="wilhelm" onClick={handleClick}>Richard Wilhelm</button> : <></>}
        {translator !== 'richter' ? <button id="richter" onClick={handleClick}>Gregory C. Richter</button> : <></>} 
      </div>
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
              <div>{result["lines"].map((el) => (
                <p className="comments"  key={el + 24}>{el}: {translations[translator][result["numbers"][0]][el].map((line, index) => (
                  <span>{line}</span>
                ))}</p>
              ))}</div>
              <h2>Commentary on Hexagram {result["numbers"][1]} ({hexdict[result["numbers"][1]]["pinyin"]})</h2>
              {translations[translator][result["numbers"][1]].main.map((el, index) => (
              <p className="comments" key={index + 18}>{el}</p>
            ))}
            </>
          : <></>}
        </div>
      </div>
    </div>
  );
}

export default Translation;