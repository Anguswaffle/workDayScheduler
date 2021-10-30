var currentDayEl = $("#currentDay")
var containerEl = $(".container")
var saveBtns = document.querySelectorAll(".saveBtn");
var textElArray = [];
var meetingsArray = [];


currentDayEl.text(moment().format("LL"));

/*
Array of textarea elements
function that checks time
if x hours after 8AM, turn that textarea red, turn less than x hours before gray
all other boxes green

button saves to local storage
object with each hour as a property

init() runs on load, fills in boxes with localstorage stuff

*/


// Determines how many hours have passed since 8:00 AM
var startTime = moment().hour(8).minutes(0).seconds(0).milliseconds(0).format();
console.log(startTime)

console.log(moment(startTime).startOf(moment()).fromNow())

function populateText() {

    for (var i = 0 ; i < textElArray.length ; i++){
        $(textElArray[i]).val(meetingsArray[i]);
    }
}

function saveSchedule(event) {
    event.preventDefault();
    
}

function init() {
    textElArray = [];
    meetingsArray = [];
    for(var i = 0 ; i < containerEl.children().length ; i ++){
        textElArray.push(containerEl.children().eq(i).children().eq(1));
        meetingsArray.push("");
    }
    
    if (JSON.parse(localStorage.getItem('meetings')) === null){
        localStorage.setItem('meetings', JSON.stringify(meetingsArray));
    } else {
        populateText();
    }
}

// saveBtns.addEventListener('click', saveSchedule);

init();
