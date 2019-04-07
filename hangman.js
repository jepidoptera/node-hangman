// jshint esversion: 6
// get "Word" package from local folder
Word = require("./word-constructor.js");

// get fs, chalk and keypress packages
fs = require("fs");
chalk = require("chalk");
keypress = require('keypress');

// Some other time when I have more time
// var blessed = require('blessed');

// var screen = blessed.screen({
//   smartCSR: true
// });

// // create a hangman object
// var hangman = blessed.box({
//     top: "50%",
//     left: "25%"
// });

//  ,===,
//  O   |
// /|\  |
//  ᴧ   |
// / \  |
//      |
//    ====

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

// read and parse the words file
var possible_words = fs.readFileSync('words.txt', 'utf8').split(", ");
// print(possible_words.join("**"), " ...total: ", possible_words.length);

// keep track of letters guessed, valid guesses, and guesses remaining
var maxGuesses = 9;
var lettersGuessed = '';
var guessesRemaining = maxGuesses;
var validLetters = 'abcdefghijklmnopqrstuvwxyz';

// choose a word to start
var guessWord;
newWord();
function newWord() {
    // construct a Word object from one of those at random
    guessWord = new Word(possible_words[Math.floor(Math.random() * possible_words.length)]);
    // initially show the word
    print ("The mystery word is: ");
    guessWord.display();
    print ("Type a letter to guess!");
    // reset guesses
    lettersGuessed = '';
    guessesRemaining = maxGuesses;
}


function guess (letter) {
    // is this a valid guess?
    if (!validLetters.includes(letter)) return;

    // has it been guessed already?
    if (lettersGuessed.includes(letter)) {
        print ("you've guessed that one already.");
        return;
    }
    lettersGuessed += letter;
    // let them know if they got it right
    if (guessWord.guessLetter(letter)) print (chalk.green(letter), "- good guess!");    
    else {
        print (chalk.red(letter), "- nope! ", chalk.red(guessesRemaining), " guesses remaining.");
        guessesRemaining --;
        if (guessesRemaining <= 0) {
            print (chalk.red("You lose!"));
            print ("The correct answer was: ", guessWord.answer);
        }
    }
    
    // show the word again, with any correct guesses filled in
    guessWord.display();

    if (guessWord.finished) {
        print (chalk.yellow("You guessed the whole word!"));
        print ("starting over - new word.");
        newWord();
    }

}

// shorthand for console.log(arg1, arg2, ...)
function print() {
    console.log([...arguments].join(' '));
}

// node.js get keypress
var stdin = process.stdin;

// without this, we would only get streams once enter is pressed
stdin.setRawMode( true );

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();
// i don't want binary, do you?
stdin.setEncoding( 'utf8' );

// on any data into stdin
stdin.on( 'keypress', function(char, key)
{
    // ctrl-c or escape key
    if ( key.ctrl && key.name == "c" || key.name == "escape") {
        print ("goodbye!");
        process.exit();
    }

    // they have guessed this key
    // print(key);
    guess(key.name);
});