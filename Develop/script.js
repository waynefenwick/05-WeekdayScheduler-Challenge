var dayjs = window.dayjs; // define dayjs variable
var headerDateEl = document.querySelector('#currentDay'); // Sets up access to the HTML element
var headerDateJs = dayjs().format('dddd, MMMM DD, YYYY'); // Sets up access to dayjs date formats
headerDateEl.textContent = headerDateJs; // The headerDate element's text content will now display (=) the dayjs date format 



function UserInput() {
  // Loop through each time block
  for (let i = 9; i <= 17; i++) {
    // Get the saved input for this time block
    var userInput = localStorage.getItem(`hour-${i}`);
    // If there is saved input, set the value of the textarea
    if (userInput) {
      var textarea = document.querySelector(`#hour-${i} .description`);
      textarea.value = userInput;
    }
  }
}
// Call the function to load saved inputs on page load
UserInput();



function loadTasksFromLocalStorage() {
  // Loop through each time-block div
  for (let i = 9; i <= 17; i++) {
    var hourId = `hour-${i}`;
    var timeBlockEl = document.getElementById(hourId);

    if (!timeBlockEl) continue; // If element does not exist, skip

    var textareaEl = timeBlockEl.querySelector('textarea');
    var savedTask = localStorage.getItem(hourId);

    if (savedTask) {
      textareaEl.value = savedTask; // Set textarea value to saved task
    }
  }
}


function updateTimeBlocks() {
  var currentHour = dayjs().hour(); // Get the current hour using the day.js library
  // Loop through each time block
  $(".time-block").each(function () { //for each time block, let the following function take place
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



function saveTasktoLocalStorage(hourId) {
  var textareaEl = document.getElementById(hourId).querySelector('textarea');
  var task = textareaEl.value;
  localStorage.setItem(hourId, task);
}
// Add event listeners to each textarea element to save the user input when it changes
for (let i = 9; i <= 17; i++) {
  let hourId = `hour-${i}`;
  // grabbing the button element
  var buttonEl = document.getElementById(hourId).querySelector('button');
  console.log(buttonEl);
  // add event lisnter for a 'click' event
  buttonEl.addEventListener('click', function () {
    saveTasktoLocalStorage(hourId);
  });
}



// Update the time blocks every hour
setInterval(function () {
  updateTimeBlocks();
}, 60 * 60 * 1000); // Run the function every hour
