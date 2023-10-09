//Business Logic
class PigDice {
  constructor(playerNum) {
    this.playerNum = playerNum;
    this.activePlayer = 0;
    this.previousPlayer;
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
    let playerScore = this.scores[this.activePlayer];
    this.scores[this.activePlayer] = playerScore ? playerScore + this.turnScore : this.turnScore;
    this.endTurn();
  }
  endTurn() {
    this.turnScore = 0;
    this.previousPlayer = this.activePlayer;
    this.activePlayer = this.activePlayer + 1 === this.playerNum ? 0 : this.activePlayer + 1;
  }
}

let pigDice;

//UI Logic

function handleGameInit(event) {
  event.preventDefault();
  const input = document.querySelector("#player-number");
  pigDice = new PigDice(parseInt(input.value));
  generateScores();
  document.querySelector("form").toggleAttribute("hidden");
  document.querySelector("#game").toggleAttribute("hidden");
}

function generateScores() {
  let scoreList = document.createElement("ul");
  scoreList.id = "score-list";
  for (let i = 0; i < pigDice.playerNum; i++) {
    let li = document.createElement("li");
    let span = document.createElement("span");
    span.id = `score-${i}`;
    li.innerText = `Player ${i + 1}'s score is `;
    span.innerText = "0";
    li.append(span);
    scoreList.append(li);
  }
  document.querySelector(".score-record").after(scoreList);
}

function updateScores() {
  let toUpdate = document.querySelector(`#score-${pigDice.previousPlayer}`);
  toUpdate.innerText = pigDice.scores[pigDice.previousPlayer];
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
      ActionResult.innerText = "rolled a 1 \n Their turn is forfeit!";
    }
  } else if (event.target.value === "hold-button") {
    ActionResult.innerText = "chose to hold";
    pigDice.hold();
    updateScores();
  }
  document.querySelector(".active-player").innerText = pigDice.activePlayer + 1;
  document.querySelector(".active-total").innerText = pigDice.turnScore;
}

window.addEventListener("load", () => {
  document.querySelectorAll("[type=button]").forEach(el => el.addEventListener("click", handleChoice));
  document.querySelector("form").addEventListener("submit", handleGameInit);
});