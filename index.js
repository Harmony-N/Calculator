class Caculator{
    constructor(currentOperandText,previousOperandText){
        this.currentOperandText= currentOperandText
        this.previousOperandText= previousOperandText
        this.clear()
    }
    clear(){
        this.currentOperand=''
        this.previousOperand=''
        this.operation=undefined

    }
    delete(){
        this.currentOperand= this.currentOperand.toString().slice(0,-1)

    }
    appendNumber(number){
        if(number == '.' && this.currentOperand.includes('.')) return
        this.currentOperand= this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation){
        if(this.currentOperand=='')return
        if(this.previousOperand !== ''){
            this.compute()
        }
     this.operation = operation
     this.previousOperand = this.currentOperand
     this.currentOperand = ''
    }
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
          case '+':
            computation = current + prev
            break;
          case '-':
            computation = prev - current
            break;
          case '*':
            computation = prev * current
            break;
          case '÷':
            computation = prev / current
            break;
          default:
            return          
        }
        this.currentOperand = computation
        this.operation= undefined
        this.previousOperand= ''


    }
    updateDisplay(){
       this.currentOperandText.innerText= this.currentOperand
       this.previousOperandText.innerText= this.previousOperand
      
       
    }
}




const displayNumber = document.querySelector('display')
const previousOperandText = document.querySelector('[data-previous-operand]')
const currentOperandText = document.querySelector('[ data-current-operand ]')
const dataClearButton = document.querySelector('[data-clear]')
const dataDeleteButton = document.querySelector('[data-delete]')
const dataOperationButton = document.querySelectorAll('[data-operation]')
const dataNumberButton = document.querySelectorAll('[data-number]')
const dataEqualButton = document.querySelector('[data-equals]')

const calculator = new Caculator(currentOperandText, previousOperandText)

dataNumberButton.forEach(button => {
    button.addEventListener('click', () =>{
         calculator.appendNumber(button.innerText)
         calculator.updateDisplay()
    })
})

dataOperationButton.forEach(button => {
    button.addEventListener('click', () =>{
         calculator.chooseOperation(button.innerText)
         calculator.updateDisplay()
    })
})


    dataDeleteButton.addEventListener('click', () =>{
         calculator.delete()
         calculator.updateDisplay()
    })

    dataClearButton.addEventListener('click', () =>{
        calculator.clear()
        calculator.updateDisplay()
   })

   dataEqualButton.addEventListener('click', ()=>{
    calculator.compute()
    calculator.updateDisplay()
   })
