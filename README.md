# Pig Dice

#### By **Samantha Callie**

#### Play a classic dice game with any number of players

### [See it here](https://hoomee90.github.io/pig-dice/)

## Technologies Used

* HTML
* CSS
* BootStrap
* JS

## Description

This site allows users to play Pig Dice. They can enter a number of players, then take turns choosing to roll or hold, winning when they get to 100 points. For the complete rules, see [this Wikipedia page](https://en.wikipedia.org/wiki/Pig_%28dice_game%29)

## Setup/Installation Requirements

* Clone repository
* Navigate to the top level of the directory
* Open index.html in your browser

## Known Bugs

* Inputting a large number of players may result in slowdowns or crashes

## License

[GNU GPLv3](https://choosealicense.com/licenses/agpl-3.0/)

Copyright (c) 2023 Samantha Callie

## Pseudocode Tests Used During Development

let pigDice = new PigDice(2);

Describe: roll()

Test: "It should add 2 to the turn score"
Code:
pigDice.roll();
console.log(pigDice.turnScore);
Expected Output: 2

Test: "It should add a random number between 1 - 6 to the turn score"
Code:
pigDice.roll();
console.log(pigDice.turnScore);
Expected Output: 5

Test: "It should end the turn if it rolls a 1"
Code:
pigDice.roll();
console.log(pigDice.activePlayer);
Expected Output: 1

Describe: hold()

Test: "It should add the turn score to the current player's score"
Code:
pigDice.roll();
pigDice.hold();
console.log(pigDice.scores[0]);
Expected Output: 2

Test: "If the current player doesn't have a score, it should create one with a value of the turn score"
Code:
pigDice.roll();
pigDice.hold();
console.log(pigDice.scores[0]);
Expected Output: 2

Test: "It should also end the turn"
Code:
pigDice.roll();
pigDice.hold();
console.log(pigDice.turnScore);
Expected Output: 0

Describe: endTurn()

Test: "It should reset the turn score"
Code:
pigDice.roll();
pigDice.endTurn();
console.log(pigDice.turnScore);
Expected Output: 0

Test: "It should add one to the active player value"
Code:
pigDice.endTurn();
console.log(pigDice.activePlayer);
Expected Output: 1

Test: "If everybody has gone it should instead return to the first player"
Code:
pigDice.endTurn();
pigDice.endTurn();
console.log(pigDice.activePlayer);
Expected Output: 0

Describe: reset()

Test: "It should return a new pigDice object"
Code:
pigDice.reset()
Expected Output: PigDice {playerNum: undefined, ...}

Test: "It should return a new pigDice object with the same player number"
Code:
pigDice.reset()
Expected Output: PigDice {playerNum: 2, ...}