$(document).ready(function(){
	var settings = {
		difficulty: 1,
	};

	$("#spotify-toggle").on("click", function(){

	      $("#spotify").slideDown(350);
	      $("#spotify-toggle").hide()
	   });

	$(document).on("keyup",handleKeyUp);  //for user input via keyboard

  $("#wordsGuessed").css("display", "none");
 	$("#reset").css("display", "none");

	$("#play").on("click", function(){
    	$("#formContainer").css("display", "none");
    	var gameDifficulty = $("#difficulty option:selected").val();
    	// var gameRounds = $("#rounds option:selected").val();
    	settings.difficulty = gameDifficulty;
    	// settings.rounds = gameRounds;
     	getWords(settings);
 			startSpeech();
 	});
	(function wait() {
    	if (words.length > 0 ) {
       		gameInit(words);
					clearTimeout(waitForWords);
    	} else {
        var waitForWords =	setTimeout( wait, 500 );
    	}
	})();
});
// speech recognition
function startSpeech() {
	var recognition = new webkitSpeechRecognition();
	recognition.onresult = function(event) {
  		console.log(event)
  	}
  recognition.addEventListener('result', e => {
		console.log("transcript being formed");
		const transcript = Array.from(e.results)
  		.map(result => result[0])
  		.map(result => result.transcript)
  		.join("")

  		if (transcript.includes('letter')){
				var letter = transcript.slice(-1)
				checkBySpeech(letter)
  		}
			// prints everything thats said to console.
		 console.log(transcript);
  });
  recognition.addEventListener('end', recognition.start);
  recognition.start();
}

// function for using keyboard as input
function handleKeyUp(event) {
	if(event.keyCode>64 && event.keyCode<91){
		var guess=String.fromCharCode(event.keyCode).toLowerCase();

 		for (var i = 0; i < word.length; i++) {
 			if (word[i] === guess) {
 				guesses[i].innerHTML = guess;
 				counter += 1;
 			}
 		}
 		var j = (word.indexOf(guess));
 		if (j === -1) {
 			lives -= 1;
 			comments();
			spriteCount+=1;
			numWrongGuesses += 1;
 			animate();
 			$("#wordsGuessed").show();
 			$("#wordsGuessed").find("ul").append("<li id='letter' class='active'>"+ guess +"</li>");
 		} else {
 			comments();
 			}
	}
}//handlekeyup

var words= [];

function getWords(settings) {
	$.ajax({
  	url: 'https://hangman-words.herokuapp.com/words',
  	method: 'post',
  	data: settings
	})
		.done(function(res) {
			console.log(res);
  			for(var i=0; i<res.length; i++){
  				words.push(res[i]);
  			}

	})
}



// _______________________________________


  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];


  var word ;              // Selected word
  var guess ;             // Guess
  var guesses = [ ];      // Stored guesses
  var lives ;             // Lives
  var counter ;           // Count correct guesses
  var space;              // Number of spaces in word '-'
  var spriteCount = 0;
	var wins = 0;
	var numWrongGuesses = 0;

  // Get elements
  var showLives = document.getElementById("mylives");


  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
			list.class = 'hvr-push';
			list.setAttribute("class", "hvr-push");
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }

  // Create geusses ul
   result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }
      guesses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }

	function gameOver(){
		$("#statsModal").find("#your-score").append( wins + " games");
		$("#statsModal").find("#incorrect").append( numWrongGuesses + " incorrect letter guesses.");
		$("#statsModal").modal('show')
		$("#reset").show();
	}

  // Show lives
   comments = function () {
   	// all games played show stats
		var showLives = document.getElementById("mylives");
    showLives.innerHTML = "You have " + lives + " incorrect guesses left.";
    if (lives < 1) {
			showLives.innerHTML = "Game Over";
			$(".tumbleweed").css("animation-play-state", "running");
			sendResults();
    }
		else {
    	for (var i = 0; i < guesses.length; i++) {
      	if (counter + space === guesses.length) {
        	showLives.innerHTML = "You Win!";
					wins += 1;

					fireworks() // plays fireworks animation
					$("#score").show();
					$("#score").find("ul").append("<li><img class='star' src='/assets/Gold-Star.png'></li>").addClass('animated zoomIn');
					guesses = [ ]; //reset game global variables for guesses.
					lives = 6;		 //reset game global variables for lives.
					counter = 0;	 //reset game global variables for counter.
					space = 0;
					spriteCount = 0;     //reset game global variables for spaces.
					nextGameDelay() // setTimeout(nextGame,10000); //waits 10 seconds before starting next game
				}
    	}
		}
  }

	function nextGameDelay() {
		setTimeout(nextGame, 10000);
	}

	function nextGame(){
		if (words.length > 0) {
			clearBoard();
			continueGame(words.pop());
		}
	}

	function clearBoard(){
		$("#score").find("ul").removeClass('animated zoomIn');
		$("#buttons").html(" ");      //clears buttons div for next game
		$("#hold").html(" "); 	      //clears hold div for next game
		$("#myLives").html(" ");      //clears myLives div for next game
		$("#stickman").html(" ");     //clears hangman drawing for next game
		$("#wordsGuessed").hide();
		$("#wordsGuessed").find("ul").html(" "); //clears letters guessed div for next game
		$(".launcher").remove();      //stops fireworks animation for next game
	}

  // hangman animation
	var animate = function () {
		var pos=(spriteCount*-75) +"px"
			$('#hangman').css("left",pos);
  }

  // OnClick Function
   check = function () {
    list.onclick = function () {
      var guess = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === guess) {
          guesses[i].innerHTML = guess;
          counter += 1;
        }
      }
      var j = (word.indexOf(guess));
      if (j === -1) {
        lives -= 1;
        comments();
				spriteCount += 1;
        animate();
				numWrongGuesses += 1;
        $("#wordsGuessed").show();
        $("#wordsGuessed").find("ul").append(this);
      } else {
        comments();
      }
    }
  }
  function sendResults(){
		scores = {
			top_score: wins
		}
		$.ajax({
	  	url: '/scores',
	  	method: 'post',
	  	data: scores
		})
			.done(function(){
				gameOver();
			})
	}
	checkBySpeech = function (input) {
 		var guess = (input);
 		for (var i = 0; i < word.length; i++) {
 			if (word[i] === guess) {
 				guesses[i].innerHTML = guess;
 				counter += 1;
 			}
 		}
 		var j = (word.indexOf(guess));
 		if (j === -1) {
 			lives -= 1;
 			comments();
			spriteCount+=1;
			numWrongGuesses += 1;
 			animate();
 			$("#wordsGuessed").show();
 			$("#wordsGuessed").find("ul").append("<li id='letter' class='active'>"+ guess +"</li>");
 		} else {
 			comments();
 		}
 }

  // start game
   function gameInit(wordArray) {
	 	$("#stickman").append('<div id="imgHolder"><img id="hangman" src="/assets/man.png"></div>')
    word = wordArray.pop();
		console.log("THE WORD IS "+word);
    buttons();
    guesses = [ ];
    lives = 6;
    counter = 0;
    space = 0;
    result();
    comments();
   }

	 function continueGame(inputWord) {
	 	$("#stickman").append('<div id="imgHolder"><img id="hangman" src="/assets/man.png"></div>')
    word = inputWord;
		console.log("INITIALIZED FROM continue GAME THE WORD IS "+word);
    buttons();
    result();
    comments();
   }



// Reset game
$('#reset').on("click", function(){
	// CODE FOR BACK TO SETTINGS PAGE

});

 //firework animations for gameover
function fireworks() {
  var num_launchers = 6;
  var num_flares = 10;
  var flare_colours = ['red', 'aqua', 'violet', 'yellow', 'lightgreen', 'white', 'blue'];
  var cssIdx = document.styleSheets.length - 1;

  function myRandom(from, to)
  {
    return from + Math.floor(Math.random() * (to-from));
  }

  var keyframes_template = "from { left: LEFTFROM%; top: 380px; width: 6px; height: 12px; }\n"
      + "33% { left: LEFTTOP%; top: TOPTOPpx; width: 0; height: 0; }\n"
      + " to { left: LEFTEND%; top: BOTBOTpx; width: 0; height: 0; }";

  for(var i=0; i < num_launchers; i++) {
    leftfrom = myRandom(15, 85);
    lefttop = myRandom(30, 70);
    toptop = myRandom(20, 200);
    leftend = lefttop + (lefttop-leftfrom)/2;
    botbot = toptop + 100;

    csscode = keyframes_template;
    csscode = csscode.replace(/LEFTFROM/, leftfrom);
    csscode = csscode.replace(/LEFTTOP/, lefttop);
    csscode = csscode.replace(/TOPTOP/, toptop);
    csscode = csscode.replace(/LEFTEND/, leftend);
    csscode = csscode.replace(/BOTBOT/, botbot);

    try { // WebKit browsers
      csscode2 = "@-webkit-keyframes flight_" + i + " {\n" + csscode + "\n}";
      document.styleSheets[cssIdx].insertRule(csscode2, 0);
    } catch(e) { }

    try { // Mozilla browsers
      csscode2 = "@-moz-keyframes flight_" + i + " {\n" + csscode + "\n}";
      document.styleSheets[cssIdx].insertRule(csscode2, 0);
    } catch(e) { }
  }

  for(var i=0; i < num_launchers; i++) {
    var rand = myRandom(0, flare_colours.length - 1);
    var rand_colour = flare_colours[rand];
    var launch_delay = myRandom(0,100) / 10;

    csscode = ".launcher:nth-child(" + num_launchers + "n+" + i + ") {\n"
      + "  -webkit-animation-name: flight_" + i + ";\n"
      + "  -webkit-animation-delay: " + launch_delay + "s;\n"
      + "  -moz-animation-name: flight_" + i + ";\n"
      + "  -moz-animation-delay: " + launch_delay + "s;\n"
      + "}";
    document.styleSheets[cssIdx].insertRule(csscode, 0);

    csscode = ".launcher:nth-child(" + num_launchers + "n+" + i + ") div {"
      + "  border-color: " + rand_colour + ";\n"
      + "  -webkit-animation-delay: " + launch_delay + "s;\n"
      + "  -moz-animation-delay: " + launch_delay + "s;\n"
      + "}";
    document.styleSheets[cssIdx].insertRule(csscode, 0);
  }

  for(var i=0; i < num_flares; i++) {
    csscode = ".launcher div:nth-child(" + num_flares + "n+" + i + ") {\n"
	+ "  -webkit-transform: rotate(" + (i * 360/num_flares) + "deg);\n"
	+ "  -moz-transform: rotate(" + (i * 360/num_flares) + "deg);\n"
	+ "}";
    document.styleSheets[cssIdx].insertRule(csscode, 0);
  }

  for(var i=0; i < num_launchers; i++) {
    var newdiv = document.createElement("div");
    newdiv.className = "launcher";
    for(var j=0; j < num_flares; j++) {
      newdiv.appendChild(document.createElement("div"));
    }
    document.getElementById("footer-bg").appendChild(newdiv);
  }
}
