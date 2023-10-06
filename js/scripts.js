//Business Logic
class PigDice {
  constructor(playerNum) {
    this.playerNum = playerNum;
    this.activePlayer = 0;
    this.scores = {};
    this.turnScore = 0;
  }
  roll() {
    let currentRoll = Math.floor(Math.random() * 6 + 1);
    if (currentRoll === 1) {
      this.endTurn();
    } else {
      this.turnScore += currentRoll;
    }
  }
  hold() {
    let playerScore = this.scores[this.activePlayer]
    this.scores[this.activePlayer] = playerScore ? playerScore + this.turnScore : this.turnScore;
    this.endTurn();
  }
  endTurn() {
    this.turnScore = 0;
    this.activePlayer = this.activePlayer + 1 === this.playerNum ? 0 : this.activePlayer + 1;
  }
}

let pigDice = new PigDice(2);