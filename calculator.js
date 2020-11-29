// Az eval metódus használata SZIGORÚAN TILOS! Most és mindörökké!
// Egyelőre nem kell foglalkozni azzal az esettel, hogy mi történik, ha két műveleti jel van egymás után. Ilyen esetekben dobhattok hibát. A felső input mezőben jelenjen meg az ERROR szöveg. 
// Egymás után több művelet is végrehajtható. Pl.: 10-20+3*2. Ilyen esetben a precedencia szabályokra még nem kell odafigyeled, csak balról jobbra, sorba értékelődjenek ki a műveletek!
// A számok, és műveleti jelek a felső input mezőben jelenjenek meg
// Az egyenlőségjelre kattintva az inputban megjelenik a művelet(ek) eredménye
// A C gomb törli az input mező tartamát

// Selectors used:
const displayInput = document.querySelector('.display');

let inputString = '';
let inputOps = '';
let lastCharOperator = false;
const addEventTextToDisplayInput = (event) => {
    displayInput.innerHTML += event.target.textContent;
    if (event.target.textContent === '+' ||                         //  43 - plus
        event.target.textContent === '-' ||                         //  45 - minus
        event.target.textContent === String.fromCharCode(215) ||    // 215 - multiply
        event.target.textContent === String.fromCharCode(247)) {    // 247 - divide
        if (lastCharOperator) {
            inputError();
            return;
        } else {
            inputString += ','; 
        }
        inputOps += event.target.textContent;
        lastCharOperator = true;
    } else {
        inputString += event.target.textContent;
        lastCharOperator = false;
    }
}

const deleteDisplayContent = () => {
    displayInput.innerHTML = '';
    inputString = '';
    inputOps = '';
    lastCharOperator = false;
}

const evaluateInput = () => {
    let inputResult = 0;
    const inputArray = inputString.split(',');
    const inputOpsArray = inputOps.split('');
    testInput(inputArray, inputOpsArray, inputResult);
    inputResult = evaluateResult(inputArray, inputOpsArray, inputResult);
    displayInput.innerHTML = inputResult;
}

const testInput = (inputArray, inputOpsArray, inputResult) => {
    if (inputOpsArray.length === inputArray.length - 1) {
        const testArray = inputArray.filter(element => element === NaN);
        if (testArray.length > 0) {
            inputError();
            return;
        }
        return;
    } else {
        inputError();
        return;
    }
}

const inputError = () => {
    displayInput.innerHTML = 'error';
    inputString = '';
    inputOps = '';
    lastCharOperator = false;
}

const evaluateResult = (inputArray, inputOpsArray, inputResult) => {
    inputResult = parseFloat(inputArray [0]);
    for (let i=0; i<inputOpsArray.length; i+=1) {
        switch (inputOpsArray[i]) {
        case '+':
            inputResult += parseFloat(inputArray[i+1]);
            break;
        case '-':
            inputResult -= parseFloat(inputArray[i+1]);
            break;
        case String.fromCharCode(215):
            inputResult *= parseFloat(inputArray[i+1]);
            break;
        case String.fromCharCode(247):
            inputResult /= parseFloat(inputArray[i+1]);
            break;
        default:
            inputResult = 'error';
            inputError();
            return;
        }
    }
    return inputResult;
}

const handleClick = (event) => {
    if (event.target.textContent === '=') {
        evaluateInput();
        return;
    } else {
        if (event.target.textContent === 'C') {             // 67
            deleteDisplayContent();
            return;
        }
    }
    addEventTextToDisplayInput(event);
}
const addListener = () => {
    document.querySelectorAll('.calculator-key').forEach(element => {
        element.addEventListener('click', handleClick)
    });
}



addListener();