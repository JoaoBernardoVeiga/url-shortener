// ---------------------------------------------------------------------------

let stringA = window.prompt(`Insira a primeira string`);
let stringB = window.prompt(`Insira a segunda string`);
let stringC = window.prompt(`Insira a string para verificar o caracter mais frequente`);


function solution1(stringA, stringB) {
  let stringAChars = "";
  let skip = [];
  let flagPresent = false;

  //generates new string with unrepeated chars and generates array with position of repeated chars of stringA
  for (let counterOneStringA = 0; counterOneStringA < stringA.length; counterOneStringA++) {
    for (let counterTwoStringA = counterOneStringA + 1; counterTwoStringA < stringA.length; counterTwoStringA++) {
      if (stringA[counterOneStringA] == stringA[counterTwoStringA] && !skip.includes(counterOneStringA)) {
        skip.push(counterTwoStringA);
      }
    }
    if (!skip.includes(counterOneStringA)) {
      stringAChars += stringA[counterOneStringA];
    }
  }

  //finds if unrepeated chars are present in string B
  for (let counterChars = 0; counterChars < stringAChars.length; counterChars++) {
    flagPresent = false;
    for (let counterStringB = 0; counterStringB < stringB.length; counterStringB++) {
      if (stringAChars[counterChars] == stringB[counterStringB]) {
        flagPresent = true;
      } 
      if (counterStringB == stringB.length - 1 && !flagPresent) {
        return window.confirm(`Pelo menos 1 caracter da string A não está presente na string B: o caracter '${stringAChars[counterChars]}'`);
      }
    }
  }
  return window.confirm('Todos os caracteres da string A estão presentes na string B');
}


// ---------------------------------------------------------------------------

function solution2(stringC) {

 let index = 0;
 let indexTwo = 0;
 let charCounted = "";
 let counter = 0;
 let counterTwo = 0;
 let skip = [];
 
 if(stringC == ""){
 	return window.confirm(`---- 0 ----`);
 } 
 
 for(index = 0; index < stringC.length - 1; index ++){
 
 	counter = 1;
 
 	for(indexTwo = index + 1; indexTwo < stringC.length; indexTwo ++){
  
    if(stringC[index] == stringC[indexTwo] && !skip.includes(index)){
    
    	skip.push(indexTwo);
      counter++;
    
    }
    	
  }
  
  if(counter > counterTwo){
  	counterTwo = counter;
    counter = 0;
    charCounted = stringC[index];
  }
    
 }
 
 return window.confirm(`O caracter mais frequente da string é '${charCounted}' com ${counterTwo} ocorrências.`);
 
}



// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Execute exercise functions
solution1(stringA, stringB);
solution2(stringC);