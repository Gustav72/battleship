const Ship = (name, length) => {
    let damage = 0;
    const getName = () => name;
    const getLength = () => length;
    const numHits = () => damage;
    const hit = () => {
        damage++;
    }
    const isSunk = () => {
        if(damage == length) return true;
        else return false;
    }

    return {getName, getLength, numHits, hit, isSunk}
};

const Gameboard = () => {
    let board = [];
    let ships = [];
    let missedAttacks = [];
  
    for (let i = 0; i < 10; i++) {
      board[i] = [];
      for (let j = 0; j < 10; j++) {
        board[i][j] = 0;
      }
    }
  
    const placeShip = (ship, x, y, orientation) => {
      let placed = false;
      if (orientation === 'horizontal') {
        // check if piece fits on board
        if (x + ship.getLength() > 10) return placed;
        // check if all of ship footprint is not taken
        for (let i = x; i < x + ship.getLength(); i++) {
          if (board[y][i] !== 0) return placed;
        }
        //places ship on board
        for (let i = x; i < x + ship.getLength(); i++) {
          if (board[y][i] === 0) {
            board[y][i] = ship;
          }
        }
        placed = true;
        ships.push(ship);
        return placed;
      } else { //for vertical orientation
        // check if piece fits on board
        if (y + ship.getLength() > 10) return placed;
        // check if all of ship footprint is not taken
        for (let i = y; i < y + ship.getLength(); i++) {
          if (board[i][x] === 0) return placed;
        }
        //places ship on board
        for (let i = y; i < y + ship.getLength(); i++) {
          if (board[i][x] === 0) {
            board[i][x] = ship;
          }
        }
        placed = true;
        ships.push(ship);
      }
      return placed;
    }

    const receiveAttack = (x, y) => {
      if (board[y][x] !== 0) {
          board[y][x].hit();
          return 'hit';
      } else {    
          missedAttacks.push([x, y]);
          return 'miss';
      }
    }
  
    const allSunk = () => {
      for (let i = 0; i < ships.length; i++) {
        if (!ships[i].isSunk()) {
          return false;
        }
      }
      return true;
    }
  
    const displayMissed = () => {
      return missedAttacks;
    }
  
    return {
      placeShip,
      receiveAttack,
      allSunk,
      displayMissed,
      ships,
      board
    };
  }

const Player = (gameboard) => {
    let myTurn = false;
    
    const attack = (x, y) => {
      myTurn = false;
      return gameboard.receiveAttack(x, y);
    }
    
    const endTurn = () => {
      myTurn = true;
    }
    
    const isTurn = () => {
      return myTurn;
    }
    
    return {
      attack,
      endTurn,
      isTurn,
    };
  }

  const ComputerPlayer = (gameboard) => {
    let previousMoves = [];
    let myTurn = false;
  
    const attack = () => {
      let x, y;
      do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      } while (previousMoves.some(move => move[0] === x && move[1] === y));
      previousMoves.push([x, y]);
      let location = document.getElementById(y.toString() + x.toString());
      if(gameboard.receiveAttack(x, y) == 'hit') {
        location.style.backgroundColor = 'red';

      } else {
        const location = document.getElementById(y.toString() + x.toString());
        location.style.backgroundColor = 'white';

      }
      myTurn = false;
      return gameboard.receiveAttack(x, y);
    }
  
    const endTurn = () => {
      myTurn = true;
    }
  
    const isTurn = () => {
      return myTurn;
    }
  
    return {
      attack,
      endTurn,
      isTurn,
      previousMoves
    };
  }


  const GameFlow = () => {

    const startGame = () => {

      const shipLengths = [5, 4, 3, 3, 2];
      const shipTypes = ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer'];
    
      shipLengths.forEach((length, index) => {
        const ship = Ship(shipTypes[index], length);
        let placement;
        do {
          let randomOrientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
          let x = Math.floor(Math.random() * 10);
          let y = Math.floor(Math.random() * 10);
          placement = playerBoard.placeShip(ship, x, y, randomOrientation);
          playerBoard.placeShip(ship, x, y, randomOrientation);
         } while(!placement);
      });
    
      shipLengths.forEach((length, index) => {
        let placement
        const ship = Ship(shipTypes[index], length);
        do {
        let randomOrientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        placement = computerBoard.placeShip(ship, x, y, randomOrientation);
        computerBoard.placeShip(ship, x, y, randomOrientation);
        } while(!placement);
      });
    

    }
    
    const generateBoards = () => {
      const pBoard = document.querySelector('#player-board');
      const cBoard = document.querySelector('#computer-board');

      for (let i = 0; i < 10; i++) {
        const row1 = document.createElement('div');
        row1.classList.add('row')
        pBoard.appendChild(row1)
        const row2 = document.createElement('div');
        row2.classList.add('row')
        cBoard.appendChild(row2)

        for (let j = 0; j < 10; j++) {
            const grid1 = document.createElement('div');
              grid1.classList.add('grid');
              grid1.setAttribute('id', i.toString() + j.toString());
              row1.appendChild(grid1);
            const grid2 = document.createElement('div');
              grid2.addEventListener('click', () => {
                if(playerBoard.receiveAttack(i, j) == 'hit') {
                  grid2.style.backgroundColor = 'red'
                  computerPlayer.attack()
                }
                else {
                  grid2.style.backgroundColor = 'white'
                  computerPlayer.attack()
                }
            }, {once: true})
            grid2.classList.add('grid');
            row2.appendChild(grid2);

        }
     }  
     
     



    }
    return {
      generateBoards,
      startGame,

    }
  }
  

  const playerBoard = Gameboard();
  const computerBoard = Gameboard();

  const player = Player(playerBoard);
  const computerPlayer = ComputerPlayer(computerBoard);

  const gameFlow = GameFlow();
  
  gameFlow.generateBoards();
  
  gameFlow.startGame();
  let turn = false

//For Jest Unit Tests

  // module.exports = {
  //   Gameboard,
  //   Player,
  //   ComputerPlayer,
  //   Ship
  // }