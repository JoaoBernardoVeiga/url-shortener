// ---------------------------------------------------------------------------

let stringA = window.prompt("Insira a primeira string a comparar");
let stringB = window.prompt("Insira a segunda string a comparar");

let stringC = window.prompt("Insira string a inverter");

function solution1(stringA, stringB) {
  let counter = 0;

  stringA = stringA.toLowerCase();
  stringB = stringB.toLowerCase();

  let result = 0;

  let AIsLonger = false;

  if (stringA.length > stringB.length) {
    AIsLonger = true;
  } else {
    AIsLonger = false;
  }

  //exclude the case strings are equal
  if (stringA == stringB) {
    result = 0;
    return window.confirm(`---- 0 ----`);
  }

  while (counter < stringA.length &&
    counter < stringB.length) {
    if (stringA[counter] < stringB[counter]) {
      return window.confirm(`---- -1 ----`);
    } else if (stringA[counter] > stringB[counter]) {
      return window.confirm(`---- 1 ----`);
    }
    counter++;
  }
  if (AIsLonger) {
    return window.confirm(`---- -1 ----`);
  } else {
    return window.confirm(`---- 1 ----`);
  }

}


// ---------------------------------------------------------------------------
function solution2(stringC) {

  let counter = stringC.length - 1;
  let invertedString = "";

  while (counter >= 0) {
    invertedString += stringC[counter];
    counter--;
  }

  window.confirm(`A string invertida é: ${invertedString}`);

}


// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Execute exercise functions
solution1(stringA, stringB)
solution2(stringC)