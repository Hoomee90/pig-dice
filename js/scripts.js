class PigDice {
  constructor() {
    this.activePlayer = 0;
    this.scores = { 0: 0, 1: 0};
    this.turnScore = 0;
  }
  roll() {
    let currentRoll = 2;
    if (currentRoll === 1) {
      this.endTurn();
    } else {
      this.turnScore += currentRoll;
    }
  }
  hold() {
    this.scores[this.activePlayer] += this.turnScore;
    this.endTurn();
  }
  endTurn() {
    this.turnScore = 0;
    this.activePlayer = this.activePlayer ? 0 : 1;
  }
}