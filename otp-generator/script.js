const OTPplaceholder = document.querySelector('.OTPplaceholder>span');
const modalBoxOverlay = document.querySelector('.modalBoxOverlay');
const modalBox = document.querySelector('.modalBox');
const modalBoxTitle = document.querySelector('.modalBox>h2');
const modalBoxContent = document.querySelector('.modalBox>p');
const otpBtn = document.querySelector('.otpBtnHandler');

const inputs = document.querySelectorAll('input');
const maxLengthInput = 1;
const EnteredOTP = [];

const OTPgenerator = (min = 5 , max = 6) => {
    return Math.pow(10 , min) + Math.floor(Math.random() * (Math.pow(10 , max - 1)))
}

window.addEventListener('DOMContentLoaded' , () => {
    OTP = OTPgenerator()
    OTPplaceholder.innerHTML = OTP
})

modalBoxOverlay.addEventListener('click' , () => {
    modalBox.style.display = 'none'
    modalBoxOverlay.style.display = 'none'
})

inputs.forEach( (ele , key) => {
    ele.addEventListener('input' , val => {
        if(val.target.value.length <= maxLengthInput) {
            EnteredOTP.splice(key , 1 , val.target.value)
            otpChecker(OTP , EnteredOTP)
        } else {
            ele.value = EnteredOTP[key]
        }
    })
})

const otpChecker = (savedOTP , enteredOTP) => {
    let enteredOTPInput = '';
    enteredOTP.map(val => {
        enteredOTPInput += val
        if(enteredOTPInput.length === 6) {
            if(savedOTP === Number(enteredOTPInput)) {
                inputs.forEach(input => {
                    input.style.borderColor = '#14e14d'
                })

                otpBtn.addEventListener('click' , () => {
                    otpModalHandler('successful✅' , 'welcome back' , true)
                })
                
            } else {
                inputs.forEach(input => {
                    input.style.borderColor = '#e11414'
                })

                otpBtn.addEventListener('click' , () => {
                    otpModalHandler('Ooops . . . Error❌' , 'invalid input' , true)
                })
            }
        }
    })
}

const moveToNextInput = (currentInput , nextInput = inputs) => {
    const nextInputELement = nextInput[currentInput.tabIndex + 1]
    const previousElement = nextInput[currentInput.tabIndex - 1]
    const { length: inputLength } = currentInput.value

    if(inputLength === maxLengthInput){
        if(nextInputELement){
            nextInputELement.focus()
        }
    } else if(inputLength < maxLengthInput) {
        currentInput.addEventListener('keyup' , ev => {
            if(ev.keyCode === 8 && previousElement){
                previousElement.focus()
            }
        })
    }
}

const otpModalHandler = (title , content , isOpen) => {
    if(isOpen) {
        modalBox.style.display = 'flex'
        modalBoxOverlay.style.display = 'block'
        modalBoxTitle.innerHTML = title;
        modalBoxContent.innerHTML = content;
    }
}