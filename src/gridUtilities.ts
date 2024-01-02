/**
 * 入力された位置の文字列を行と列のインデックスに変換する。
 * @param position - "行列"の形式の文字列（例: "1A"）。
 * @returns - 行と列のインデックスのタプル。
 */
export function parsePosition(position: string): [number, number] {
    const row = parseInt(position[0], 10) - 1;
    const colChar = position[1].toUpperCase();
    const col = colChar.charCodeAt(0) - 'A'.charCodeAt(0);
    return [row, col];
}

/**
 * 入力された位置の値を入れ替えて新しい2次元配列を返す。
 * @param grid - 最初の2次元配列。
 * @param row1 - 1つ目の値の行の位置。
 * @param col1 - 1つ目の値の列の位置。
 * @param row2 - 2つ目の値の行の位置。
 * @param col2 - 2つ目の値の列の位置。
 * @returns - 値が入れ替えられた新しい2次元配列。
 */
export function swapValues(grid: number[][], row1: number, col1: number, row2: number, col2: number): number[][] {
    const newGrid = grid.map(row => [...row]);
    [newGrid[row1][col1], newGrid[row2][col2]] = [newGrid[row2][col2], newGrid[row1][col1]];
    return newGrid;
}

/**
 * 入力した値が隣接しているかのチェック。
 */
export function areAdjacency(row1: number, col1: number, row2: number, col2: number): boolean {
    // 縦方向の隣接をチェック。
    if (col1 === col2 && Math.abs(row1 - row2) === 1) {
        return true;
    }
    // 横方向の隣接をチェック。
    if (row1 === row2 && Math.abs(col1 - col2) === 1) {
        return true;
    }
    // 斜め方向の隣接をチェック。
    if (Math.abs(row1 - row2) === 1 && Math.abs(col1 - col2) === 1) {
        return true;
    }
    return false;
}
