import { NewPlayer } from './new-player';

describe('NewPlayer', () => {
  it('should create an instance', () => {
    expect(new NewPlayer(1,'name')).toBeTruthy();
  });
});
