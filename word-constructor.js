// jshint esversion: 6
Letter = require('letter-constructor.js');
function Word(word) {
    this.letters = word.split('').map((letter) => {
        // split the word into an array of letter objects
        return new Letter(letter);
    });
    this.guessLetter = (letter) => {
        // try for each letter in the word
        this.letters.foreach((item) => {
            item.guess(letter);
        });
    };
    // join the display values of each letter
    this.display = () => {
        return this.letters.map((letter) => {return letter.display;}).join();
    };
}
module.exports = Word;