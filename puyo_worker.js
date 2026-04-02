// puyo_worker.js

// 1. Wasmの初期化設定を先に書く
var Module = {
    onRuntimeInitialized: function() {
        console.log("Worker: Wasm Ready");
    }
};

// 2. Wasm（Emscriptenが生成したJS）を読み込む
importScripts('puyosim.js');

// 3. メイン（index.html）からの指示を受け取る
onmessage = function(e) {
    if (typeof Module.ccall === 'function') {
        Module.ccall('run_puyo_analysis', null, ['string'], [e.data]);
    } else {
        console.error("Module is not ready yet.");
    }
};

// 4. C言語の EM_ASM から呼ばれる関数（selfをつけるのがコツ）
self.reportResultToMain = function(score, tap, colorArray, originalColorArray, priority) {
    self.postMessage({
        type: 'RESULT',
        score: score,
        tap: tap,
        colorArray: colorArray,
        originalColorArray: originalColorArray,
        priority: priority,
        plusArray: plusArray,
        bonusArray: bonusArray
    });
};

self.reportPatterns = function(count) {
    self.postMessage({ type: 'PATTERNS', count: count });
};

self.reportNoResult = function() {
    self.postMessage({ type: 'NO_RESULT' });
};
