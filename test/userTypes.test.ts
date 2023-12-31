import { createPoint } from '../src/userTypes';

//行列確認。
describe('createPoint function', () => {
  it('should create x and y', () => {
    const x = 5;
    const y = 6;
    const point = createPoint(x, y);

    expect(point.x).toBe(x);
    expect(point.y).toBe(y);
  });
});
