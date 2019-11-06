const readline = require("readline-sync");

class MontyHall {
  constructor(contestantGuess) {
    this.contestantGuess = Number(contestantGuess);
    this.doors = [1, 2, 3];
    this.montyDoor = null;
    this.prizeDoor = this.getPrizeDoor();
  }
  start() {
    console.log(`You chose ${this.contestantGuess} as your door`);
    return this.montyOpens();
  }
  getPrizeDoor() {
    return Math.floor(Math.random() * 3) + 1;
  }
  montyOpens() {
    if (this.contestantGuess === this.prizeDoor) {
      let options = this.doors.filter(door => door !== this.contestantGuess);
      this.montyDoor = this.randomDoor(options);
    } else {
      this.montyDoor = this.doors.find(
        door => door !== this.prizeDoor && door !== this.contestantGuess
      );
    }
    console.log("Monty Opens: ", this.montyDoor);
    return this.changeAnswer();
  }
  randomDoor(doors) {
    let randomIndex = Math.floor(Math.random() * 2);
    return doors[randomIndex];
  }
  changeAnswer() {
    let answer = readline.question(
      'Would you like to change your door?  Type "y" for yes or "n" for no:  ',
      { limit: ["y", "n"] }
    );
    if (answer === "y") {
      return this.checkWinning(
        this.doors.find(
          door => door !== this.contestantGuess && door !== this.montyDoor
        )
      );
    } else if (answer === "n") {
      return this.checkWinning(this.contestantGuess);
    }
  }
  checkWinning(guess) {
    console.log(`You guessed ${guess}`);
    console.log(`The prize was located in ${this.prizeDoor}`);
    if (guess == this.prizeDoor) {
      console.log("Win!");
      return "Congratulations, you win!";
    } else {
      console.log("Loss!");
      return "Better luck next time.";
    }
  }
}

function main() {
  console.log(
    `Let's see what kind of luck you have!  Let's play Monty Hall 10 times!`
  );
  let wins = 0;
  let losses = 0;
  for (let i = 0; i < 10; i++) {
    let guess = readline.question(
      "\nYou have 3 doors to pick from, which do you choose? ",
      { limit: [1, 2, 3] }
    );
    const mh = new MontyHall(guess);
    let result = mh.start();
    if (result === "Congratulations, you win!") {
      wins++;
    } else {
      losses++;
    }
  }
  console.log(`That was ${wins} wins and ${losses} losses`);
  return;
}

main();
