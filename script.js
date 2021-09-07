class Calculator{
    
    constructor(dataPrevious, dataCurrent){
        this.dataPrevious = dataPrevious;
        this.dataCurrent = dataCurrent;
        this.clear(); //as soon as we create a calculate, we reset.
    }

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.'))
            return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        //stops us from executing operation without two numbers
        if(this.currentOperand === '')
            return;

        //if already there is one operation and we call next operation, we compute the previous operation, then do the current operation
        if(this.previousOperand !== '')
            this.compute();

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        let result;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);

        if(isNaN(prev) || isNaN(curr))
            return;

        switch(this.operation){
            case '+':
                result = prev + curr;
                break;

            case '-':
                result = prev - curr;
                break;

            case '*':
                result = prev * curr;
                break;

            case '/':
                result = prev / curr;
                break;

            case '%':
                result = prev % curr;
                break;

            default:
                return;
        }
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
    }

    //for commas
    getDisplayNumber(number){
        var stringNumber = number.toString();

        //get the first half of arr returned by split
        var integerPart = parseFloat(stringNumber.split('.')[0]);

        //get the second half of the arr returned by split
        var decimalPart = stringNumber.split('.')[1];

        var integerDisplay;
        if(isNaN(integerPart)){
            integerDisplay = '';
        }else{
            integerDisplay = integerPart.toLocaleString('en', {maximumFractionDigits: 0});
        }

        if(decimalPart != null){
            return `${integerDisplay}.${decimalPart}`;
        }else{
            return integerDisplay
        }
    }

    updateDisplay(){
        this.dataCurrent.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.dataPrevious.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        }else{
            this.dataPrevious.innerText = this.getDisplayNumber(this.previousOperand);
        }
    }

}



var numberButtons = document.querySelectorAll('[data-number]');
var operatorButtons = document.querySelectorAll('[data-operator]');
var equalsButton = document.querySelector('[data-equals]');
var deleteButton = document.querySelector('[data-delete]');
var allClearButton = document.querySelector('[data-all-clear]');
var dataPrevious = document.querySelector('[data-previous-operand]');
var dataCurrent = document.querySelector('[data-current-operand]');

const calculator = new Calculator(dataPrevious, dataCurrent);

numberButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
})

operatorButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
})

equalsButton.addEventListener('click', ()=>{
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', ()=>{
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', ()=>{
    calculator.delete();
    calculator.updateDisplay();
});