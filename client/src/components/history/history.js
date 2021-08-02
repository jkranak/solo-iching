import { useContext } from 'react';
import hexdict from '../../data/hexdict.json'
import './history.css';
import { ResultContext } from '../../App';

export default function History({ login, setLoginPage }) {
  const result = useContext(ResultContext);

  function loginClick () {
    setLoginPage(true);
  }

  return (
    <>{result.method === 'lookup' ? <></> : <div>
     <h3>Your history</h3>
     <table id="histtable">
      <thead>
        <tr>
          <td>Question</td>
          <td>Main</td>
          <td>Change</td>
          <td>Nums</td>
          <td>Change lines</td>
          <td>Method</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{result['question']}</td>
          <td className="hexes" dangerouslySetInnerHTML={{ __html: hexdict[result['numbers'][0]]['hexagram']}}></td>
          {result['numbers'][1] ? 
            <td className="hexes" dangerouslySetInnerHTML={{ __html: hexdict[result['numbers'][1]]['hexagram']}}></td> : 
            <td className="hexes">&nbsp;</td>}
          <td>{result['divination'].join('')}</td>
          <td>{result['lines'].join(', ')}</td>
          <td>{result['method'] === 'yarrow' ? 'Yarrow Stalk' : 'Coin'}</td>
        </tr>
      </tbody>
     </table>
     {login.id ? <></> : <button id="save" onClick={loginClick}>Log in to save your history</button>}
    </div>}
    </>
  );
}