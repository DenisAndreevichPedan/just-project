// ============================================================
// Week 1 Day 1 — Event Loop: micro/macro tasks
// Запуск: node labs/event-loop/week1-day1-eventloop.js
// ============================================================

// ─────────────────────────────────────────────
// Case 1: sync vs setTimeout(0)
// ─────────────────────────────────────────────
function case1() {
  console.log("[1] sync: start");
  setTimeout(() => console.log("[1] setTimeout 0"), 0);
  console.log("[1] sync: end");
}

// ─────────────────────────────────────────────
// Case 2: sync vs Promise.resolve().then
// ─────────────────────────────────────────────
function case2() {
  console.log("[2] sync: start");
  Promise.resolve().then(() => console.log("[2] promise .then"));
  console.log("[2] sync: end");
}

// ─────────────────────────────────────────────
// Case 3: setTimeout(0) vs Promise.resolve().then
// ─────────────────────────────────────────────
function case3() {
  setTimeout(() => console.log("[3] setTimeout 0"), 0);
  Promise.resolve().then(() => console.log("[3] promise .then"));
  console.log("[3] sync");
}

// ─────────────────────────────────────────────
// Case 4: queueMicrotask vs Promise.resolve().then
// ─────────────────────────────────────────────
function case4() {
  queueMicrotask(() => console.log("[4] queueMicrotask"));
  Promise.resolve().then(() => console.log("[4] promise .then"));
  console.log("[4] sync");
}

// ─────────────────────────────────────────────
// Case 5: async / await
// ─────────────────────────────────────────────
async function asyncWork() {
  console.log("[5] inside async — before await");
  await Promise.resolve();
  console.log("[5] inside async — after await");
}

function case5() {
  console.log("[5] before asyncWork()");
  asyncWork();
  console.log("[5] after asyncWork()");
}

// ─────────────────────────────────────────────
// Case 6: Promise внутри setTimeout
// ─────────────────────────────────────────────
function case6() {
  setTimeout(() => {
    console.log("[6] setTimeout: start");
    Promise.resolve().then(() => console.log("[6] promise inside setTimeout"));
    console.log("[6] setTimeout: end");
  }, 0);
  Promise.resolve().then(() => console.log("[6] outer promise .then"));
  console.log("[6] sync");
}

// ─────────────────────────────────────────────
// Case 7: вложенная микрозадача (microtask внутри microtask)
// ─────────────────────────────────────────────
function case7() {
  setTimeout(() => console.log("[7] setTimeout"), 0);
  Promise.resolve().then(() => {
    console.log("[7] promise 1");
    Promise.resolve().then(() => console.log("[7] promise 2 (вложенный)"));
  });
  console.log("[7] sync");
}

// ─────────────────────────────────────────────
// Case 8: две async-функции вперемешку
// ─────────────────────────────────────────────
async function asyncA() {
  console.log("[8] A: до await");
  await Promise.resolve();
  console.log("[8] A: после await");
}

async function asyncB() {
  console.log("[8] B: до await");
  await Promise.resolve();
  console.log("[8] B: после await");
}

function case8() {
  console.log("[8] sync: start");
  asyncA();
  asyncB();
  console.log("[8] sync: end");
}

// ─────────────────────────────────────────────
// Запуск всех кейсов с задержкой между ними,
// чтобы макро-очереди соседних кейсов не смешивались
// ─────────────────────────────────────────────
const delay = 50;

console.log("========== Case 1 ==========");
case1();

setTimeout(() => { console.log("\n========== Case 2 =========="); case2(); }, delay * 1);
setTimeout(() => { console.log("\n========== Case 3 =========="); case3(); }, delay * 2);
setTimeout(() => { console.log("\n========== Case 4 =========="); case4(); }, delay * 3);
setTimeout(() => { console.log("\n========== Case 5 =========="); case5(); }, delay * 4);
setTimeout(() => { console.log("\n========== Case 6 =========="); case6(); }, delay * 5);
setTimeout(() => { console.log("\n========== Case 7 =========="); case7(); }, delay * 6);
setTimeout(() => { console.log("\n========== Case 8 =========="); case8(); }, delay * 7);
