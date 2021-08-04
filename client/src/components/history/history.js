import { useContext } from 'react';
import hexdict from '../../data/hexdict.json'
import './history.css';
import { ResultContext, ResultListContext } from '../../App';

export default function History({ login, setLoginPage }) {
  const result = useContext(ResultContext);
  const resultList = useContext(ResultListContext);

  function loginClick () {
    setLoginPage(true);
  }

  return (
    <>
      {result.method !== 'lookup' && <div>
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
          {resultList.map((el, index) => (<tr key={index + 36}>
            <td>{el['question']}</td>
            <td className="hexes" dangerouslySetInnerHTML={{ __html: hexdict[el['numbers'][0]]['hexagram']}}></td>
            {el['numbers'][1] ? 
              <td className="hexes" dangerouslySetInnerHTML={{ __html: hexdict[el['numbers'][1]]['hexagram']}}></td> : 
              <td className="hexes">&nbsp;</td>}
            <td>{el['divination'].join('')}</td>
            <td>{el['lines'].join(', ')}</td>
            <td>{el['method'] === 'yarrow' ? 'Yarrow Stalk' : 'Coin'}</td>
          </tr>))}
        </tbody>
      </table>
      {!login.id && <button id="save" onClick={loginClick}>Log in to save your history</button>}
      </div>}
    </>
  );
}