// Todo List
// Wait for the DOM to fully load before running the JavaScript code
document.addEventListener("DOMContentLoaded", () => {
    // Get references to the HTML elements we'll work with
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Add an event listener to the "Add Task" button
    addTaskButton.addEventListener("click", () => {
        // Get the task text from the input field and trim any extra whitespace
        const taskText = taskInput.value.trim();

        // Check if the task text is not empty
        if (taskText !== "") {
            // Create a new <li> element for the task
            const taskItem = document.createElement("li");
            // Populate the <li> element with HTML content
            taskItem.innerHTML = `
                <input type="checkbox" class="task-checkbox">
                <span class="task-text">${taskText}</span>
                <button class="delete-task">Delete</button>
            `;
            // Add the new task to the task list
            taskList.appendChild(taskItem);
            // Clear the input field
            taskInput.value = "";
            // Attach event listeners to the new task
            attachTaskEvents(taskItem);
        }
    });

    // Function to attach event listeners to a task item
    function attachTaskEvents(taskItem) {
        const deleteButton = taskItem.querySelector(".delete-task");
        const checkbox = taskItem.querySelector(".task-checkbox");

        // Add a click event listener to the "Delete" button
        deleteButton.addEventListener("click", deleteTask);
        // Add a change event listener to the checkbox
        checkbox.addEventListener("change", completeTask);
    }

    // Function to delete a task
    function deleteTask() {
        // Remove the parent <li> element of the clicked "Delete" button
        this.parentNode.remove();
    }

    // Function to mark a task as complete
    function completeTask() {
        const taskText = this.nextElementSibling;

        // Check if the checkbox is checked
        if (this.checked) {
            // Apply a line-through style and gray color to the task text
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "#999";
        } else {
            // Remove the line-through style and reset the color
            taskText.style.textDecoration = "none";
            taskText.style.color = "#000";
        }
    }
});

// Function to start the countdown timer
function startTimer() {
    const durationInput = document.getElementById("duration");
    const display = document.getElementById("display");
    const duration = parseInt(durationInput.value);

    if (duration > 0) {
        let timer = duration;

        const interval = setInterval(function () {
            display.textContent = timer;
            timer--;

            if (timer < 0) {
                clearInterval(interval);
                display.textContent = "Time's up!";
                alert("Time's up!"); // Display an alert when the timer is up
            }
        }, 1000);
    }
}

// Function to open a specific tab and hide others
function openTab(tabId) {
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }
    document.getElementById(tabId).style.display = "block";
}

// ANIMATION

const box = document.getElementById('animatedBox');
let isAnimating = false;

function moveBox(timestamp) {
    if (!isAnimating) {
        return;
    }

    const boxPosition = parseInt(getComputedStyle(box).left, 10);
    const animationSpeed = 200; // pixels per second
    const distance = (timestamp / 1000) * animationSpeed;

    if (boxPosition + distance < window.innerWidth - 100) {
        box.style.left = boxPosition + distance + 'px';
        requestAnimationFrame(moveBox);
    } else {
        isAnimating = false;
        box.style.left = '0';
    }
}

box.addEventListener('click', () => {
    if (!isAnimating) {
        isAnimating = true;
        box.style.animation = 'none';
        requestAnimationFrame(moveBox);
    }
});

/*
$(document).ready(function() {
    // Show/Hide Password
    $('#showPassword').click(function() {
        var passwordField = $('#password');
        var passwordFieldType = passwordField.attr('type');

        if (passwordFieldType === 'password') {
            passwordField.attr('type', 'text');
            $(this).text('Hide Password');
        } else {
            passwordField.attr('type', 'password');
            $(this).text('Show Password');
        }
    });

    // Enable/disable Register button based on input and checkbox
    $('#username, #password, #confirmPassword, #agreeTerms').on('input change', function() {
        var username = $('#username').val();
        var password = $('#password').val();
        var confirmPassword = $('#confirmPassword').val();
        var registerButton = $('#registerButton');

        var usernameError = $('#usernameError');
        var passwordError = $('#passwordError');
        var confirmPasswordError = $('#confirmPasswordError');
        var registrationMessage = $('#registrationMessage');

        // Reset error messages
        usernameError.text('');
        passwordError.text('');
        confirmPasswordError.text('');
        registrationMessage.text('');

        // Validate username
        if (username === '') {
            usernameError.text('Username is required');
        }

        // Validate password
        if (password === '') {
            passwordError.text('Password is required');
        }

        // Validate confirm password
        if (confirmPassword === '') {
            confirmPasswordError.text('Confirm Password is required');
        } else if (password !== confirmPassword) {
            confirmPasswordError.text('Passwords do not match');
        }

        // Check if all fields are valid and the checkbox is checked
        if (usernameError.text() === '' && passwordError.text() === '' && confirmPasswordError.text() === '' && $('#agreeTerms').is(':checked')) {
            registerButton.prop('disabled', false);
        } else {
            registerButton.prop('disabled', true);
        }
    });
});

*/

// Sound
 
document.addEventListener("DOMContentLoaded", function() {
    const audio = document.getElementById("myAudio");
    const playButton = document.getElementById("playButton");
    let isPlaying = false;

    playButton.addEventListener("click", function() {
        if (isPlaying) {
            audio.pause();
            playButton.innerHTML = "Play Sound";
            isPlaying = false;
        } else {
            audio.play()
                .then(() => {
                    playButton.innerHTML = "Pause Sound";
                    isPlaying = true;
                })
                .catch(error => {
                    console.error("Error playing audio: " + error);
                });
        }
    });
});



// Game

$(document).ready( function() {
    //initialize the quiz options
    var answersLeft = [];
    $('.quiz-wrapper').find('li.option').each( function(i) {
      var $this = $(this);
      var answerValue = $this.data('target');
      var $target = $('.answers .target[data-accept="'+answerValue+'"]');
      var labelText = $this.html();
      $this.draggable( {
        revert: "invalid",
        containment: ".quiz-wrapper"
      });
     
      if ( $target.length > 0 ) {
      $target.droppable( {
          accept: 'li.option[data-target="'+answerValue+'"]',
          drop: function( event, ui ) {
            $this.draggable('destroy');
            $target.droppable('destroy');
            $this.html('&nbsp;');
            $target.html(labelText);
            answersLeft.splice( answersLeft.indexOf( answerValue ), 1 );
          }
      });
      answersLeft.push(answerValue);
      } else { }
     });
     $('.quiz-wrapper button[type="submit"]').click( function() {
         if ( answersLeft.length > 0 ) {
              $('.lightbox-bg').show();
        $('.status.deny').show();
        $('.lightbox-bg').click( function() {
                $('.lightbox-bg').hide();
          $('.status.deny').hide();
          $('.lightbox-bg').unbind('click');
        });
         } else {
              $('.lightbox-bg').show();
        $('.status.confirm').show();
         }
     });
  });