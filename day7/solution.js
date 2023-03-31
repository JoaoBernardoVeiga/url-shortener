// ---------------------------------------------------------------------------

let stringA = window.prompt("Insira a string para retirar vogais");
let stringT = window.prompt("Insira a string a truncar");
let intN = window.prompt("Insira o número de caracteres máximo");

function solution1(stringA) {

  let counter = 0;
  let stringNoVowels = "";
  let charToVerify = "";

  while (counter <= stringA.length - 1) {
    charToVerify = stringA[counter].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    if (charToVerify != 'a' &&
      charToVerify != 'e' &&
      charToVerify != 'i' &&
      charToVerify != 'o' &&
      charToVerify != 'u') {
      stringNoVowels += stringA[counter];
    }
    counter++;
  }

  window.confirm(`A string sem vogais é: ${stringNoVowels}`);

}


// ---------------------------------------------------------------------------

function solution2(stringT, intN) {

  let counterStringT = 0;
  let counterMax = 0;
  let result = "";

  while (counterStringT < stringT.length) {
    if (stringT[counterStringT] == ' ') {
      counterMax = 0;
      result += stringT[counterStringT];
      counterStringT++;
    }
    if (counterMax < intN) {
      result += stringT[counterStringT];
    }
    counterStringT++;
    counterMax++;
  }

  window.confirm(`A string truncada com palavras com máximo de ${intN} caracteres é: ${result}`)
}



// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Execute exercise functions
solution1(stringA)
solution2(stringT, intN)