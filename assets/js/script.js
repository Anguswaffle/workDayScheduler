var containerEl = $(".container")
var textElArray = [];
var meetingsArray = [];

// Sets date in header
$("#currentDay").text(moment().format("LL"));

// Runs on page load
function init() {

    // All save buttons are given eventListener
    var saveBtn = $(".saveBtn")
    saveBtn.click(function (event) {
        event.preventDefault();
        saveSchedule(this);
    })

    // Checks to see if localStorage exists
    // If not, makes an empty meetingsArray and stores in local storage
    if (JSON.parse(localStorage.getItem('meetings')) === null) {
        for (var i = 0; i < containerEl.children().length; i++) {
            textElArray.push(containerEl.children().eq(i).children().eq(1));
            meetingsArray.push("");
        }
        localStorage.setItem('meetings', JSON.stringify(meetingsArray));

        // If local storage exists, values are retrieved and populate text areas
    } else {
        for (var i = 0; i < containerEl.children().length; i++) {
            textElArray.push(containerEl.children().eq(i).children().eq(1));
        }
        meetingsArray = JSON.parse(localStorage.getItem('meetings'));
        populateText();
    }

    setColors();
}

function saveSchedule(target) {
    var textArea = target.previousElementSibling;
    var textID = textArea.parentElement.id;

    meetingsArray[textID] = textArea.value;
    localStorage.setItem('meetings', JSON.stringify(meetingsArray));
}

// Populates text areas with locally saved text
function populateText() {
    for (var i = 0; i < textElArray.length; i++) {
        $(textElArray[i]).val(meetingsArray[i]);
    }
}

// Sets background colors depending on time of day
function setColors() {

    // Determines how many hours have passed since 9:00 AM
    var hoursPassed = new Date().getHours();
    var hoursLeft = 9;

    // If before 9 AM, past and present hours aren't colored
    if (hoursPassed >= 0) {
        // Adds past class to text areas in the past
        for (var i = 0; i < hoursPassed && i < 9; i++) {
            textElArray[i].addClass("past");
            hoursLeft--;
        }

        // Adds present class to text area in the active hour
        if (hoursPassed >= 0 && hoursPassed < 9) {
            textElArray[hoursPassed].addClass("present");
            hoursLeft--;
        }
    }

    // Adds future class to text areas coming up
    while (hoursLeft > 0) {
        textElArray[9 - hoursLeft].addClass("future");
        hoursLeft--;
    }
}

// Checks time every 15 seconds and updates text area background color if hour has changed
setInterval(setColors, 15000)

init();
