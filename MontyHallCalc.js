const fs = require("fs");

class MontyHall {
  constructor(contestantGuess) {
    this.contestantGuess = Number(contestantGuess);
    this.doors = [1, 2, 3];
    this.montyDoor = null;
    this.prizeDoor = this.getPrizeDoor();
  }
  start() {
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
    return this.changeAnswer();
  }
  randomDoor(doors) {
    let randomIndex = Math.floor(Math.random() * 2);
    return doors[randomIndex];
  }
  changeAnswer() {
    return this.checkWinning(
      true,
      this.doors.find(
        door => door !== this.contestantGuess && door !== this.montyDoor
      )
    );
  }
  checkWinning(changedDoor, guess) {
    if (guess == this.prizeDoor && changedDoor) {
      return true;
    } else {
      return false;
    }
  }
}

function main() {
  let wins = 0;
  let losses = 0;
  for (let i = 0; i < 100000; i++) {
    const guess = Math.floor(Math.random() * 3) + 1;
    const mh = new MontyHall(guess);
    const result = mh.start();
    const montyOpens = mh.montyDoor;
    const prizeDoor = mh.prizeDoor;
    const news = !!result ? "YOU WON!" : "...you lost";
    const turnResult = `You guessed door #${guess}, Monty opened door #${montyOpens}.  You picked another door!  And ${news}!  The prize door was door #${prizeDoor}\n`;
    try {
      fs.appendFileSync("mh.md", turnResult);
    } catch (err) {
      console.error(`Error in append on turn ${i}: ${err}`);
    }
    if (!!result) {
      wins++;
    } else {
      losses++;
    }
  }

  const message = `\nYou always chose the other door, resulting in ${wins} wins and ${losses} losses`;
  try {
    fs.appendFileSync("mh.md", message);
  } catch (err) {
    console.error(`Error in appending final message: ${err}`);
  }
  return;
}

main();
