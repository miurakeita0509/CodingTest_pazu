import { columnNumberToName } from './randomEntry';
import { CONFIG } from './config';
import { Point } from './userTypes';

/**
 * 入力された位置の文字列を行と列のインデックスに変換する。
 * @param position - "行列"の形式の文字列（例: "1A"）。
 * @returns - 行と列のインデックスのタプル。
 */
export function parsePosition(position: string): Point | null {
    const x = parseInt(position[0], 10) - 1;
    const yChar = position[1].toUpperCase();
    const y = yChar.charCodeAt(0) - 'A'.charCodeAt(0);

    // 範囲外の入力をチェック。
    if (x < 0 || x >= CONFIG.rows || y < 0 || y >= CONFIG.cols) {
        return null; // 無効な入力。
    }

    return { x, y };
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

/**
 * 縦横の同じ値が3つ以上続くときの結果を返す関数。
 * @param grid - ランダムに作成した2次元配列。
 * @param rows - 縦方向のサイズ(行)。
 * @param cols - 横方向のサイズ(列)。
 * @returns - 3つ以上続くときの結果を文字列で返す。
 */
export function findSequences(grid: number[][], rows: number, cols: number): string[] {
    const sequences: string[] = [];

    // 横方向の3つ以上連続した値を探す
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        let count = 1;
        for (let colIndex = 1; colIndex < cols; colIndex++) {
            if (grid[rowIndex][colIndex] === grid[rowIndex][colIndex - 1]) {
                count++;
            } else {
                if (count >= CONFIG.sequentialValues) {
                    const startColumn = columnNumberToName(colIndex - count + 1);
                    const endColumn = columnNumberToName(colIndex);
                    sequences.push(`行 ${rowIndex + 1}, 列 ${startColumn} から列 ${endColumn}まで : ${grid[rowIndex][colIndex - 1]} が ${count} 回続いてます。`);
                }
                count = 1;
            }
        }
        if (count >= CONFIG.sequentialValues) {
            const startColumn = columnNumberToName(cols - count + 1);
            const endColumn = columnNumberToName(cols);
            sequences.push(`行 ${rowIndex + 1}, 列 ${startColumn} から列 ${endColumn}まで : ${grid[rowIndex][cols - 1]} が ${count} 回続いてます。`);
        }
    }

    // 縦方向の3つ以上連続した値を探す
    for (let colIndex = 0; colIndex < cols; colIndex++) {
        let count = 1;
        for (let rowIndex = 1; rowIndex < rows; rowIndex++) {
            if (grid[rowIndex][colIndex] === grid[rowIndex - 1][colIndex]) {
                count++;
            } else {
                if (count >= CONFIG.sequentialValues) {
                    const startColumn = columnNumberToName(colIndex + 1);
                    sequences.push(`列 ${startColumn}, 行 ${rowIndex - count + 1} から行 ${rowIndex}まで : ${grid[rowIndex - 1][colIndex]} が ${count} 回続いてます。`);
                }
                count = 1;
            }
        }
        if (count >= CONFIG.sequentialValues) {
            const startColumn = columnNumberToName(colIndex + 1);
            sequences.push(`列 ${startColumn}, 行 ${rows - count + 1} から行 ${rows}まで : ${grid[rows - 1][colIndex]} が ${count} 回続いてます。`);
        }
    }

    return sequences;
}
