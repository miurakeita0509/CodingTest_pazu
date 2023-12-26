// 縦5横6の配列にランダムに1から6の数値を配置する関数
function createRandomNum(rows: number, cols: number): number[][] {
    const arraynum = new Array(rows);
    for (let i = 0; i < rows; i++) {
        arraynum[i] = new Array(cols);
        for (let j = 0; j < cols; j++) {
            arraynum[i][j] = Math.floor(Math.random() * 6) + 1;
        }
    }
    return arraynum;
}

// 配列をコンソールに表示する関数
function printNum(num: number[][]): void {
    for (const row of num) {
        console.log(row.join(' '));
    }
}


const rows = 5;
const cols = 6;
const randomNum = createRandomNum(rows, cols);
printNum(randomNum);
