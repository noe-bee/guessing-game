// DOM elements needed
var wordBlanks = document.querySelector(".word-blanks");
// TODO: Grab the HTML element that holds the blanks (it is the div with class 'word-blanks')
var wins = document.querySelector(".win");
// TODO: Grab the HTML element that holds the wins counter (it is the span with class 'win')
var losses = document.querySelector(".lose");
// TODO: Grab the HTML element that holds the losses counter (it is the span with class 'lose')
var timerElement = document.querySelector(".timer-count");
// TODO: Grab the HTML element that holds the time left (it is the div with class 'timer-count')
// TODO: Grab the Start button
var startButton = document.querySelector(".start-button");

// Global variables
var timeLeft; //resetting this inside the startGame function
var timer;
var wordFound = false;
var randomWord = "";
var numBlanks = 0;
var numWins = 0;
var numLosses = 0;

//arrays
var words = ["variable","array","modulus","object","function","string","boolean"];
var lettersInRandomWord = [];
var numBlankLetters = [];

// The startGame function is called when the start button is clicked
function startGame() {
	timeLeft = 20; //resetting time left
	wordFound = false;
	startButton.disabled = true; //disables click button and restart of timer
	//invoke functions needed
	renderBlanks();
	setTimer();
}

// The winGame function is called when the user has found the hidden word
function winGame() {
	// TODO: Let the user know they won
	wordBlanks.textContent = "CONGRATS! YOU WIN!"
	numWins++
	startButton.disabled = false; //at this point, you can click startButton again
	storedWins();
}

// The loseGame function is called when timer reaches 0
function loseGame() {
	wordBlanks.textContent = "SORRY! YOU LOSE ):" //shows user they lost
	numLosses++ //updates wins
	startButton.disabled = false; //at this point, user can click startButton again
	storedLosses(); //updates losses on screen
}

// TODO: Attach an event listener to the start button to call the 'startGame' function on click
startButton.addEventListener('click', startGame)

// Function to control the timer
function setTimer() {
	// TODO: Set the timer using setInterval(). Every second, decrement the time left by 1 and check if you need to stop the timer either because the user has found the hidden word or because there is no time left.
	timer = setInterval(function() {
		// console.log('timeLeft:', timeLeft);
	timeLeft--;
	timerElement.textContent = timeLeft; //updates what is shown in timerElement on screen
	if (timeLeft >= 0) {
		//if timer is still going, you win
		if (wordFound && timeLeft > 0) {
			clearInterval(timer); //this is to stop timer
			winGame();
			}
		}
		//if timer is at 0, you lose
		if (timeLeft === 0) {
			clearInterval(timer); //this is to stop timer
			loseGame();
		}
	}, 1000); //takes two arguments?? the function?
}

// Function to display blanks ('_') on screen
function renderBlanks() {
	// TODO: Randomly pick a word from the 'words' array - this will be the hidden word the user must guess
	randomWord = words[Math.floor(Math.random() * words.length)];
	// TODO: Create a string with each blank ('_') separated by a space. The number of blanks must match the number of letters in the hidden word. For example, if the hidden word is 'modulus', then the string of blanks should be '_ _ _ _ _ _ _'
	// console.log(randomWord);
	lettersInRandomWord = randomWord.split(""); //split() takes a string and splits it into an array of substrings
	// console.log(lettersInRandomWord)
	numBlanks = lettersInRandomWord.length; // storing the nuber of letters of random work into numBlanks
	console.log(numBlanks)
	numBlankLetters = []

	for (var i = 0; i < numBlanks; i++) {
		numBlankLetters.push('_'); //push adds new items to end end of the array; pushing # of blanks "_" into the array
		// console.log(numBlankLetters)
	}
	// TODO: Display the blanks on the page (it should be the text content of the div with class 'word-blanks')
	wordBlanks.textContent = numBlankLetters.join(" ") //.join() creates and returns a new string by concatting all of the elements in the array
	// console.log(wordBlanks);
}

// The checkLetters function tests if the guessed letter is in the hidden word and renders it to the screen.
function checkLetters(letter) {
	// TODO: Loop over each letter of the hidden word and update the blanks if the letter guessed is in the hidden word
	for (var i = 0; i < numBlanks; i++) {
		if (randomWord[i] === letter){  //if each index in the string randomWord is equal to a letter, then...
			numBlankLetters[i] = letter; //add the letter to the array??
		}

	wordBlanks.textContent = numBlankLetters.join(" ")
	}
}

// Attach event listener to document to listen for key event
document.addEventListener('keydown', function (event) {
	// TODO: Check the time left - if time is up, exit the function
	if (timeLeft === 0) {
		return; //stops timer 
	}
	// TODO: Collect the key pressed. If it is a letter, then: (1) pass it to the 'checkLetters' function to verify if it's a correct guess, then (2) check if the user has found the hidden word
	var anyKey = event.key.toLowerCase(); 
	var alphabetCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split(""); //split into substrings

	if (alphabetCharacters.includes(anyKey)){
		var guessedLetter = event.key; 
		checkLetters(guessedLetter); //checkLetters is a function with the paramters of a letter; so it is checking for a letter
		checkWin();
	}
});

// Function to retrieve the number of wins stored in local storage. This function is used in the init function.
function getWins() {
	// TODO: Get stored value from local storage and display it on the page. If there was nothing retrieved from local storage then set the number of wins to 0
	var winsInStorage = localStorage.getItem('winCount:') //how are we gonna call the wins in local storage? key is winCount and value is the number
	// console.log('numWins:', numWins)
	// wins.textContent = numWins; //to update the win count on screen; i think we have this already in another function ..

	if (winsInStorage === null) {
		numWins = 0;
	} else {
		numWins = winsInStorage;
	}
	wins.textContent = numWins; //show wins to page
}

// Function to retrieve the number of losses stored in local storage. This function is used in the init function.
function getLosses() {
	// TODO: Get stored value from local storage and display it on the page. If there was nothing retrieved from local storage then set the number of losses to 0
	var lossesInStorage = localStorage.getItem('lossCount: ') //how are we gonna call the losses in local storage? key is lossCount and value is the number
	// console.log('numWins:', numWins)

	if (lossesInStorage === null) {
		numLosses = 0;
	} else {
		numLosses = lossesInStorage;
	}
	losses.textContent = numLosses; //shows losses on page
}

function checkWin() {
	// If the word equals the blankLetters array when converted to string, set isWin to true
	if (randomWord === numBlankLetters.join("")) {
	  // This value is used in the timer function to test if win condition is met
	  wordFound = true;
	}
  }

//this function is for wins to be stored in local storage
function storedWins() {
	wins.textContent = numWins;
	localStorage.setItem("winCount: ", numWins);
}
//this function is for losses to be stored in local storage
function storedLosses() {
	losses.textContent = numLosses;
	localStorage.getItem("lossCount: ", numLosses);
}

// The init function is called when the page loads
function init() {
	getWins();
	getLosses();
}
// Call init() so that it fires when page loads
init();

// TODO - Bonus: Add a reset button
var resetButton = document.querySelector(".reset-button"); //selecting the .reset-button

function resetGame() {
// Resets win and loss counts
  numWins = 0;
  numLosses = 0;
// Renders win and loss counts and sets them into client storage
  storedWins()
  storedLosses()
}
// Attaches event listener to button
resetButton.addEventListener("click", resetGame); //when clicked, will reset game