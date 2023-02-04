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

module.exports = Ship;
