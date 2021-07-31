import { useContext } from 'react';
import hexdict from '../../data/hexdict.json'
import './history.css';
import { ResultContext } from '../question/question';
import { LoginContext } from '../../App';

export default function History() {
  const result = useContext(ResultContext);
  const login = useContext(LoginContext);
  console.log(login)

  return (
    <div>
     Your history
     <table id="histtable">
      <thead>
        <tr>
          <td>Question</td>
          <td>Main</td>
          <td>Changing</td>
          <td>Numbers</td>
          <td>Change lines</td>
          <td>Method</td>
        </tr>
      </thead>
      <tbody>
        <tr>
        <td>{result['question']}</td>
        <td dangerouslySetInnerHTML={{ __html: hexdict[result['numbers'][0]]['hexagram']}}></td>
        {result['numbers'][1] ? <td dangerouslySetInnerHTML={{ __html: hexdict[result['numbers'][1]]['hexagram']}}></td> : <td>&nbsp;</td>}
        <td>{result['divination'].join('')}</td>
        <td>{result['lines'].join(', ')}</td>
        <td>{result['method'] === 'yarrow' ? 'Yarrow Stalk' : 'Coin'}</td>
        </tr>
      </tbody>
     </table>
    </div>
  );
}