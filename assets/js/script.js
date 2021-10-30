var currentDayEl = $("#currentDay")
var containerEl = $(".container")
var saveBtns = document.querySelectorAll(".saveBtn");
var textElArray = [];
var meetingsArray = [];

// Sets date in header
currentDayEl.text(moment().format("LL"));

// Sets background colors depending on time of day
function setColors() {

    // Determines how many hours have passed since 9:00 AM
    var startTime = moment().hour(09).minutes(0).seconds(0).milliseconds(0).format();
    var timePassed = moment(startTime).startOf(moment()).fromNow().charAt(0);
    var hoursLeft = 9;

    // Adds past class to text areas in the past
    for(var i = 0 ; i < timePassed ; i++){
        textElArray[i].addClass("past");
        hoursLeft--;
    }

    // Adds present class to text area in the active hour
    if(timePassed < 9) {
    textElArray[timePassed - 1].addClass("present");
    }
    // Adds future class to text areas coming up
    while(hoursLeft > 0){
        textElArray[9 - hoursLeft].addClass("future");
        hoursLeft--;
    }

}

// Populates text areas with locally saved text
function populateText() {
    for (var i = 0 ; i < textElArray.length ; i++){
        $(textElArray[i]).val(meetingsArray[i]);
    }
}

function saveSchedule(target) {
    var textArea = target.previousElementSibling;
    var textID = textArea.parentElement.id;

    meetingsArray[textID] = textArea.value;
    localStorage.setItem('meetings', JSON.stringify(meetingsArray));
}

// Runs on page load
function init() {

    // All save buttons are given eventListener
    var saveBtn = $(".saveBtn")
    saveBtn.click(function(event){
        event.preventDefault();
        saveSchedule(this);
    })

    // Checks to see if localStorage exists
    // If not, creates empty local storage and makes an empty meetingsArray
    if (JSON.parse(localStorage.getItem('meetings')) === null){
        for(var i = 0 ; i < containerEl.children().length ; i ++){
            textElArray.push(containerEl.children().eq(i).children().eq(1));
            meetingsArray.push("");
        }
        localStorage.setItem('meetings', JSON.stringify(meetingsArray));

    // If local storage exists, values are retrieved and populate text areas
    } else {
        for(var i = 0 ; i < containerEl.children().length ; i ++){
            textElArray.push(containerEl.children().eq(i).children().eq(1));
        }
        meetingsArray = JSON.parse(localStorage.getItem('meetings'));
        populateText();
    }

    setColors();
}

setInterval(setColors, 15000)


init();
