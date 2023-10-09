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

function generateScores() {
  let scoreList = document.createElement("ul");
  scoreList.id = "score-list";
  for (let i = 0; i < pigDice.playerNum; i++) {
    let li = document.createElement("li");
    li.id = "score-" + i;
    li.innerText = "Player " + parseInt(i + 1) + "'s score is 0"
    scoreList.append(li);
  }
  document.querySelector(".score-record").after(scoreList);
}

function handleChoice(event) {
  let ActionResult = document.querySelector(".action-result");
  document.querySelector(".clicking-player").innerText = pigDice.activePlayer + 1;
  
  if (event.target.value === "roll-button") {
    const roll = pigDice.roll();
    ActionResult.parentElement.removeAttribute("hidden");
    if (roll) {
      ActionResult.innerText = "rolled a " + roll;
    } else if (!roll) {
      ActionResult.innerText = "rolled a 1 \n Their turn is forfeit!"
    }
  } else if (event.target.value === "hold-button") {
    ActionResult.innerText = "chose to hold"
    pigDice.hold();
  }
  updateScores();
  document.querySelector(".active-player").innerText = pigDice.activePlayer + 1;
  document.querySelector(".active-total").innerText = pigDice.turnScore;
}

window.addEventListener("load", function (){
  generateScores();
  document.querySelectorAll("button").forEach(el => el.addEventListener("click", handleChoice));
});