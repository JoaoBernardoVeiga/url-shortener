// ---------------------------------------------------------------------------

let stringA = window.prompt(`Defina uma string para contar o maior número de caracteres iguais.`);
let stringB = window.prompt(`Defina uma string para contar o maior número de caracteres diferentes.`);

function solution1(stringA) {
  let countOne = 0;
  let countTwo = 0;
  let longestSubstringOne = "";
  let longestSubstringTwo = "";
  let nOcurrencesOne = 0;
  let nOcurrencesTwo = 0;

  for (countOne = 0; countOne < stringA.length - 1; countOne++) {
    countTwo = countOne + 1;
    if (longestSubstringOne === "") {
      longestSubstringOne = stringA[countOne];
      nOcurrencesOne++;
    }
    if (stringA[countOne] === stringA[countTwo]) {
      nOcurrencesOne++;
      longestSubstringOne += stringA[countTwo]
    } else if (stringA[countOne] != stringA[countTwo]) {
      if (nOcurrencesOne > nOcurrencesTwo) {
        nOcurrencesTwo = nOcurrencesOne;
        longestSubstringTwo = longestSubstringOne;
      }
      nOcurrencesOne = 0;
      longestSubstringOne = "";
    }
  }
  if (nOcurrencesOne > nOcurrencesTwo) {
    window.confirm(`A maior substring é ${longestSubstringOne} e tem ${nOcurrencesOne} caracteres.`)
  } else {
    window.confirm(`A maior substring é ${longestSubstringTwo} e tem ${nOcurrencesTwo} caracteres.`)
  }
}


// ---------------------------------------------------------------------------
function solution2(stringB) {
  let countOne = 0;
  let countTwo = 0;
  let longestSubstringOne = "";
  let longestSubstringTwo = "";
  let nOcurrencesOne = 0;
  let nOcurrencesTwo = 0;
  let differentChars = [];

  for (countOne = 0; countOne < stringB.length - 1; countOne++) {
    countTwo = countOne + 1;
    if (longestSubstringOne === "") {
      longestSubstringOne = stringB[countOne];
      nOcurrencesOne++;
      differentChars.push(stringB[countOne]);
    }
    if (stringB[countOne] != stringB[countTwo] &&
    !differentChars.includes(stringB[countTwo])) {
      nOcurrencesOne++;
      longestSubstringOne += stringB[countTwo];
      differentChars.push(stringB[countOne]);
    } else if (stringB[countOne] === stringB[countTwo] || differentChars.includes(stringB[countTwo])) {
      if (nOcurrencesOne > nOcurrencesTwo) {
        nOcurrencesTwo = nOcurrencesOne;
        longestSubstringTwo = longestSubstringOne;
      }
      nOcurrencesOne = 0;
      longestSubstringOne = "";
      differentChars = [];
    }
  }
  if (nOcurrencesOne > nOcurrencesTwo) {
    window.confirm(`A maior substring é ${longestSubstringOne} e tem ${nOcurrencesOne} caracteres.`)
  } else {
    window.confirm(`A maior substring é ${longestSubstringTwo} e tem ${nOcurrencesTwo} caracteres.`)
  }
}



// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Execute exercise functions
solution1(stringA)
solution2(stringB)