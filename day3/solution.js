// ---------------------------------------------------------------------------
let intN = 0;
intN = Number(window.prompt("Insira um número para calcular o seu fatorial"));

function solution(intN) {
    let counter = 0;
    let arrayN = [];
    let arrayNMinus1 = [];
    let arrayfactorial = [];
    
    let suficientlySmall = 1;

    if (suficientlySmall){
      let factorial = intN;
      for(counter = intN -1; counter > 1; counter--){
        factorial *= counter;
      }
      let factorialLast2 = factorial % 100
      window.confirm(`O fatorial de ${intN} é ${factorial} e os seus dois últimos dígitos são ${factorialLast2}`);
    }


    // while(counter >= 2){
    //     let tempCounter = counter;
        
    //     arrayN = intToArray(tempCounter);
    //     arrayNMinus1 = getArrayMinus1(arrayN);


    //     counter--;
    // }






    // window.confirm(`O fatorial de ${intN} é ${factorial}`);
}

function getArrayMinus1(arrayN) {
    let arrayNMinus1 = arrayN;
    let indexArray = arrayNMinus1.length - 1;
    if (arrayNMinus1.length == 1 && arrayNMinus1[indexArray] == 0) {
      arrayNMinus1[indexArray] = 0;
    } else {
      if (arrayNMinus1[indexArray] == 0) {
        arrayNMinus1[indexArray] = 9;
        while (arrayNMinus1[indexArray -1] == 0) {
          indexArray -= 1;
          arrayNMinus1[indexArray] = 9;
        }
        if (arrayNMinus1[indexArray -1] != 0) {
          arrayNMinus1[indexArray-1] -= 1;
          if(arrayNMinus1[0]==0){
              arrayNMinus1.shift();
          }
        }
      } else {
        if (arrayNMinus1[indexArray] != 0) {
          arrayNMinus1[indexArray] -= 1;
        }
      }
    }
  
    return arrayNMinus1;
  }
  
  
  function intToArray(tempCounterN) {
    let tempArrayN = [];
    if (tempCounterN == 0) {
      tempArrayN.unshift(tempCounterN);
    } else {
      while (tempCounterN > 0) {
        tempArrayN.unshift(tempCounterN % 10);
        tempCounterN = Math.floor(tempCounterN / 10);
      }
    }
    return tempArrayN;
  }



// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Execute exercise functions
solution(intN);