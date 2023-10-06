# 

#### By **Samantha Callie**

#### 

## Technologies Used

* HTML
* CSS
* BootStrap
* JS

## Description



## Setup/Installation Requirements

* Clone repository
* Navigate to the top level of the directory
* Open index.html in your browser

## Known Bugs

* There are no known bugs at this time

## License

[GNU GPLv3](https://choosealicense.com/licenses/agpl-3.0/)

Copyright (c) 2023 Samantha Callie

## Pseudocode Tests Used During Development

let pigDice = new PigDice();

Describe: roll()

Test: "It should add 2 to the turn score"
Code:
pigDice.roll();
console.log(pigDice.turnScore);
Expected Output: 2;

Describe: hold()

Test: "It should add the turn score to the current player's score"
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

Test: "It should change the active player"
Code:
pigDice.roll();
pigDice.endTurn();
console.log(pigDice.activePlayer);
Expected Output: 1