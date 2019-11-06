function montyHall(guess) {
  const doors = [1, 2, 3];
  const prizeDoor = Math.floor(Math.random() * 3) + 1;
  let montyDoor;
  if (prizeDoor === guess) {
    const doorsLeft = doors.filter(door => door !== guess);
    montyDoor = randomDoor(doorsLeft);
  } else {
    montyDoor = doors.find(door => door !== guess && door !== prizeDoor);
  }
  const doorChange = doors.find(door => door !== montyDoor && door !== guess);
  if (doorChange === prizeDoor) {
    return true;
  } else {
    return false;
  }
}

function randomDoor(doors) {
  let randomIndex = Math.floor(Math.random() * 2);
  return doors[randomIndex];
}

function main() {
  let wins = 0;
  let losses = 0;
  for (let i = 0; i < 1000000000; i++) {
    let guess = Math.floor(Math.random() * 3) + 1;
    let result = montyHall(guess);
    if (!!result) {
      wins++;
    } else {
      losses++;
    }
  }
  console.log(
    `You always choose the other door, resulting in ${wins} wins and ${losses} losses`
  );
  return;
}

main();
