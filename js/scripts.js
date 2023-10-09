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
      return currentRoll;
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

//UI Logic

function handleTurn(event) {
  let rollResult = document.querySelector("#roll-result");
  if (event.target.value === "roll-button") {
    const roll = pigDice.roll();
    if (roll) {
      rollResult.innerText = roll;
    } else if (!roll) {
      rollResult.innerText = "1 \n Your turn is forfeit!"
    }
  }
  document.querySelector(".active-total").innerText = pigDice.turnScore;
}

window.addEventListener("load", function (){
  document.querySelector("button[value='roll-button']").addEventListener("click", handleTurn)
});