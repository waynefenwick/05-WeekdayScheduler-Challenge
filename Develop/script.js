// NOTE: Wrap all code that interacts with the DOM in a call to jQuery
// to ensure that the code isn't run until the browser has finished
// rendering all the elements in the html.

var saveBtn = document.querySelector('.btn saveBtn');
var textArea = document.querySelector('.description');
var pastTb = document.querySelector('.row time-block past');
var presentTb = document.querySelector('.row time-block present');
var futureTb = document.querySelector('.row time-block future');


// TODO: Add code to display the current date in the header of the page.
var headerDateEl = document.querySelector('#currentDay'); // Sets up access to the HTML element
var headerDateJs = dayjs().format('dddd, MMMM DD, YYYY'); // Sets up access to dayjs date formats
headerDateEl.textContent = headerDateJs; // The headerDate element's text content will now display (=) the dayjs date format 


// TODO: Add code to get any user input that was saved in localStorage
// and set the values of the corresponding textarea elements.
// HINT: How can the id attribute of each time-block be used to do this?
function UserInput() {
    // Loop through each time block
    for (let i = 9; i <= 17; i++) {
      // Get the saved input for this time block
      const userInput = localStorage.getItem(`hour-${i}`);
      // If there is saved input, set the value of the textarea
      if (userInput) {
        const textarea = document.querySelector(`#hour-${i} .description`);
        textarea.value = savedInput;
      }
    }
  }
  // Call the function to load saved inputs on page load
  UserInput();


// TODO: Add a listener for click events on the save button.
// This code should use the id in the containing time-block
// as a key to save the user input in local storage.
// HINT: What does `this` reference in the click listener function?
// How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked?
// QUESTION: How might the id be useful when saving the description
// in local storage?

function loadTasksFromLocalStorage() {
  // Loop through each time-block div
  for (let i = 9; i <= 17; i++) {
    const hourId = `hour-${i}`;
    const timeBlockEl = document.getElementById(hourId);

    if (!timeBlockEl) continue; // If element does not exist, skip

    const textareaEl = timeBlockEl.querySelector('textarea');
    const savedTask = localStorage.getItem(hourId);

    if (savedTask) {
      textareaEl.value = savedTask; // Set textarea value to saved task
    }
  }
}



// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour.
// HINTS: How can the id attribute of each time-block be used
// to conditionally add or remove the past, present, and future classes?
// QUESTION: How can Day.js be used to get the current hour
// in 24-hour time?
function updateTimeBlocks() {
  var currentHour = moment().hours(); // Get the current hour using the Moment.js library
  
// Loop through each time block
  $(".time-block").each(function () {
    var blockHour = parseInt($(this).attr("id").split("-")[1]); // Get the hour from the id attribute of the time block
    
    // Compare the block hour to the current hour and add the appropriate class
    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });
}

updateTimeBlocks(); // Call the function to update the time blocks on page load

// Update the time blocks every hour
setInterval(function () {
  updateTimeBlocks();
}, 60 * 60 * 1000); // Run the function every hour





$(function () {


//Everything needs to go inside this function


});
