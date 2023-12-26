/**
 * 縦5、横6の配列に1から6のランダムな数値を配置する。
 * @param rows - 縦方向のサイズ(行)
 * @param cols - 横方向のサイズ(列)
 * @returns - 1からnumLimitまでのランダムな整数が格納されたrows * colsの2次元配列
 */
function createRandomNum(rows: number, cols: number): number[][] {
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
 * @param num - 1～6までの整数を含む2次元配列。
 */
function printNum(num: number[][]): void {
    const headers = '    A B C D E F';
    console.log(headers);
    console.log("  _____________");

    for (let i = 0; i < num.length; i++) {
        const rowHeader = `${i + 1} | `;
        const rowNumbers = num[i].join(' ');
        console.log(rowHeader + rowNumbers);
    }
}

// ランダムの数値の上限を定義する定数
const numLimit = 6;
const rows = 5;
const cols = 6;
const randomNum = createRandomNum(rows, cols);
printNum(randomNum);
