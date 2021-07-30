import { useContext } from 'react';
import hexdict from '../../data/hexdict.json'
import './history.css';
import { ResultContext } from '../question/question';

export default function History() {
  const result = useContext(ResultContext);

  return (
    <div>
     Your history
     <table>
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
      <tr>
      <td>{result['question']}</td>
      <td dangerouslySetInnerHTML={{ __html: hexdict[result['numbers'][0]]['hexagram']}}></td>
      {result['numbers'][1] ? <td dangerouslySetInnerHTML={{ __html: hexdict[result['numbers'][1]]['hexagram']}}></td> : <td>&nbsp;</td>}
      <td>{result['divination'].join('')}</td>
      <td>{result['lines'].join(', ')}</td>
      <td>{result['method'] === 'yarrow' ? 'Yarrow Stalk' : 'Coin'}</td>
      </tr>
     </table>
    </div>
  );
}