import { createRandomNum, findSequences, printNum } from './randomEntry';
import { parsePosition, swapValues, areAdjacency } from './gridUtilities';
import * as readline from 'readline';
import { CONFIG } from './config';

/**
 * ユーザーに入れ替えたい位置を確認し、縦もしくは横に3つ以上同じ値が並ぶ組み合わせを列挙する。
 */
function promptForSwapAndEnumerate(randomNum: number[][], rows: number, cols: number): void {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const askForPositions = () => {
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
                    console.log(`\n縦もしくは横に ${CONFIG.sequentialValues} つ以上同じ値が並ぶ組み合わせの列挙`);
                    newSequences.forEach(seq => console.log(seq));
                    rl.close();
                } else {
                    console.log("入力された位置は隣接していません。");
                    askForPositions();
                }
            } else {
                console.log("無効な入力です。");
                askForPositions();
            }
        });
    }
    askForPositions();
}

function main(): void{
    const randomNum = createRandomNum(CONFIG.rows, CONFIG.cols);
    const sequences = findSequences(randomNum, CONFIG.rows, CONFIG.cols);
    promptForSwapAndEnumerate(randomNum, CONFIG.rows, CONFIG.cols);
    sequences.forEach(seq => console.log(seq));
}

if (require.main === module) {
    main();
}
