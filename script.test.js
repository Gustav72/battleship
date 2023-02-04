const Ship = require('./script');
const cruiser = Ship('cruiser', 3);

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

    expect(cruiser.isSunk()).toBe(true);
})