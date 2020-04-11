var Letter = function (character) {
    this.character = character;
    this.isLetterGuessed = false;
    this.display = function () {
        if (this.character == ' ') {
            return (' ');
        }
        else if (this.isLetterGuessed) {
            return (this.character)
        }
        else if (this.character == "'") {
            return ("'")
        }
        else if (this.character == "-") {
            return ("-")
        }
        else if (this.isLetterGuessed === false) {
            return ("_");
        }
    }

    this.letterGuess = function (guess) {
        if (guess.toLowerCase() === this.character.toLowerCase()) {
            this.isLetterGuessed = true;
        }
    }
}

module.exports = Letter;