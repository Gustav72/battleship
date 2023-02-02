const Ship = () => {

    const getLength = () => length;

    const numHits = () => hits;

    const life = () => true;

    const hit = () => {
        hits++;
    }
    const isSunk = () => {
        if(hits == length) {
            life = false;
        }
    }

}