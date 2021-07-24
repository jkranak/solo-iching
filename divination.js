// function yarrowStalk () {
//   let line = [];

//   const yarrowDivide = remain => {
//     if (line.length === 3) return;
//     let left = 1 + Math.floor(Math.random() * (remain - 1));
//     let sum = 1 + remainders(left) + remainders(remain - 1 - left);
//     line.push(sum === 4 || sum === 5 ? 3 : 2);
//     return yarrowDivide(remain - sum);
//   };

//   const remainders = num => num % 4 === 0 ? 4 : num % 4;

//   let results = [];

//   for (let i = 0; i < 6; i++) {
//     yarrowDivide(49);
//     results.push(line.reduce((acc, cur) => acc + cur));
//     line = [];
//   }
//   return results;
// }

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
  if (method = 'yarrow') divination = yarrowStalk();
  else if (method = 'coin') divination = coinMethod();
  if (divination.includes(6) || divination.includes(9)) {
    let divination1 = '';
    let divinationChange = '';
    for (let i = 0; i < 6; i++) {
      if (divination[i] === 6) {
        divination1 += '8';
        divinationChange += '7';
      }
      else if (divination[i] === 9) {
        divination1 += '7';
        divinationChange += '8';
      } else {
        divination1 += divination[i].toString();
        divinationChange += divination[i].toString();
      }
    }
    return [hexNumber[divination1], hexNumber[divinationChange]];
  }
  return [hexNumber[divination.join('')]];
}

let hexNumber = {
  777777: 1,
  888888: 2,
  878887: 3,
  788878: 4,
  878777: 5,
  777878: 6,
  888878: 7,
  878888: 8,
  778777: 9,
  777877: 10,
  888777: 11,
  777888: 12,
  777787: 13,
  787777: 14,
  888788: 15,
  887888: 16,
  877887: 17,
  788778: 18,
  888877: 19,
  778888: 20,
  787887: 21,  
  788787: 22,  
  788888: 23,
  888887: 24,
  777887: 25,
  788777: 26,
  788887: 27,
  877778: 28,
  878878: 29,
  787787: 30,
  877788: 31,
  887778: 32,
  777788: 33,
  887777: 34,
  787888: 35,
  888787: 36,
  778787: 37,
  787877: 38,
  878788: 39,
  887878: 40,
  788877: 41,
  778887: 42,
  877777: 43,
  777778: 44,
  877888: 45,
  888778: 46,
  877878: 47,
  878778: 48,
  877787: 49,
  787778: 50,
  887887: 51,
  788788: 52,
  887877: 53,
  778788: 54,
  887787: 55,
  787788: 56,
  778778: 57,
  877877: 58,
  778878: 59,
  878877: 60,
  778877: 61,
  887788: 62,
  878787: 63,
  787878: 64,
};


//the coin method results in 6 & 9 both appearing 1/8 (12.5%)
//and 7 & 8 both appearing 3/8 (37.5%).

//The yarrowstalk methods results in: 
//6 appearing 1/16 (6.25%),
//7 appearing 5/16 (31.25%),
//8 appearing 7/16 (43.75%),
//9 appearing 3/16 (18.75%)

//In both cases, all 64 hexagrams are equally probably 
//and about 87% of all divinations will include a changing line.

//With the coin method, yin (broken) lines are changing 25% of the time; 
//whereas with the yarrow method, yin lines are changing only 12.5% of the time.
//With the coin method, yang (unbroken) lines are also changing 25% of the time;
//whereas with the yarrow method, yang lines are changing 37.5% of the time.


function yarrowStalk2 () {
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
