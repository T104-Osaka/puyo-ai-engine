importScripts('puyosim.js');

Module.onRuntimeInitialized = () => {
    console.log("Worker: Wasm Ready");
};

onmessage = function(e) {
    // index.html から届いたデータを解析に回す
    Module.ccall('run_puyo_analysis', null, ['string'], [e.data]);
};

// C言語の EM_ASM から呼ばれる関数
function reportResultToMain(score, tap, colorArray, originalColorArray, priority) {
    self.postMessage({
        type: 'RESULT',
        score: score,
        tap: tap,
        colorArray: colorArray,
        originalColorArray: originalColorArray,
        priority: priority
    });
}

function reportPatterns(count) {
    self.postMessage({ type: 'PATTERNS', count: count });
}

function reportNoResult() {
    self.postMessage({ type: 'NO_RESULT' });
}
