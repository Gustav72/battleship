const myMethods = require('./script')

const Ship = myMethods.Ship;
const Gameboard = myMethods.Gameboard;
const Player = myMethods.Player;
const ComputerPlayer = myMethods.ComputerPlayer;

describe('Ship', () => {

  let cruiser;

  beforeEach(() => {
    cruiser = Ship('cruiser', 3);
  });

  test('properly adds length to ships', () => {
      expect(cruiser.getLength()).toBe(3);
  });

  test('properly adds name to ships', () => {
      expect(cruiser.getName()).toBe('cruiser');
  });

  test('properly adds hits after being hit', () => {
      cruiser.hit();

      expect(cruiser.numHits()).toBe(1);
  });

  test('ship is not sunk when length > numHits', () => {
      expect(cruiser.isSunk()).toBe(false);
  })

  test('sinks ship after getting numHits == to length', () => {
      cruiser.hit();
      cruiser.hit();
      cruiser.hit();

      expect(cruiser.isSunk()).toBe(true);
  })


  test('recieveAttack function delivers hit to ship', () => {
      cruiser.hit();
      cruiser.hit();
      cruiser.hit();

      expect(cruiser.numHits()).toBe(3)
  })
});

describe('Gameboard', () => {
  let gameboard;
  beforeEach(() => {
    gameboard = Gameboard();
  });

  test('can place a ship at specific coordinates', () => {
    const ship = Ship('Destroyer', 2);
    gameboard.placeShip(ship, 0, 0, 'horizontal');
    expect(gameboard.ships[0]).toEqual(ship);
  });

  test('can receive an attack and hit a ship', () => {
    const ship = Ship('Destroyer', 2);
    gameboard.placeShip(ship, 0, 0, 'horizontal');
    gameboard.receiveAttack(0, 0);
    expect(ship.hit).toHaveBeenCalledWith(0);
  });

  test('can receive an attack and miss', () => {
    gameboard.receiveAttack(0, 0);
    expect(gameboard.missedAttacks).toContainEqual([0, 0]);
  });

  test('can report if all ships have been sunk', () => {
    const ship1 = Ship('Destroyer', 2);
    const ship2 = Ship('Submarine', 3);
    gameboard.placeShip(ship1, 0, 0, 'horizontal');
    gameboard.placeShip(ship2, 2, 2, 'vertical');
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(2, 2);
    gameboard.receiveAttack(2, 3);
    gameboard.receiveAttack(2, 4);
    expect(gameboard.allSunk()).toBe(false);
    gameboard.receiveAttack(1, 0);
    expect(gameboard.allSunk()).toBe(true);
  });
});

describe('Player', () => {
  let player;
  let gameboard;
  beforeEach(() => {
    gameboard = Gameboard();
    player = Player(gameboard);
  });

  test('can attack an enemy gameboard', () => {
    const ship = Ship('Destroyer', 2);
    gameboard.placeShip(ship, 0, 0, 'horizontal');
    player.attack(0, 0);
    expect(ship.hit).toHaveBeenCalledWith(0);
  });

  test('records the result of an attack', () => {
    player.attack(0, 0);
    expect(player.attacks[0]).toEqual([0, 0, 'miss']);
    const ship = Ship('Destroyer', 2);
    gameboard.placeShip(ship, 0, 0, 'horizontal');
    player.attack(0, 0);
    expect(player.attacks[1]).toEqual([0, 0, 'hit']);
  });
});

describe('ComputerPlayer', () => {
  let computerPlayer;
  let gameboard;
  beforeEach(() => {
    gameboard = Gameboard();
    computerPlayer = ComputerPlayer(gameboard);
  });

  test('can attack an enemy gameboard', () => {
    const ship = Ship('Destroyer', 2);
    gameboard.placeShip(ship, 0, 0, 'horizontal');
    computerPlayer.attack();
    const lastAttack = computerPlayer.attacks[computerPlayer.attacks.length - 1];
    expect(ship.hit).toHaveBeenCalledWith(lastAttack[0]);
  });

  test('does not attack the same coordinate twice', () => {
    const ship = Ship('Destroyer', 2);
    gameboard.placeShip(ship, 0, 0, 'horizontal');
    computerPlayer.attack();
    const lastAttack = computerPlayer.attacks[computerPlayer.attacks.length - 1];
    computerPlayer.attack();
    const newLastAttack = computerPlayer.attacks[computerPlayer.attacks.length - 1];
    expect(lastAttack).not.toEqual(newLastAttack);
  });

  test('records the result of an attack', () => {
    computerPlayer.attack();
    const lastAttack = computerPlayer.attacks[computerPlayer.attacks.length - 1];
    expect(lastAttack[2]).toBe('miss');
    const ship = Ship('Destroyer', 2);
    gameboard.placeShip(ship, 0, 0, 'horizontal');
    computerPlayer.attack();
    const newLastAttack = computerPlayer.attacks[computerPlayer.attacks.length - 1];
    expect(newLastAttack[2]).toBe('hit');
  });
});
