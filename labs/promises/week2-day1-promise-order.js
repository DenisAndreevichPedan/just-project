// ============================================================
// Week 2 Day 1 — Promise order and microtasks
// Запуск: node labs/promises/week2-day1-promise-order.js
// ============================================================

// ─────────────────────────────────────────────
// Case 1: resolved promise vs sync code
// ─────────────────────────────────────────────
function case1() {
  Promise.resolve().then(() => console.log("[1] promise then"));
  console.log("[1] sync");
}

// ─────────────────────────────────────────────
// Case 2: two then handlers on same promise
// ─────────────────────────────────────────────
function case2() {
  const ready = Promise.resolve("done");

  ready.then(() => console.log("[2] then A"));
  ready.then(() => console.log("[2] then B"));
  console.log("[2] sync");
}

// ─────────────────────────────────────────────
// Case 3: nested then
// ─────────────────────────────────────────────
function case3() {
  Promise.resolve()
    .then(() => {
      console.log("[3] then 1");
      Promise.resolve().then(() => console.log("[3] nested then"));
    })
    .then(() => console.log("[3] then 2"));

  console.log("[3] sync");
}

// ─────────────────────────────────────────────
// Case 4: throw inside then -> catch
// ─────────────────────────────────────────────
function case4() {
  Promise.resolve()
    .then(() => {
      console.log("[4] then before throw");
      throw new Error("boom");
    })
    .catch((error) => console.log("[4] catch:", error.message));

  console.log("[4] sync");
}

// ─────────────────────────────────────────────
// Case 5: finally does not replace resolved value
// unless it throws or returns rejected promise
// ─────────────────────────────────────────────
function case5() {
  Promise.resolve("value")
    .finally(() => {
      console.log("[5] finally");
      return "ignored";
    })
    .then((value) => console.log("[5] then:", value));

  console.log("[5] sync");
}

// ─────────────────────────────────────────────
// Case 6: timeout vs promise chain
// ─────────────────────────────────────────────
function case6() {
  setTimeout(() => console.log("[6] setTimeout"), 0);

  Promise.resolve()
    .then(() => console.log("[6] promise then 1"))
    .then(() => console.log("[6] promise then 2"));

  console.log("[6] sync");
}

const delay = 60;

// console.log("========== Case 1 ==========");
// case1();

// setTimeout(() => {
//   console.log("\n========== Case 2 ==========");
//   case2();
// }, delay * 1);

// setTimeout(() => {
//   console.log("\n========== Case 3 ==========");
//   case3();
// }, delay * 2);

// setTimeout(() => {
//   console.log("\n========== Case 4 ==========");
//   case4();
// }, delay * 3);

// setTimeout(() => {
//   console.log("\n========== Case 5 ==========");
//   case5();
// }, delay * 4);

setTimeout(() => {
  console.log("\n========== Case 6 ==========");
  case6();
}, delay * 5);
