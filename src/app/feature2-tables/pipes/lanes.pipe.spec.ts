import { mockLane } from 'src/app/test/mocks';
import { LanesPipe } from './lanes.pipe';

describe('PipesPipe', () => {
  const pipe = new LanesPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transform', () => {
    const value = pipe.transform(mockLane);
    expect(value).toEqual(mockLane.length);
  });

});
