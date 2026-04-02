// puyosim.js を読み込む
importScripts('puyosim.js');

// Wasmの準備ができたら実行される
Module.onRuntimeInitialized = () => {
    console.log("Worker: Wasm Ready");
};

// メインスレッド（index.html）から命令が来たら動く
onmessage = function(e) {
    const combinedData = e.data;

    // C言語の run_puyo_analysis を実行
    // ※Cコード側で結果を EM_ASM などで返すようにしておく必要があります
    Module.ccall('run_puyo_analysis', null, ['string'], [combinedData]);
};

// C言語側（Wasm）から結果を受け取ってメインに送るための関数（CのEM_ASMから呼ぶ）
function reportResultToMain(score, tap, colorArray, priority) {
    self.postMessage({
        type: 'RESULT',
        score: score,
        tap: tap,
        colorArray: colorArray,
        priority: priority
    });
}
