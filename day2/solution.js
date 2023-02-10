// ---------------------------------------------------------------------------
function solution1() {
    let aNumber = 0;
    let arrayBinary = [];
    let numberBytes = 0;

    aNumber = Number(prompt("Insira um número decimal para calcular o numero de bits necessarios para representação"));
    if (aNumber == 0) {
        numberBytes = 1;
    } else {
        while (aNumber != 0) {
            arrayBinary.unshift(aNumber % 2);
            aNumber = Math.floor(aNumber / 2);
        }
        numberBytes = arrayBinary.length;    
    }
    window.confirm(`O número de bytes é ${numberBytes}`);
}


// ---------------------------------------------------------------------------
function solution2() {
    let aNumber = 0;
    let numberBytes = 0;

    aNumber = Number(prompt("Insira um número decimal para calcular o numero de 1s necessarios para representação binária"));
    
        while (aNumber != 0) {
            if(aNumber%2 == 1){
            	numberBytes += 1;
            }
            aNumber = Math.floor(aNumber / 2);
        }
        window.confirm(`O número de 1s é ${numberBytes}`);

}



// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Execute exercise functions
solution1()
solution2()