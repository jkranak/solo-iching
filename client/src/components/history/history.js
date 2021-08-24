import { useContext } from 'react';
import hexdict from '../../data/hexdict.json'
import './history.css';
import { ResultContext, LoginContext } from '../../App';

export default function History({ setLoginPage, resultList }) {
  const result = useContext(ResultContext);
  const login = useContext(LoginContext);

  function loginClick () {
    setLoginPage(true);
  }

  return (
    <>
    <h3 id="histheading">History</h3>
    <div id="historydiv">
      {result.method !== 'lookup' && <div>
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
      </div>}
    </div>
    {!login.id && <button id="save" onClick={loginClick}>Log in to save your history</button>}
    </>
  );
}