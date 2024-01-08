import { createRandomNum, columnNumberToName, isSequential } from '../src/randomEntry';

/**
 * createRandomNum関数のテスト
 * 5行6列が作成されるかどうか。
 */
describe('createRandomNum', () => {
  it('should return an array', () => {
    const rows = 5;
    const cols = 6;
    const grid = createRandomNum(rows, cols);
    expect(grid.length).toBe(5);
    grid.forEach(row => {
      expect(row.length).toBe(6);
    });
  });
});

/**
 * isSequential関数のテスト
 * false、trueが返ってくるか。
 */
describe('isSequential', () => {
  it('should return false for a new number', () => {
    const testGrid = [
      [1, 2, 3, 4, 5, 6],
      [6, 5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5, 6],
      [6, 5, 4, 3, 2, 1],
      [1, 2, 1, 1, 1, 4]
    ];
    const i = 1;
    const j = 1;
    const num = 5;
    const result = isSequential(testGrid, i, j, num);
    expect(result).toBe(false);
  });

  it('should return true for a new number', () => {
    const testGrid = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    const i = 0;
    const j = 2;
    const num = 1;
    const result = isSequential(testGrid, i, j, num);
    expect(result).toBe(true);
  });

  it('should return true for a new number', () => {
    const testGrid = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    const i = 2;
    const j = 1;
    const num = 1;
    const result = isSequential(testGrid, i, j, num);
    expect(result).toBe(true);
  });
});

/**
 * columnNumberToNam関数のテスト
 * アルファベットA-Fが抜き出せるかどうか。
 */
describe('columnNumberToNam', () => {
  it('should return "A" for 1', () => {
    expect(columnNumberToName(1)).toBe('A');
  });
  it('should return "B" for 2', () => {
    expect(columnNumberToName(2)).toBe('B');
  });
  it('should return "C" for 3', () => {
    expect(columnNumberToName(3)).toBe('C');
  });
  it('should return "D" for 4', () => {
    expect(columnNumberToName(4)).toBe('D');
  });
  it('should return "E" for 5', () => {
    expect(columnNumberToName(5)).toBe('E');
  });
  it('should return "F" for 6', () => {
    expect(columnNumberToName(6)).toBe('F');
  });
});
