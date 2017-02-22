![Alt text](app/assets/images/logo2.png?raw=true)
# HANGMAN 
  This is a simple rails based hangman game built on rails. words are fetched from the linkedin words api via an externally hosted web server I built. [here](https://github.com/ffsommers/hangman_server/blob/master/server.js)
### features ###
   * game can be played with mouse, keyboard, or by speech.
   * uses the oxford dictionary api to verify that a word is a legitamate. 
   * uses text to speech to give the user a clue based on the definition for a word provided by the oxford dictionary api.
   * uses a postgres database to persist user game stats and generate a leaderboard.   
## prereqs 
  * rails 5 installed on your system. 
  * if you do not want to run the application locally you can play hang-man hosted online [here](https://hang-in.herokuapp.com/)

## Installation and Setup
  1. clone this repositiory. 
  2. navigate to the root directory of the app.
  3. run the command bundle install.
  4. run the command rake db:create. 
  5. run the command rake db:migrate. 
  6. run rails s 
  7. open browser and play game at http://localhost:8080 
  *NOTE: you do not have to clone and run the words server because this app is already set up with the request for new  words pointing to the express server [here](https://github.com/ffsommers/hangman_server/blob/master/server.js) that I hosted on Heroku. 
## game play
 * to play the game follow these steps:
  1. on the main page you will be prompted to register an account. enter your credentials and you will be directed to the main page of the game. 
  2. once on the main game page you can select a difficulty level (easy, medium, or hardcore!) this will customize the headers for the words api to grab words that are filtered by difficulty. 
  3. once you click the play button the game will begin. 
  4. you will prompted with an audible clue of the current word's definition.
  5. you can begin making guesses by clicking on the letter icons, pressing the desired letter on the keyboard, or alternatively you can say "LETTER" followed by the letter you would like to guess. i.e (" LETTER A "). when using speech, take care to pronounce your phrase clearly or the speech engine may falsely interpret your input. 
  6. You are allowed 6 incorrect letter guesses before losing the game. 
  7. when you correctly guess a word you will see a fireworks animation and then be prompted with the next word. 
  8. You continue to guess words until you lose. When you lose your score will be recorded 1 point for each correctly guessed word. if your current game play score is the best score youve got the score will be added to your profile. you can check if your score made the leader board by clicking the "leader board link in the stats modal that is displayed on your screen.
  9. once on the leader board screen you can play another game by clicking the back to games link in the top right corner of your screen, or you can log out. 
  
