import { useState } from 'react';
import translations from '../../translations/translations.json';
import './translation.css';
import hexdict from '../../hexdata/hexdict.json';

function Translation({result}) {
  const [translator, setTranslator] = useState('legge');

  function handleClick (event) {
    event.preventDefault();
    setTranslator(event.target.id);
  }
  console.log(result)
  return (
    <div id="translation">
      <h2>Commentary on Hexagram {result[1][0]} ({hexdict[result[1][0]]["pinyin"]})</h2>
      {translator === 'wilhelm' ? <h2>Judgment</h2> : <></>}
      <div>{translations[translator][result[1][0]].main.map((el, index) => (
          <p className="comments" key={index + 6}>{el}</p>
        ))}
        {translator === 'wilhelm' ? 
          <>
            <h2>Image</h2>
            <div>{translations[translator][result[1][0]].image.map((el, index) => (
              <p className="comments"  key={index + 12}>{el}</p>
            ))}</div>
          </> 
          : <></>}
      {result[2].length ? 
        <>
          <h2>Line Commentary</h2> 
          <div>{result[2].map((el) => (
            <p className="comments"  key={el}>{el}: {translations[translator][result[1][0]][el].map((line, index) => (
              <span>{line}</span>
            ))}</p>
          ))}</div>
          <h2>Commentary on Hexagram {result[1][1]} ({hexdict[result[1][1]]["pinyin"]})</h2>
          {translations[translator][result[1][1]].main.map((el, index) => (
          <p className="comments" key={index + 18}>{el}</p>
        ))}
        </>
      : <></>}
    </div> 
      
      <div id="tbuttons">
        <div>Currently Displaying translation by {translator === 'legge' ? <p>James Legge</p> : translator === 'wilhelm' ? <p>Richard Wilhelm</p> : <p>Gregory C. Richter</p>} Show other translations:&nbsp;</div>
        {translator !== 'legge' ? <button id="legge" onClick={handleClick}>James Legge</button> : <></>}
        {translator !== 'wilhelm' ? <button id="wilhelm" onClick={handleClick}>Richard Wilhelm</button> : <></>}
        {translator !== 'richter' ? <button id="richter" onClick={handleClick}>Gregory C. Richter</button> : <></>} 
      </div>
    </div>
  );
}

export default Translation;