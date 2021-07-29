import { useState } from 'react';
import translations from '../../translations/translations.json';
import './translation.css';

function Translation({result}) {
  const [translator, setTranslator] = useState('legge');

  function handleClick (event) {
    event.preventDefault();
    setTranslator(event.target.id);
    console.log(translator)
  }

  return (
    <div id="translation">
      <h2>Main commentary</h2>
      {translator !== 'wilhelm' ? 
      <div>{translations[translator][result[1][0]].main.map((el, index) => (
          <p className="comments" key={index}>{el}</p>
        ))}
        {result[2].length ? <h2>Line Commentary</h2> : <></>}
      <div>{result[2].map((el) => (
        <p className="comments"  key={el}>{el}: {translations[translator][result[1][0]][el].map((line, index) => (
          <p>{line}</p>
        ))}</p>
      ))}</div>
      </div> : 
      <><h2>Judgment</h2>
      <div>{translations[translator][result[1][0]].judgment.map((el, index) => (
        <p className="comments"  key={index}>{el}</p>
      ))}</div>
      <h2>Image</h2>
      <div>{translations[translator][result[1][0]].image.map((el, index) => (
        <p className="comments"  key={index}>{el}</p>
      ))}</div>
            {result[2].length ? <h2>Line Commentary</h2> : <></>}
      <div>{result[2].map((el) => (
        <p className="comments"  key={el}>{el}: {translations[translator][result[1][0]][el].map((line, index) => (
          <p>{line}</p>
        ))}</p>
      ))}</div></>}
      <div id="tbuttons">
        <div>Show other translations:&nbsp;</div>
        {translator !== 'legge' ? <button id="legge" onClick={handleClick}>James Legge</button> : <></>}
        {translator !== 'wilhelm' ? <button id="wilhelm" onClick={handleClick}>Richard Wilhelm</button> : <></>}
        {translator !== 'richter' ? <button id="richter" onClick={handleClick}>Gregory C. Richter</button> : <></>} 
      </div>
    </div>
  );
}

export default Translation;