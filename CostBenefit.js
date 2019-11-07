function getDoorArray(numDoors) {
  let doors = [];
  for (let i = 0; i < numDoors; ) {
    doors[i] = ++i;
  }
  return doors;
}

function chooseRandomDoor(doors) {
  const randomIndex = Math.floor(Math.random() * doors.length);
  return doors[randomIndex];
}

function montyHall(numDoors, guess) {
  let doors = getDoorArray(numDoors);
  // Choose prize door before taking into account contestant guess
  const prizeDoor = chooseRandomDoor(doors);
  const doorsMontyCanChooseFrom = doors.filter(
    door => door !== guess && door !== prizeDoor
  );
  const montyOpens = chooseRandomDoor(doorsMontyCanChooseFrom);
  const doorsLeftToChoose = doors.filter(
    door => door !== montyOpens && door !== guess
  );
  const guessAnotherDoor = chooseRandomDoor(doorsLeftToChoose);

  if (prizeDoor === guessAnotherDoor) {
    return "Switching helped";
  } else if (prizeDoor === guess) {
    return "So close";
  }
  return "Switching had no effect";
}

function main() {
  let numDoors = 3,
    costBenefit = true;
  while (costBenefit) {
    let losses = 0,
      wins = 0,
      hurtToSwitch = 0;
    for (let i = 0; i < 10000000; i++) {
      let guess = Math.floor(Math.random() * numDoors) + 1;
      let result = montyHall(numDoors, guess);
      if (result === "Switching helped") {
        wins++;
      } else if (result === "So close") {
        hurtToSwitch++;
      } else if (result === "Switching had no effect") {
        losses++;
      }
    }
    costBenefit = wins >= hurtToSwitch ? true : false;
    console.log(
      `With ${numDoors} doors, it helped to switch ${wins} times, hurt to switch ${hurtToSwitch} times, and had no effect ${losses} times`
    );
    numDoors++;
  }
  return;
}
main();
