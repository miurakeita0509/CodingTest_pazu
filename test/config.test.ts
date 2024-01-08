import { CONFIG } from '../src/config';

//定数確認。
describe('CONFIG namespace', () => {
  it('numLimit = 6', () => {
    expect(CONFIG.numLimit).toBe(6);
  });

  it('sequentialValues = 3', () => {
    expect(CONFIG.sequentialValues).toBe(3);
  });

  it('rows = 5', () => {
    expect(CONFIG.rows).toBe(5);
  });

  it('cols = 6', () => {
    expect(CONFIG.cols).toBe(6);
  });
});
