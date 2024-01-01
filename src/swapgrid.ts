import { createRandomNum, findSequences, printNum } from './random-entry';
import * as readline from 'readline';

const rows = 5;
const cols = 6;
const randomNum = createRandomNum(rows, cols);

/**
 * 入力された位置の文字列を行と列のインデックスに変換する。
 * @param position - "行列"の形式の文字列（例: "1A"）。
 * @returns - 行と列のインデックスのタプル。
 */
function parsePosition(position: string): [number, number] {
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
function swapValues(grid: number[][], row1: number, col1: number, row2: number, col2: number): number[][] {
    const newGrid = grid.map(row => [...row]);
    [newGrid[row1][col1], newGrid[row2][col2]] = [newGrid[row2][col2], newGrid[row1][col1]];
    return newGrid;
}

/**
 * 入力した値が隣接しているかのチェック。
 */
function areAdjacency(row1: number, col1: number, row2: number, col2: number): boolean {
    // 縦方向の隣接をチェック。
    if (col1 === col2 && Math.abs(row1 - row2) === 1) {
        return true;
    }
    // 横方向の隣接をチェック。
    if (row1 === row2 && Math.abs(col1 - col2) === 1) {
        return true;
    }
    return false;
}

/**
 * ユーザーに入れ替えたい位置を確認し、縦もしくは横に3つ以上同じ値が並ぶ組み合わせを列挙する。
 */
function promptForSwapAndEnumerate(): void {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    printNum(randomNum);
    rl.question('\nどの組み合わせを入れ替えますか？(例: "1A 1B"): ', (input: string) => {
        const positions = input.split(' ');
        if (positions.length === 2) {
            const [row1, col1] = parsePosition(positions[0]);
            const [row2, col2] = parsePosition(positions[1]);
            if (areAdjacency(row1, col1, row2, col2)) {
                const newGrid = swapValues(randomNum, row1, col1, row2, col2);
                const newSequences = findSequences(newGrid, rows, cols);
                printNum(newGrid);
                console.log("\n縦もしくは横に3つ以上同じ値が並ぶ組み合わせの列挙");
                newSequences.forEach(seq => console.log(seq));
            } else {
                console.log("入力された位置は隣接していません。");
            }
        } else {
            console.log("無効な入力です。");
        }
        rl.close();
    });
}

function main(): void{
    const sequences = findSequences(randomNum, rows, cols);
    promptForSwapAndEnumerate();
    sequences.forEach(seq => console.log(seq));
}

if (require.main === module) {
    main();
}
