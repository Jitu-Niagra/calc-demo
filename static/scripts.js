/**
 * List the key pressed
 *          numerical or operator key 
 * Display the value on the screen
 *      display the key clicked and add decimal  point(if cliccked)
 *      tell if the previous calculator is an operator
 *      equal sign is hit-:second value ,first value ,operator 
 * Decimal and operator
 *          if the decimal is hit after calculate
 * Update the data-key-previous-type for each
 * Claen up the code 
 * End
 * 
 */

 const  calculator=document.getElementById("Calculator");
 const keys=document.getElementById("keys");
 const screen=document.getElementById("screen")

//  Add  eventlistener when clicked

keys.addEventListener("click",e=>{
    
    const key= e.target
    const action=key.dataset.action
    const keyContent=key.textContent
    const screenNum=screen.textContent
    const previousKeyType=calculator.dataset.previousKeyType
    if(!action){
        // Display number
        if(screenNum==="" || previousKeyType==='operator'||previousKeyType==="calculate"){
            screen.textContent=keyContent
        }else{
            screen.textContent=screenNum+keyContent
        }
        calculator.dataset.previousKeyType="number"
        console.log('number key!')

    }
    if(
        action ==='add'||
        action ==='subtract'||
        action ==='multiply'||
        action ==='divide'
    ){
        screen.textContent=screenNum+keyContent
        // Get the firstVal and the operator
        


        const firstVal=calculator.dataset.firstVal
        const operator=calculator.dataset.operator
        const secondVal=screenNum
        
        // Check for the first val and  operator

        if(firstVal &&operator && previousKeyType !== 'operator' && previousKeyType!=='calculate'){
            const calcVal=calculate(firstVal,operator,secondVal)
            screen.textContent=calcVal;
            calculator.dataset.firstVal=calcVal

        }else{
            calculator.dataset.firstValue=screenNum
        }
        calculator.dataset.previousKeyType="operator"
        calculator.dataset.firstVal=screenNum
        calculator.dataset.operator=action
        console.log('opereator key!')
    }

    // decimal key clicked
    if (action==='decimal'){
        if(!screenNum.includes('.')){
            screen.textContent=screenNum+"."
        }else if(previousKeyType==="operator"|| previousKeyType==='calculate'){
            screenNum.textContent=""
        }
        calculator.dataset.previousKeyType="decimal"
        console.log('decimal key!')
    }

    // calculate key is clicked
    if (action==='calculate'){
        const firstVal=calculator.dataset.firstVal
        const operator=calculator.dataset.operator
        const secondVal=screenNum
         console.log(firstVal,operator,secondVal)
        // /Perform the calculation
        if(firstVal){
            if(previousKeyType ==="calculate"){
                firstVal=screenNum
                secondVal=calculator.dataset.modVal
            }
            screen.textContent=calculate(firstVal,operator,secondVal)
         }

        //  Set Modal attribute
        calculator.dataset.modVal=secondVal
        
        calculator.dataset.previousKeyType="calculate"
        console.log('calculate key!')
    }
    if(action==='clear'){
        console.log('clear key')
       

        if(key.textContent==='AC'){
            calculator.dataset.firstValue=''
            calculator.dataset.modValue=''
            calculator.dataset.operator=''
            calculator.dataset.previousKeyType=''
            key.textContent="C"
        }else{
            key.textContent='C'
        }
        screen.textContent=''
        calculator.dataset.previousKeyType='clear'
    }
    if(action !=='clear'){
        const clearBtn=calculator.querySelector('[data-action=clear]')
        clearBtn.textContent="AC"
    }

})

const calculate=(a,operator,b)=>{
    let result =''
    const firstNum=parseFloat(a)
    const seconNum=parseFloat(b)

    if (operator==='add') return result=firstNum+seconNum
     if (operator==='subtract') return result=firstNum-seconNum
     if (operator==='multiply') return result=firstNum*seconNum
     if (operator==='divide') return result=firstNum/seconNum
    

    return result;
}