// ============================================================
// Week 4 — Error propagation: sync, Promise, async, timers
// Запуск: node labs/errors/week4-error-propagation.js
// ============================================================

process.on("unhandledRejection", (reason) => {
  const message = reason instanceof Error ? reason.message : String(reason);
  console.log("[global] unhandledRejection:", message);
});

process.on("uncaughtException", (err) => {
  console.log("[global] uncaughtException:", err.message);
});

// ─────────────────────────────────────────────
// Case 1: synchronous throw — try/catch works
// ─────────────────────────────────────────────
function case1() {
  try {
    console.log("[1] inside try before throw");
    throw new Error("sync boom");
  } catch (e) {
    console.log("[1] catch:", e.message);
  }
  console.log("[1] after try/catch");
}

// ─────────────────────────────────────────────
// Case 2: throw inside Promise executor — not caught by outer try/catch
// ─────────────────────────────────────────────
function case2() {
  try {
    new Promise(() => {
      throw new Error("executor throw");
    });
    console.log("[2] after new Promise (sync part done)");
  } catch (e) {
    console.log("[2] outer catch (unexpected if you see this for executor throw):", e.message);
  }
}

// ─────────────────────────────────────────────
// Case 3: async function — try/catch without await does not catch throw
// ─────────────────────────────────────────────
async function asyncThatThrows() {
  throw new Error("async throw");
}

function case3() {
  try {
    asyncThatThrows();
    console.log("[3] after calling async (no await)");
  } catch (e) {
    console.log("[3] catch:", e.message);
  }
}

// ─────────────────────────────────────────────
// Case 4: same async — await inside try/catch catches
// ─────────────────────────────────────────────
async function case4() {
  try {
    await asyncThatThrows();
    console.log("[4] after await (should not run)");
  } catch (e) {
    console.log("[4] catch:", e.message);
  }
}

// ─────────────────────────────────────────────
// Case 5: rejected Promise with no catch — unhandled (observe global handler)
// ─────────────────────────────────────────────
function case5() {
  Promise.reject(new Error("no catch here"));
  console.log("[5] sync after reject");
}

// ─────────────────────────────────────────────
// Case 6: setTimeout — outer try/catch does not catch callback throw
// ─────────────────────────────────────────────
function case6() {
  try {
    setTimeout(() => {
      throw new Error("timeout callback boom");
    }, 0);
    console.log("[6] sync after setTimeout scheduled");
  } catch (e) {
    console.log("[6] outer catch:", e.message);
  }
}

const delay = 150;

// console.log("========== Case 1: sync try/catch ==========");
// case1();

setTimeout(() => {
  console.log("\n========== Case 2: throw in Promise executor ==========");
  case2();
}, delay * 1);

// setTimeout(() => {
//   console.log("\n========== Case 3: async without await ==========");
//   case3();
// }, delay * 2);

// setTimeout(() => {
//   console.log("\n========== Case 4: async with await ==========");
//   void case4();
// }, delay * 3);

// setTimeout(() => {
//   console.log("\n========== Case 5: reject without catch ==========");
//   case5();
// }, delay * 4);

// setTimeout(() => {
//   console.log("\n========== Case 6: setTimeout + outer try/catch ==========");
//   case6();
// }, delay * 5);

// setTimeout(() => {
//   console.log("\n========== Done ==========");
//   process.exit(0);
// }, delay * 6 + 400);
