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

  return (
    <div id="translation">
      {translation === 'legge' ? 
      <div>{legge[result[1][0]].main.map((el, index) => (
          <p key={index}>{el}</p>
        ))}
        {result[2].length ? <p>Lines</p> : <></>}
      <div>{result[2].map((el) => (
        <p key={el}>{el}: {legge[result[1][0]][el].map((line, index) => (
          <p>{line}</p>
        ))}</p>
      ))}</div>
      </div>: translation === 'richter' ? 
      <div>{richter[result[1][0]].main.map((el, index) => (
        <p key={index}>{el}</p>
      ))}
        {result[2].length ? <p>Lines</p> : <></>}
        <div>{result[2].map((el) => (
        <p key={el}>{el}: {richter[result[1][0]][el].map((line, index) => (
          <p>{line}</p>
        ))}</p>
      ))}</div></div> : 
      <><h2>Judgment</h2>
      <div>{wilhelm[result[1][0]].judgment.map((el, index) => (
        <p key={index}>{el}</p>
      ))}</div>
      <h2>Image</h2>
      <div>{wilhelm[result[1][0]].image.map((el, index) => (
        <p key={index}>{el}</p>
      ))}</div>
            {result[2].length ? <h2>Lines</h2> : <></>}
      <div>{result[2].map((el) => (
        <p key={el}>{el}: {wilhelm[result[1][0]][el].map((line, index) => (
          <p>{line}</p>
        ))}</p>
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