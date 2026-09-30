// Rock Paper Scissors Script
const choices = ["rock", "paper", "scissors"];
const winningScore = 5;

const scoreDisplay = document.getElementById("score");
const messageDisplay = document.getElementById("log");
const resetButton = document.getElementById("reset");
const choiceButtons = document.querySelectorAll("[data-c]");

let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) return "tie";

  const humanWins =
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper");

  return humanWins ? "win" : "lose";
}

function updateScore() {
  scoreDisplay.textContent = `You ${humanScore} - ${computerScore} Computer`;
}

function setButtonsDisabled(disabled) {
  choiceButtons.forEach((button) => {
    button.disabled = disabled;
  });
}

function endGame() {
  messageDisplay.textContent =
    humanScore === winningScore ? "You won the game!" : "Computer won the game.";
  setButtonsDisabled(true);
  resetButton.hidden = false;
}

function resetGame() {
  humanScore = 0;
  computerScore = 0;
  updateScore();
  messageDisplay.textContent = "";
  setButtonsDisabled(false);
  resetButton.hidden = true;
}

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const humanChoice = button.dataset.c;
    const computerChoice = getComputerChoice();
    const result = playRound(humanChoice, computerChoice);

    if (result === "win") humanScore++;
    if (result === "lose") computerScore++;

    if (result === "tie") {
      messageDisplay.textContent = `Tie. Both chose ${humanChoice}.`;
    } else {
      messageDisplay.textContent = `You ${result}. ${humanChoice} vs ${computerChoice}.`;
    }

    updateScore();

    if (humanScore === winningScore || computerScore === winningScore) {
      endGame();
    }
  });
});

resetButton.addEventListener("click", resetGame);