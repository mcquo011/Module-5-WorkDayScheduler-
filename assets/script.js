let currentDate = dayjs(); 
let displayDate = $("#currentDay");
displayDate.text(currentDate.format("MMM D, YYYY")); 
let saveMessage = $("#message");
let clearTasks = $("#clear")


$(document).ready(function () {
  let saveButtons = $(".saveBtn");
  // Add a click event listener to each save button
  saveButtons.on("click", function (event) {
  // `this` keyword refers to the element that was clicked
    let saveButton = $(this);
  // Find the time-block element that contains the save button
    let timeBlock = saveButton.closest(".time-block");
  // Get the id of the time-block element
  let id = timeBlock.attr("id");
    // Get the value of the description input field
    let description = timeBlock.find(".description").val();
    // Save the description in local storage using the id as the key
    localStorage.setItem(id, JSON.stringify(description));
  });

  // Iterate over all the time blocks and retrieve the description from local storage
  $('.time-block').each(function() {
    let id = $(this).attr("id");
    let description = localStorage.getItem(id);
    if (description) {
      $(this).find('.description').val(JSON.parse(description));
    }
  });

  // gives the user the option to clear all tasks
  clearTasks.on("click", function(event){
    if (confirm("Are you sure you want to clear your tasks for the day?")){
      localStorage.clear();
      $(".time-block .description").val("");
    }
  })


// Set classes to past, present, future
  function trackTime() {
    let currentHour = new Date().getHours();
    let timeBlocks = $(".time-block");
   

    timeBlocks.each(function () {
      let time = $(this).attr("id").split("hour")[1];
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
});




