var currentDayEl = $("#currentDay")

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