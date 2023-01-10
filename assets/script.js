// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
let currentDate = dayjs(); // gets the current date
let displayDate = $("#currentDay");
displayDate.text(currentDate.format("MMM D, YYYY")); 
let saveMessage = $("#message");


$(document).ready(function () {
  // Select all save buttons
  let saveButtons = $(".saveBtn");
  // Add a click event listener to each save button
  saveButtons.on("click", function (event) {
    // The `this` keyword refers to the element that was clicked
    let saveButton = $(this);
    //display message?
    saveMessage.text('Task has been saved');
    setTimeout(function () {
      // clear save message after two seconds
      saveMessage.text = ("");
    }, 2000);
    // Find the time-block element that contains the save button
    let timeBlock = saveButton.closest(".time-block");
    // Get the id of the time-block element (e.g. "hour-8")
    let id = timeBlock.find(".hour").attr("id");
    // Get the value of the description input field
    let description = timeBlock.find(".description").val();
    // Save the description in local storage using the id as the key
    localStorage.setItem(id, description);
    console.log(localStorage);
    
  });

function trackTime() {
  let currentHour = new Date().getHours();
  console.log(currentHour);
  let timeBlocks = $(".time-block");
  console.log(timeBlocks.length);

  timeBlocks.each(function () {
    let time = $(this).attr("id").split("hour")[1];
    console.log($(this).attr("id").split("hour")[1]);
    if (currentHour == time) {
      $(this).addClass("present");
    } else if (currentHour < time) {
      $(this).removeClass("present");
      $(this).addClass("future");
    } else if (currentHour > time) {
      $(this).removeClass("future");
      $(this).addClass("past");
    }
  });
}
trackTime();

// work on this
let timeBlocks = $(".time-block");
timeBlocks.each(function () {
  let timeBlock = $(this);
  let id = timeBlock.find(".hour").attr("id");
  let description = localStorage.getItem(id);
  if (id === description) {
    timeBlock.find(".description").val(description);
  }
});

});

  // TODO: Add a listener for click events on the save button
  // This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?


  //
  // TODO: Add code to display the current date in the header of the page.

