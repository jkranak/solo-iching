import { useState } from 'react';
import legge from '../translations/legge.json';
import richter from '../translations/richter.json';
import wilhelm from '../translations/wilhelm.json'

function Translation({result}) {
  const [translation, setTranslation] = useState('legge');

  function handleClick (event) {
    event.preventDefault();
    setTranslation(event.target.id);
  }

  console.log(result)

  return (
    <div>
      {translation === 'legge' ? 
      <div>{legge[result[1][0]].main.map((el, index) => (
          <li key={index}>{el}</li>
        ))}
      </div>: translation === 'richter' ? 
      <div>{richter[result[1][0]].main.map((el, index) => (
        <li key={index}>{el}</li>
      ))}</div> : 
      <><p>judgment</p>
      <div>{wilhelm[result[1][0]].judgment.map((el, index) => (
        <li key={index}>{el}</li>
      ))}</div>
      <p>image</p>
      <div>{wilhelm[result[1][0]].image.map((el, index) => (
        <li key={index}>{el}</li>
      ))}</div></>}
      <div>
        {translation !== 'legge' ? <button id="legge" onClick={handleClick}>James Legge</button> : <></>}
        {translation !== 'wilhelm' ? <button id="wilhelm" onClick={handleClick}>Richard Wilhelm</button> : <></>}
        {translation !== 'richter' ? <button id="richter" onClick={handleClick}>Gregory C. Richter</button> : <></>} 
      </div>
    </div>
  );
}

export default Translation;