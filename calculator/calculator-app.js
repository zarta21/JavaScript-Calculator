
// Dark Mode Variables:
let darkMode = localStorage.getItem("darkMode");
const switchMode = document.querySelector("#switch");
const btn = document.querySelector(".toggle");

darkModeOn = () => {
    document.body.classList.add("dark");
    localStorage.setItem("darkMode", "on");
};

darkModeOff = () => {
    document.body.classList.remove("dark");
    localStorage.setItem("darkMode", null);
};

if (darkMode === "on") {
    darkModeOn();
    btn.innerHTML = "&#9898";
};

switchMode.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode");
    if (darkMode !== "on") {
        darkModeOn();
        btn.innerHTML = "&#9898";
    } else {
        darkModeOff();
        btn.innerHTML = "&#9899";
    }
});


const display1 = document.querySelector(".display1");
const display2 = document.querySelector(".display2");
const numbers = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const equal = document.querySelector("#equals");
const AC = document.querySelector(".AC");
const C = document.querySelector(".C");
const decimal = document.querySelector("#decimal");
const sound = document.querySelector("#sound");

let firstValue = "";
let secondValue = "";
let result;
let selectedOpr;

const doTheMath = () => {
    if (selectedOpr === "×") {
        result = parseFloat(result) * parseFloat(secondValue);
    } else if (selectedOpr === "+") {
        result = parseFloat(result) + parseFloat(secondValue);
    } else if (selectedOpr === "-") {
        result = parseFloat(result) - parseFloat(secondValue);
    } else if (selectedOpr === "÷") {
        result = parseFloat(result) / parseFloat(secondValue);
    }
};

numbers.forEach(number =>  number.addEventListener("click", (e) => {
    playSound()
    if (e.target.innerText === "." && display2.innerText.includes(".")) {
      return;
    } else if (e.target.innerText === "0" && display2.innerText.charAt(0) == "0") {
        return;
    } 
    secondValue += e.target.innerText;
    display1.innerText = secondValue;
    display2.innerText = secondValue;
  })
);

operator.forEach(opr => opr.addEventListener("click", (e) => {
    playSound();
    opr = e.target.innerText;
    secondValue = display2.innerText;
    if (firstValue && secondValue && selectedOpr) {
        if (opr === "-" && display1.innerText.slice(-1) === "×") {
                secondValue = "-" + secondValue;
                firstValue += "-" + " ";
                result = -parseFloat(result); 
                opr = "×";
        } else if (opr === "-" && display1.innerText.slice(-1) === "÷") {
            secondValue = "-" + secondValue;
                firstValue += "-" + " ";
                result = -parseFloat(result); 
                opr = "÷";
        } else if (opr === "-" && display1.innerText.slice(-1) === "+") {
            secondValue = "-" + secondValue;
                firstValue += "-" + " ";
                result = -parseFloat(result); 
                opr = "+";
        } else if (opr && display1.innerText.slice(-1) === "-") {
            firstValue += secondValue + " " + opr + " ";
            result = -parseFloat(result);
        } else if (opr && display1.innerText.slice(-1) !== "-" && display1.innerText.slice(-1) == opr) {
            firstValue += secondValue + " " + opr + " ";
            result = parseFloat(result);
        } else {
            doTheMath(); 
            firstValue += secondValue + " " + opr + " ";
        }      
    } else {
        result = parseFloat(secondValue);
        firstValue += secondValue + " " + opr + " ";
    }
    
    display1.innerText = firstValue;
    display2.innerText = result;
    secondValue = "";
    selectedOpr = opr;
}));

equal.addEventListener("click", () => {
    if (!secondValue || !firstValue) return;
    doTheMath();
    firstValue += secondValue + " ";
    display1.innerText += result;
    display2.innerText = result;
    secondValue = "0";
});

AC.addEventListener("click", () => {
    playSound();
    firstValue = "";
    secondValue = "";
    display1.innerText = "0";
    display2.innerText = "0";
    result = "";
});

C.addEventListener("click", () => {
    playSound();
    display1.innerText = display1.innerText.slice(0, -1);
    display2.innerText = display2.innerText.slice(0, -1);
    secondValue = display2.innerText;
})

playSound = () => {
    sound.currentTime = 0;
    sound.play();
}
