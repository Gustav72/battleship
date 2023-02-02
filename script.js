export const Ship = (name, length) => {

    const getName = () => name;
    const getLength = () => length;
    let numHits = () => damage = 0;
    const hit = () => {
        damage++;
    }
    let isSunk = () => {
        if(damage == length) return true;
        else return false;
    }
    return {getName, getLength, numHits, hit, isSunk}
};