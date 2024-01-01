import { createRandomNum, findSequences, columnNumberToName, isSequential } from './randomEntry';

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

/**
 * findSequences関数のテスト
 * 連続する値が正しくカウントできているかどうか。
 */
describe('findSequences', () => {
  it('should find sequences correctly 1', () => {
    const testGrid = [
      [1, 2, 3, 4, 5, 6],
      [6, 5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5, 6],
      [6, 5, 4, 3, 2, 1],
      [1, 2, 1, 1, 1, 4]  // 最下段にて1が連続。
    ];
    const rows = 5;
    const cols = 6;
    const sequences = findSequences(testGrid, rows, cols);
    expect(sequences.length).toBe(1);
  });

  it('should find sequences correctly 3', () => {
    const testgrid = [
      [1, 1, 1, 2, 3, 4],  // 3つの1が連続。
      [2, 2, 3, 4, 5, 6],
      [3, 4, 5, 6, 6, 6],  // 3つの6が連続。
      [4, 5, 6, 1, 2, 3],
      [5, 6, 2, 2, 2, 2],  // 4つの2が連続。
    ];
    const rows = 5;
    const cols = 6;
    const sequences = findSequences(testgrid, rows, cols);
    expect(sequences.length).toBe(3);
  });

  it('should find sequences correctly 4', () => {
    const testGrid = [
      [1, 1, 1, 4, 5, 6],
      [1, 2, 3, 5, 5, 4],
      [1, 3, 3, 4, 3, 6],
      [2, 2, 4, 4, 5, 6],  // シーケンスが行や列の最後にある場合に、
      [2, 2, 3, 6, 6, 6]   //それを正しく検出できているかどうかの確認。
    ];
    const rows = 5;
    const cols = 6;
    const sequences = findSequences(testGrid, rows, cols);
    expect(sequences.length).toBe(4);
  });

  it('should find sequences correctly 5', () => {
    const testGrid = [
      [1, 1, 1, 1, 1, 1],
      [2, 2, 2, 2, 2, 2],
      [3, 3, 3, 3, 3, 3],  
      [4, 4, 4, 4, 4, 4],
      [5, 5, 5, 5, 5, 5]  // 各行で3つの1, 2, 3, 4, 5, 6が連続。
    ];
    const rows = 5;
    const cols = 6;
    const sequences = findSequences(testGrid, rows, cols);
    expect(sequences.length).toBe(5);
  });

  it('should find sequences correctly 6', () => {
    const testGrid = [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6]  // 各列で3つの1, 2, 3, 4, 5, 6が連続。
    ];
    const rows = 5;
    const cols = 6;
    const sequences = findSequences(testGrid, rows, cols);
    expect(sequences.length).toBe(6);
  });

  it('should find sequences correctly 11_1', () => {
    const testGrid = [
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1]  // 1が連続。
    ];
    const rows = 5;
    const cols = 6;
    const sequences = findSequences(testGrid, rows, cols);
    expect(sequences.length).toBe(11);
  });

  it('should find sequences correctly 11_2', () => {
    const testGrid = [
      [2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2, 2]  // 2が連続。
    ];
    const rows = 5;
    const cols = 6;
    const sequences = findSequences(testGrid, rows, cols);
    expect(sequences.length).toBe(11);
  });

  it('should find sequences correctly 11_3', () => {
    const testGrid = [
      [3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3]  // 3が連続。
    ];
    const rows = 5;
    const cols = 6;
    const sequences = findSequences(testGrid, rows, cols);
    expect(sequences.length).toBe(11);
  });

  it('should find sequences correctly 11_4', () => {
    const testGrid = [
      [4, 4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4, 4]  // 4が連続。
    ];
    const rows = 5;
    const cols = 6;
    const sequences = findSequences(testGrid, rows, cols);
    expect(sequences.length).toBe(11);
  });

  it('should find sequences correctly 11_5', () => {
    const testGrid = [
      [5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5, 5]  // 5が連続。
    ];
    const rows = 5;
    const cols = 6;
    const sequences = findSequences(testGrid, rows, cols);
    expect(sequences.length).toBe(11);
  });

  it('should find sequences correctly 11_6', () => {
    const testGrid = [
      [6, 6, 6, 6, 6, 6],
      [6, 6, 6, 6, 6, 6],
      [6, 6, 6, 6, 6, 6],
      [6, 6, 6, 6, 6, 6],
      [6, 6, 6, 6, 6, 6]  // 6が連続。
    ];
    const rows = 5;
    const cols = 6;
    const sequences = findSequences(testGrid, rows, cols);
    expect(sequences.length).toBe(11);
  });
});
