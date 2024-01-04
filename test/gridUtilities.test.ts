import { parsePosition, swapValues, areAdjacency, findSequences } from '../src/gridUtilities';

/**
 * parsePosition関数のテスト。
 * 入力された文字列が（形式：1A）が座標に変換されるか。
 */
describe('parsePosition', () => {
  it('should convert position 1row', () => {
    expect(parsePosition("1A")).toEqual([0, 0]);
    expect(parsePosition("1B")).toEqual([0, 1]);
    expect(parsePosition("1C")).toEqual([0, 2]);
    expect(parsePosition("1D")).toEqual([0, 3]);
    expect(parsePosition("1E")).toEqual([0, 4]);
    expect(parsePosition("1F")).toEqual([0, 5]);
  });

  it('should convert position 2row', () => {
    expect(parsePosition("2A")).toEqual([1, 0]);
    expect(parsePosition("2B")).toEqual([1, 1]);
    expect(parsePosition("2C")).toEqual([1, 2]);
    expect(parsePosition("2D")).toEqual([1, 3]);
    expect(parsePosition("2E")).toEqual([1, 4]);
    expect(parsePosition("2F")).toEqual([1, 5]);
  });

  it('should convert position 3row', () => {
    expect(parsePosition("3A")).toEqual([2, 0]);
    expect(parsePosition("3B")).toEqual([2, 1]);
    expect(parsePosition("3C")).toEqual([2, 2]);
    expect(parsePosition("3D")).toEqual([2, 3]);
    expect(parsePosition("3E")).toEqual([2, 4]);
    expect(parsePosition("3F")).toEqual([2, 5]);
  });

  it('should convert position 4row', () => {
    expect(parsePosition("4A")).toEqual([3, 0]);
    expect(parsePosition("4B")).toEqual([3, 1]);
    expect(parsePosition("4C")).toEqual([3, 2]);
    expect(parsePosition("4D")).toEqual([3, 3]);
    expect(parsePosition("4E")).toEqual([3, 4]);
    expect(parsePosition("4F")).toEqual([3, 5]);
  });

  it('should convert position 5row', () => {
    expect(parsePosition("5A")).toEqual([4, 0]);
    expect(parsePosition("5B")).toEqual([4, 1]);
    expect(parsePosition("5C")).toEqual([4, 2]);
    expect(parsePosition("5D")).toEqual([4, 3]);
    expect(parsePosition("5E")).toEqual([4, 4]);
    expect(parsePosition("5F")).toEqual([4, 5]);
  });
});

/**
 * swapValues関数のテスト。
 * 任意の値だけが交換されるか。
 */
describe('swapValues', () => {
  it('should swap positions', () => {
    const grid = [
        [1, 3, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1]
    ];
    const expectedGrid = [
        [3, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1]
    ];
    expect(swapValues(grid, 0, 0, 0, 1)).toEqual(expectedGrid);
  });
});

/**
 * areAdjacency関数のテスト。
 * 入力した値が隣接しているか。
 */
describe('areAdjacency', () => {
  it('should return true', () => {
    expect(areAdjacency(0, 0, 0, 1)).toEqual(true); // 横隣接。
    expect(areAdjacency(0, 0, 1, 0)).toEqual(true); // 縦隣接。
    expect(areAdjacency(0, 0, 1, 1)).toEqual(true); // 斜め隣接。
  });

  it('should return false', () => {
    expect(areAdjacency(0, 0, 0, 2)).toEqual(false); // 横方向で隣接していない。
    expect(areAdjacency(0, 0, 2, 0)).toEqual(false); // 縦方向で隣接していない。
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
