// jshint esversion: 6
function Letter(value) {
    this.value = value;
    this.guessed = (" ,'/-:!?".includes(value));
    this.display = () => {
        return this.guessed ? this.value : "_";
    };
    this.guess = (guess) => {
        // let's not be case-sensitive
        guess = guess.toLowerCase();
        if (this.value === guess) {
            this.guessed = true;
            return true;
        }
        // guessed wrong
        return false;
    };
}

module.exports = Letter;