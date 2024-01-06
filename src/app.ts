import { createRandomNum, printNum } from './randomEntry';
import { parsePosition, swapValues, findSequences, areAdjacency } from './gridUtilities';
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
        rl.question('\nどの組み合わせを入れ替えますか？(例: "1A 1B"): ', handleInput);
    }

    const handleInput = (input: string) => {
        const positions = input.split(' ');

        if (positions.length !== 2) {
            console.log("無効な入力です。");
            return askForPositions();
        }
        
        // parsePosition関数の戻り値をPointオブジェクトとして受け取る。
        const pos1 = parsePosition(positions[0]);
        const pos2 = parsePosition(positions[1]);

        if (!pos1 || !pos2) {
            console.log("入力された位置は範囲外です。");
            return askForPositions();
        }

        // Pointオブジェクトから行と列のインデックスを取得。
        const row1 = pos1.x;
        const row2 = pos1.y;
        const col1 = pos2.x;
        const col2 = pos2.y;

        if (!areAdjacency(row1, col1, row2, col2)) {
            console.log("入力された位置は隣接していません。");
            return askForPositions();
        }

        const newGrid = swapValues(randomNum, row1, col1, row2, col2);
        const newSequences = findSequences(newGrid, rows, cols);
        printNum(newGrid);

        if (newSequences.length > 0) {
            console.log("\n縦もしくは横に3つ以上同じ値が並ぶ組み合わせの列挙");
            newSequences.forEach(seq => console.log(seq));
        } else {
            console.log("\n縦もしくは横に3つ以上同じ値が並ぶ組み合わせの列挙");
            console.log("縦もしくは横に3つ以上同じ値が並ぶ組み合わせはありません。");
        }

        rl.close();
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
