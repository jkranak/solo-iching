import hexNumber from '../data/hexnumber.json';

function yarrowStalk () {
  const remainders = num => num % 4 === 0 ? 4 : num % 4;

  let results = [];
  for (let i = 0; i < 6; i++) {
    let line = 0;
    let remain = 49;
    for (let i = 0; i < 3; i++) {
      let left = 1 + Math.floor(Math.random() * (remain - 1));
      let sum = 1 + remainders(left) + remainders(remain - 1 - left);
      line += sum === 4 || sum === 5 ? 3 : 2;
      remain -= sum;
    }
    results.push(line);
  }
  return results;
}

function coinMethod () {
  let results = [];
  for (let i = 0; i < 6; i++){
    let line = 0;
    for (let i = 0; i < 3; i++) {
      line += 2 + Math.floor(Math.random() * 2);
    }
    results.push(line);
  }
  return results;
}

function hexagram (method) {
  let divination = [];
  if (method === 'yarrow') divination = yarrowStalk();
  else if (method === 'coin') divination = coinMethod();
  if (divination.includes(6) || divination.includes(9)) {
    let divination1 = '';
    let divinationChange = '';
    let lines = [];
    for (let i = 0; i < 6; i++) {
      if (divination[i] === 6) {
        divination1 += '8';
        divinationChange += '7';
        lines.push(i + 1);
      }
      else if (divination[i] === 9) {
        divination1 += '7';
        divinationChange += '8';
        lines.push(i + 1);
      } else {
        divination1 += divination[i].toString();
        divinationChange += divination[i].toString();
      }
    }
    return {divination: divination.reverse(), numbers: [hexNumber[divination1], hexNumber[divinationChange]], lines, method};
  }
  return {divination: divination.reverse(), numbers: [hexNumber[divination.join('')]], lines: [], method};
}

export default hexagram;