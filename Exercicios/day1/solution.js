// ---------------------------------------------------------------------------
function solution1() {
    let aNumber = 0
    let sumNumbers = 0
    aNumber = Number(prompt("Insira um número para adicionar à soma ou '0' para devolver a soma"));
	while(aNumber != 0){
  	    sumNumbers += aNumber; 
		aNumber = Number(prompt("Insira um número para adicionar à soma ou '0' para devolver a soma"));
	}
    result = window.confirm("A soma dos números é " + sumNumbers);
}


// ---------------------------------------------------------------------------
function solution2() {
    let aNumber = 0
    let highestNum = 0
    aNumber = Number(prompt("Insira um número para adicionar ao conjunto ou '0' para devolver o maior número"));
      while(aNumber != 0){
        if(aNumber > highestNum || highestNum == 0){highestNum = aNumber;} 
          aNumber = Number(prompt("Insira um número para adicionar ao conjunto ou '0' para devolver o maior número"));
      }
    result = window.confirm("O maior número é " + highestNum);
}



// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Execute exercise functions
solution1()
solution2()