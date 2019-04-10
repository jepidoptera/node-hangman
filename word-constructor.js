// jshint esversion: 6
Letter = require('./letter-constructor.js');
// I wasn't supposed to require anything else in here, but it's much neater
// this way than parsing the output in 'index'
chalk = require("chalk");

class Word {
    constructor(word) {
        this.letters = word.split('').map((letter) => {
            // split the word into an array of letter objects
            return new Letter(letter);
        });
        this.answer = word;
        this.lastGuess = "";
        // console.log(this.letters.map((letter) => { return letter.guessed; }));
        this.unGuessed = this.letters
            .map((letter) => { return !letter.guessed; })
            .reduce((sum, value) => { return sum + (value ? 1 : 0); });
        // console.log(this.unGuessed);
    }
    display() {
        if (!this.finished) {
            // parse the letters into consecutive arguments
            // with those just guessed in green!
            console.log(...this.letters
                .map((letter) => { 
                    return (letter.value != this.lastGuess)
                        ? letter.display()
                        : chalk.green(letter.display()); 
                }));
        }
        else {
            // whole thing in blue
            console.log(chalk.blue.bgWhite.bold(this.letters
                .map((letter) => { 
                    return letter.value; 
                }).join(' ')));
        }
    }

    guessLetter(letter) {
        var guessedRight = false;
        this.lastGuess = letter;
        // try for each letter in the word
        this.letters.forEach((item) => {
            // does it match? if so, we'll return true
            if (item.guess(letter)) {
                guessedRight = true;
                this.unGuessed --;
            }
        });
        // console.log(this.unGuessed);
        // return result (true / false)
        return guessedRight;
    }

    get finished() {
        // return true only if all the letters are guessed
        return this.unGuessed == 0;
    }
}
module.exports = Word;