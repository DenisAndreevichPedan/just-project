// ============================================================
// Week 2 Day 3 — Error propagation in promises and async/await
// Запуск: node labs/promises/week2-day3-error-propagation.js
// ============================================================

process.on("unhandledRejection", (reason) => {
  const message = reason instanceof Error ? reason.message : String(reason);
  console.log("[global] unhandledRejection:", message);
});

// ─────────────────────────────────────────────
// Case 1: throw inside then becomes rejected promise
// ─────────────────────────────────────────────
function case1() {
  Promise.resolve()
    .then(() => {
      console.log("[1] then before throw");
      throw new Error("boom in then");
    })
    .catch((error) => console.log("[1] catch:", error.message));

  console.log("[1] sync");
}

// ─────────────────────────────────────────────
// Case 2: reject handled by catch
// ─────────────────────────────────────────────
function case2() {
  Promise.reject(new Error("manual reject"))
    .catch((error) => console.log("[2] catch:", error.message));

  console.log("[2] sync");
}

// ─────────────────────────────────────────────
// Case 3: try/catch does not catch async rejection
// without await
// ─────────────────────────────────────────────
async function willRejectAsync() {
  throw new Error("async failure");
}

function case3() {
  try {
    willRejectAsync();
    console.log("[3] after async call");
  } catch (error) {
    console.log("[3] catch:", error.message);
  }
}

// ─────────────────────────────────────────────
// Case 4: try/catch catches rejection with await
// ─────────────────────────────────────────────
async function case4() {
  try {
    await willRejectAsync();
    console.log("[4] after await");
  } catch (error) {
    console.log("[4] catch:", error.message);
  }
}

// ─────────────────────────────────────────────
// Case 5: return Promise.reject from async function
// ─────────────────────────────────────────────
async function returnRejectedPromise() {
  return Promise.reject(new Error("returned reject"));
}

function case5() {
  returnRejectedPromise()
    .catch((error) => console.log("[5] catch:", error.message));

  console.log("[5] sync");
}

// ─────────────────────────────────────────────
// Case 6: finally after error
// ─────────────────────────────────────────────
function case6() {
  Promise.reject(new Error("fail"))
    .catch((error) => {
      console.log("[6] catch:", error.message);
      throw new Error("rethrow from catch");
    })
    .finally(() => console.log("[6] finally"))
    .catch((error) => console.log("[6] final catch:", error.message));

  console.log("[6] sync");
}

const delay = 120;

console.log("========== Case 1 ==========");
case1();

setTimeout(() => {
  console.log("\n========== Case 2 ==========");
  case2();
}, delay * 1);

setTimeout(() => {
  console.log("\n========== Case 3 ==========");
  case3();
}, delay * 2);

setTimeout(() => {
  console.log("\n========== Case 4 ==========");
  void case4();
}, delay * 3);

setTimeout(() => {
  console.log("\n========== Case 5 ==========");
  case5();
}, delay * 4);

setTimeout(() => {
  console.log("\n========== Case 6 ==========");
  case6();
}, delay * 5);
