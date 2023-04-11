let stringA = window.prompt(`Insira a frase para contar o número de palavras.`);
let stringB = window.prompt(`Insira a palavra a verificar se é paléndrome.`)
// ---------------------------------------------------------------------------
function solution1(stringA) {
	let charInString = "";
  let wordCount = 1;
    
  for(let index = 0; index < stringA.length; index++ ){  	
  	if(stringA[index] === " "){
    	wordCount++;
    }
  }
  window.confirm(`A frase "${stringA}" tem ${wordCount} palavras`);
}


// ---------------------------------------------------------------------------
function solution2(stringB) {
	let reversedWord = "";
  
  for(let index = stringB.length - 1; index >= 0; index--){
  	reversedWord += stringB[index];
  }
  
  console.log(reversedWord)
  if(stringB.toLowerCase() === reversedWord.toLowerCase()){
  	window.confirm(`A palavra "${stringB}" é um paléndrome`);
  } else {
  	window.confirm(`A palavra "${stringB}" não é um paléndrome`);
  }
}



// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Execute exercise functions
solution1(stringA)
solution2(stringB)