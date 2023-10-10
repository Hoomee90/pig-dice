//Business Logic
class PigDice {
  constructor(playerNum) {
    this.playerNum = playerNum;
    this.activePlayer = 0;
    this.previousPlayer = 0;
    this.scores = {};
    this.turnScore = 0;
    this.winner = null;
  }
  roll() {
    // let currentRoll = Math.floor(Math.random() * 6 + 1);
    let currentRoll = 50;
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
    if (this.scores[this.activePlayer] >= 100) {
      this.winner = this.activePlayer;
    } else {
      this.endTurn();
    }
  }
  endTurn() {
    this.turnScore = 0;
    this.previousPlayer = this.activePlayer;
    this.activePlayer = this.activePlayer + 1 === this.playerNum ? 0 : this.activePlayer + 1;
  }
  reset() {
    return new PigDice(this.playerNum);
  }
}

let pigDice;

//UI Logic

function handleGameInit(event) {
  event.preventDefault();
  const input = document.querySelector("#player-number");
  if (event.type === "submit") {
    pigDice = new PigDice(parseInt(input.value));
  }
  generateScores();
  document.querySelector("form").classList.add("d-none");
  document.querySelector("#game").classList.remove("d-none");
}

function generateScores() {
  let scoreList = document.createElement("ul");
  const styleArray = ["secondary", "warning", "success", "primary", "danger", "info"];
  scoreList.classList.add("score-list", "list-group", "mb-3");
  for (let i = 0; i < pigDice.playerNum; i++) {
    let li = document.createElement("li");
    li.classList.add("list-group-item", "border-0",`list-group-item-${styleArray[i % 5]}`)
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
  const ActionResult = document.querySelector(".action-result");
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
  if (pigDice.winner !== null) {
    ActionResult.innerText = "won the game!";
    document.querySelector(".game-buttons").classList.toggle("d-none");
    document.querySelector("[value=reset-button]").classList.toggle("d-none");
    if (event.target.value === "reset-button") {
      pigDice = pigDice.reset();
      document.querySelector(".score-list").remove();
      handleGameInit(event);
    }
  }
  document.querySelector(".active-player").innerText = pigDice.activePlayer + 1;
  document.querySelector(".active-total").innerText = pigDice.turnScore;
  document.querySelector("#game").className = `card ${document.querySelector(`span#score-${pigDice.activePlayer}`).parentElement.classList[2]}`
}

window.addEventListener("load", () => {
  document.querySelectorAll("[type=button]").forEach(el => el.addEventListener("click", handleChoice));
  document.querySelector("form").addEventListener("submit", handleGameInit);
});