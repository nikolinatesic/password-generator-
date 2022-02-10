const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const lowercaseEl = document.getElementById('lowercase')
const uppercaseEl = document.getElementById('uppercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const password = resultEl.innerText
    
    if (!password) {return}
    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Password is copied to clickboard')
    
})

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value 
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbols = symbolsEl.checked
    resultEl.innerText = generatePassword (hasUpper, hasLower, hasNumber, hasSymbols,length)
   
})

 function generatePassword(lower, upper, number, symbol, length){
     let genratedPassword = ''
     const typesCount = lower + upper + number + symbol
     const typeArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])
     
     if(typesCount === 0){
         return ''
     }
     
     
     for (i=0; i<length; i += typesCount){
         typeArr.forEach(type => {
             const funcName = Object.keys(type)[0]
             genratedPassword += randomFunc[funcName]()
         })
     }
     const finalPassword = genratedPassword.slice(0, length)
     return finalPassword
     
 }


function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random()* 26) + 97)
}
function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random()* 26) + 65)
}
function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random()* 10) + 48)
}
function getRandomSymbol(){
    const symbols = '!@#$%^&*()[]{}=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}



