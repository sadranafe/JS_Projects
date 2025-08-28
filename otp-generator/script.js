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
