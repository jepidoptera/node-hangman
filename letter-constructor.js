// jshint esversion: 6
function Letter(value) {
    this.value = value;
    this.guessed = false;
    this.display = () => {
        return this.guessed ? this.value : "_";
    };
    this.guess = (guess) => {
        if (this.value === guess) {
            this.guessed = true;
            return true;
        }
        // guessed wrong
        return false;
    };
}

module.exports = Letter;