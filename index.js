var inquirer = require("inquirer");

var Word = require("./Word.js");
var figlet = require('figlet');
var chalk = require('chalk');

var guesses = 10;
var points = 0;

var wordsToGuess = ["Ironman", "Thor", "Captain America", "Spiderman", "Black Pather", "Avengers", "Hulk", "Captain Marvel", "Ant-man", "Doctor Strange", "Guardians of the Galaxy"];
var randomWord;
var chosenWord;

function startGame() {
    console.log(chalk.blue("It's time to guess the 'MCU' superhero!"));
}

function chooseRandomWord() {
    randomWord = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)]
    chosenWord = new Word(randomWord);
}

function guessWord() {
    if (guesses > 0 && points < 5) {
        console.log(chosenWord.display());
        inquirer.prompt([
            {
                name: "txt",
                message: "Guess a letter!",
                validate: function (str) {
                    if (str.length != 1) return false;
                    var regEx = new RegExp("^[a-zA-Z\s]{1,1}$");
                    return regEx.test(str);
                }
            }
        ]).then(function (guessedLetter) {
            var guess = guessedLetter.txt;
            chosenWord.checkGuess(guess);
            if (randomWord.toLowerCase().indexOf(guess.toLowerCase()) === -1) {
                guesses--;
                console.log(chalk.red("INCORRECT! " + guesses + " guesses remaining"))
            }
            else {
                if (points < 5) {
                    console.log(chalk.green("CORRECT!"))
                }
            }
            if (randomWord === chosenWord.display()) {
                console.log(chosenWord.display());
                guesses = 10;
                points++;
                if (points < 5) {
                    console.log(chalk.green("CORRECT! Next MCU Superhero!"));
                    chooseRandomWord();
                }
                else {
                    winGame();
                }
            }
            if (guesses === 0) {
                loseGame();
            }
            guessWord();
        });
    }
}

function loseGame() {
    console.log(chalk.red("GAME OVER!"));
    inquirer.prompt([
        {
            name: "confirm",
            type: "confirm",
            message: "Play again?",
            default: true
        }
    ])
        .then(function (inquirerResponse) {
            if (inquirerResponse.confirm) {
                guesses = 10;
                points = 0;
                chooseRandomWord();
                guessWord();
            }
            else {
                console.log(chalk.blue("YOU'RE STRONG, BUT I COULD SNAP MY FINGERS AND YOU'D ALL CEASE TO EXIST."));
                process.exit();
            }
        })
}

function winGame() {

    figlet('YOU WIN!', function (err, data) {
        if (err) {
            console.log('Houston We Have A Problem');
            console.dir(err);
            return;
        }
        console.log(data)
    })

    inquirer.prompt([
        {
            name: "confirm",
            type: "confirm",
            message: "Play again?",
            default: true
        }
    ])
        .then(function (inquirerResponse) {
            if (inquirerResponse.confirm) {
                guesses = 10;
                points = 0;
                chooseRandomWord();
                guessWord();
            }
            else {
                console.log(chalk.blue("Avengers! Assemble!"))
                process.exit();
            }
        })

}

startGame();
chooseRandomWord();
guessWord();