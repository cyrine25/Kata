const { movingPosition } = require('./LawnMower.js')

describe('LawnMower', () => {
  test('should return the final position [5, 1, "E"] for moving sequence "AADAADADDA" and initial position [1, 2, "N"]', () => {
    expect(movingPosition('AADAADADDA', [3, 3, 'E'],[5,5])).toEqual('Final position: 5 1 E')
  });

  test('should return the final position [1, 3, "N"] for moving sequence "GAGAGAGAA" and initial position [1, 2, "N"]', () => {
    expect(movingPosition('GAGAGAGAA', [1, 2, 'N'],[5,5])).toEqual('Final position: 1 3 N')
  });
  test('should return that initial position is out of area', () => {
    expect(movingPosition('GAGAGAGAA', [6, 2, 'N'], [5, 5])).toEqual('initial position is out of area')
    expect(movingPosition('GAGAGAGAA', [1, 6, 'N'],[5,5])).toEqual('initial position is out of area')

  });
    
})
