//Selecting the HTML tags
const dateContainer = document.querySelector(".date-picker");
const inputForms = document.querySelector(".inputs");
const dateEle = document.getElementById("date-input");
const countDownContainer = document.querySelector(".countdown-container");
const title = document.querySelector(".countdown-title");
const timeValues = document.querySelectorAll(".time span");
const resetBtn = document.querySelector(".countdown-container .btn");
const completeContainer = document.querySelector(".complete-container");
const newCountDownBtn = document.querySelector(".complete-container .btn");

//Variables to indicate the time calculation
const seconds = 1000;
const minutes = seconds * 60;
const hours = minutes * 60;
const days = hours * 24;

//An object to store the title and date entered as inputs
let countDown = {};
//Variable that stores the ID value returned by the setInterval function (used for clearing the interval)
let countDownID;

//Obtaining today's date from the input
const date = new Date();
const today = date.toISOString();
const todayDate = today.slice(0, today.indexOf("T"));

//Setting the min attribute of input element so that user can choose present or future dates
dateEle.setAttribute("min", todayDate);

//A function that performs the countdown
function updateDOM() {
  //Set the title in the countdown display
  title.textContent = countDown.title;
  //Perform the countdown operation
  countDownID = setInterval(() => {
    const currentTime = new Date().getTime();
    const chosenTime = new Date(countDown.date).getTime();
    const timeRemaining = chosenTime - currentTime;

    dateContainer.hidden = true;

    if (timeRemaining < 0) {
      countDownContainer.hidden = true;
      clearInterval(countDownID);
      completeContainer.hidden = false;
    } else {
      countDownContainer.hidden = false;
    }

    const daysLeft = Math.floor(timeRemaining / days);
    const hoursLeft = Math.floor((timeRemaining % days) / hours);
    const minutesLeft = Math.floor((timeRemaining % hours) / minutes);
    const secondsLeft = Math.floor((timeRemaining % minutes) / seconds);

    timeValues[0].textContent = daysLeft;
    timeValues[1].textContent = hoursLeft;
    timeValues[2].textContent = minutesLeft;
    timeValues[3].textContent = secondsLeft;
  }, seconds);
}

//Function that updates the variables with the necessary values for display
function updateFormValues(e) {
  e.preventDefault();
  countDown.title = e.srcElement[0].value;
  countDown.date = e.srcElement[1].value;
  localStorage.setItem("countDown", JSON.stringify(countDown));
  updateDOM();
}

//Function which resets the countdown/allows a user to set a new countdown
function reset() {
  clearInterval(countDownID);
  countDownContainer.hidden = true;
  completeContainer.hidden = true;
  dateContainer.hidden = false;
  countDown = {};
  localStorage.removeItem("countDown");
  inputForms.reset();
}

//Function which retrieves the countdown value set in the local storage to resume the countdown
function restoreCountDownValue() {
  if (localStorage.getItem("countDown")) {
    dateContainer.hidden = true;
    countDown = JSON.parse(localStorage.getItem("countDown"));
    updateDOM();
  }
}

restoreCountDownValue();

//Event listeners
inputForms.addEventListener("submit", updateFormValues);
resetBtn.addEventListener("click", reset);
newCountDownBtn.addEventListener("click", reset);
