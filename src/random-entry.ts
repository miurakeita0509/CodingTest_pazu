// 縦5横6の配列にランダムに1から6の数値を配置する関数
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

// 配列をコンソールに表示する関数
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
