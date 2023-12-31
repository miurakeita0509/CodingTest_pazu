import { CONFIG } from './config';

/**
 * 縦5、横6の配列に1から6のランダムに3つ以上連続しない数値を配置する。
 * @param rows - 縦方向のサイズ(行)。
 * @param cols - 横方向のサイズ(列)。
 * @returns - 1からnumLimitまでのランダムな整数が格納されたrows * colsの2次元配列。
 */
export function createRandomNum(rows: number, cols: number): number[][] {
    const grid = new Array(rows);
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        grid[rowIndex] = new Array(cols);
        for (let colIndex = 0; colIndex < cols; colIndex++) {
            let num;
            do {
                num = Math.floor(Math.random() * CONFIG.numLimit) + 1;
            } while (isSequential(grid, rowIndex, colIndex, num));
            grid[rowIndex][colIndex] = num;
        }
    }
    return grid;
}

/**
 * 3つ以上同じ値が連続しているか。
 * @param grid - 2次元配列。
 * @param rowIndex - 横方向の位置。
 * @param colIndex - 縦方向の位置。
 * @param num - 入力しようとしているランダムの値。
 * @returns  - true か false。
 */
export function isSequential(grid: number[][], rowIndex: number, colIndex: number, num: number): boolean {
    // 横方向のチェック
    if (colIndex >= 2 && (grid[rowIndex][colIndex - 1] === num) && (grid[rowIndex][colIndex - 2] === num)) {
        return true;
    }
    // 縦方向のチェック
    if (rowIndex >= 2 && (grid[rowIndex - 1][colIndex] === num) && (grid[rowIndex - 2][colIndex] === num)) {
        return true;
    }
    return false;
}

/**
 * 与えられた2次元配列を整形してコンソールに表示する。
 * 列はアルファベット、行は数字にて表す。
 * @param grid - 1～6までの整数を含む2次元配列。
 */
export function printNum(grid: number[][]): void {
    const headers = '    A B C D E F';
    console.log(headers);
    console.log("  _____________");

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        const rowHeader = `${rowIndex + 1} | `;
        const rowNumbers = grid[rowIndex].join(' ');
        console.log(rowHeader + rowNumbers);
    }
}

/**
 * 2次元配列の列をアルファベットに変換するための関数。
 * @param columnNumber - アルファベットの位置を取得。
 * @returns - 2次元配列の列に対応したアルファベットを返す。
 * columnNumberの初期値が1から始めるため-1をしておく。
 */
export function columnNumberToName(columnNumber: number): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet[columnNumber - 1];
}
