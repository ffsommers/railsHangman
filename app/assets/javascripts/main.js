$(document).ready(function(){
	var settings = {
		difficulty: 1,
		rounds: 1
	};
    $("#wordsGuessed").css("display", "none");
 	$("#reset").css("display", "none");
	$("#play").on("click", function(){
    	$("#formContainer").css("display", "none");
    	var gameDifficulty = $("#difficulty option:selected").val();
    	var gameRounds = $("#rounds option:selected").val();
    	settings.difficulty = gameDifficulty;
    	settings.rounds = gameRounds;
     	getWords(settings);
 		startSpeech();
     	// gameInit(words);
 	});
	(function wait() {
    	if (words.length > 0 ) {
       		gameInit(words);
    	} else {
        	setTimeout( wait, 500 );
    	}
	})();

	// $("#start").on("click", function() {
	// 	gameInit(words);
	// })

});
// speech recognition
function startSpeech() {
	var recognition = new webkitSpeechRecognition();
	recognition.onresult = function(event) {
  		console.log(event)
  	}
  recognition.addEventListener('result', e => {
  	const transcript = Array.from(e.results)
  		.map(result => result[0])
  		.map(result => result.transcript)
  		.join("")

  		p.textContent = transcript;
  		if (transcript.includes('letter')){
  			console.log(transcript);
  		}

  });
  recognition.addEventListener('end', recognition.start);
  recognition.start();
}

var words= [];

function getWords(settings) {
	$.ajax({
  	url: 'http://localhost:8080/words',
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
  var guess ;             // Geuss
  var geusses = [ ];      // Stored geusses
  var lives ;             // Lives
  var counter ;           // Count correct geusses
  var space;              // Number of spaces in word '-'

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

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }

  // Show lives
   comments = function () {
   	// all games played show stats
    showLives.innerHTML = "You have " + lives + " incorrect guesses left.";
    if (lives < 1 && words.length === 0) {
      document.body.innerHTML = '';
    }
     if (lives < 1) {
      showLives.innerHTML = "Game Over";
      $("#reset").show();
    }


    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showLives.innerHTML = "You Win!";
      }
    }
  }

      // Animate man
  var animate = function () {
    var drawMe = lives ;
    drawArray[drawMe]();
  }


   // Hangman
  canvas =  function(){

    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = '#ea5b3f';
    context.lineWidth = 4;
  };

    head = function(){
      myStickman = document.getElementById("stickman");
      context = myStickman.getContext('2d');
      context.beginPath();
      context.arc(60, 25, 10, 0, Math.PI*2, true);
      context.stroke();
    }

  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {

    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
}

   frame1 = function() {
     draw (0, 150, 150, 150);
   };

   frame2 = function() {
     draw (10, 0, 10, 600);
   };

   frame3 = function() {
     draw (0, 5, 70, 5);
   };

   frame4 = function() {
     draw (60, 5, 60, 15);
   };

   torso = function() {
     draw (60, 36, 60, 70);
   };

   rightArm = function() {
     draw (60, 46, 100, 50);
   };

   leftArm = function() {
     draw (60, 46, 20, 50);
   };

   rightLeg = function() {
     draw (60, 70, 100, 100);
   };

   leftLeg = function() {
     draw (60, 70, 20, 100);
   };

  drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1];


  // OnClick Function
   check = function () {
    list.onclick = function () {
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        }
      }
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
        $("#wordsGuessed").show();
        $("#wordsGuessed").find("ul").append(this);
      } else {
        comments();

      }
    }
  }


  // Play
   function gameInit(wordArray) {

    word = wordArray.pop();
    buttons();

    geusses = [ ];
    lives = 6;
    counter = 0;
    space = 0;
    result();
    comments();
    canvas();
  }



   // Reset
$('#reset').on("click", function(){
	correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    context.clearRect(0, 0, 400, 400);
    gameInit(words);

});
