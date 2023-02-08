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
        if (x + ship.getLength() > 10) return placed;
        for (let i = x; i < x + ship.getLength(); i++) {
          if (board[y][i] === 0) {
            board[y][i] = ship;
          } else {
            for (let j = x; j < i; j++) {
              board[y][j] = 0;
            }
            return placed;
          }
        }
        placed = true;
        ships.push(ship);
      } else {
        if (y + ship.getLength() > 10) return placed;
        for (let i = y; i < y + ship.getLength(); i++) {
          if (board[i][x] === 0) {
            board[i][x] = ship;
          } else {
            for (let j = y; j < i; j++) {
              board[j][x] = 0;
            }
            return placed;
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
  
  module.exports = {
    Gameboard,
    Player,
    ComputerPlayer,
    Ship
  }

  