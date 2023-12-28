/**
 * 縦5、横6の配列に1から6のランダムな数値を配置する。
 * @param rows - 縦方向のサイズ(行)。
 * @param cols - 横方向のサイズ(列)。
 * @returns - 1からnumLimitまでのランダムな整数が格納されたrows * colsの2次元配列。
 */
export function createRandomNum(rows: number, cols: number): number[][] {
    const arraynum = new Array(rows);
    for (let i = 0; i < rows; i++) {
        arraynum[i] = new Array(cols);
        for (let j = 0; j < cols; j++) {
            arraynum[i][j] = Math.floor(Math.random() * numLimit) + 1;
        }
    }
    return arraynum;
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

    for (let i = 0; i < grid.length; i++) {
        const rowHeader = `${i + 1} | `;
        const rowNumbers = grid[i].join(' ');
        console.log(rowHeader + rowNumbers);
    }
}

/**
 * 縦横の同じ値が3つ以上続くときの結果を返す関数。
 * @param grid - ランダムに作成した2次元配列。
 * @returns - 3つ以上続くときの結果を文字列で返す。
 */
export function findSequences(grid: number[][], rows: number, cols: number): string[] {
    const sequences: string[] = [];

    // 横方向の３つ以上連続した値を探す
    for (let i = 0; i < rows; i++) {
        let count = 1;
        for (let j = 1; j < rows; j++) {
            if (grid[i][j] === grid[i][j - 1]) {
                count++;
            } else {
                if (count >= 3) {
                    sequences.push(`行 ${i + 1}, 列 ${j - count} から ${j - 1}まで : ${grid[i][j - 1]} が ${count} 回続いてます。`);
                }
                count = 1;
            }
        }
        if (count >= 3) {
            sequences.push(`行 ${i + 1}, 列 ${cols - count} から ${cols - 1}まで : ${grid[i][cols - 1]} が ${count} 回続いてます。`);
        }
    }

    // 縦方向の３つ以上連続した値を探す
    for (let j = 0; j < cols; j++) {
        let count = 1;
        for (let i = 1; i < rows; i++) {
            if (grid[i][j] === grid[i - 1][j]) {
                count++;
            } else {
                if (count >= 3) {
                    sequences.push(`列 ${j + 1}, 行 ${i - count} から ${i - 1}まで : ${grid[i - 1][j]} が ${count} 回続いてます。`);
                }
                count = 1;
            }
        }
        if (count >= 3) {
            sequences.push(`列 ${j + 1}, 行 ${rows - count} から ${rows - 1}まで : ${grid[rows - 1][j]} が ${count} 回続いてます。`);
        }
    }

    return sequences;
}


const numLimit = 6;  // ランダムの数値の上限を定義する定数。
const rows = 5;  // 縦（行）を定義する定数。
const cols = 6;  // 横（列）定義する定数。
const randomNum = createRandomNum(rows, cols);
const sequences = findSequences(randomNum, rows, cols);
printNum(randomNum);
console.log("\n縦もしくは横に3つ以上同じ値が並ぶ組み合わせの列挙");
sequences.forEach(seq => console.log(seq));
