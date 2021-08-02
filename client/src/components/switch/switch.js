
export default function Switch({changeTranslator, translator}) {

  return (
    <div> 
        <p>Currently Displaying translation by {translator === 'legge' ? <a href="https://sacred-texts.com/ich/">James Legge</a> : translator === 'wilhelm' ? <a href="http://www.pantherwebworks.com/i_ching/index.html">Richard Wilhelm</a> : <a href="http://grichter.sites.truman.edu/home/">Gregory C. Richter</a>}.</p>
        <p>Show other translations:&nbsp;</p>
        {translator !== 'legge' ? <button id="legge" onClick={changeTranslator}>James Legge</button> : <></>}
        {translator !== 'wilhelm' ? <button id="wilhelm" onClick={changeTranslator}>Richard Wilhelm</button> : <></>}
        {translator !== 'richter' ? <button id="richter" onClick={changeTranslator}>Gregory C. Richter</button> : <></>} 
    </div>
  );
}