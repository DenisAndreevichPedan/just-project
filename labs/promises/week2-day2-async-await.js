// ============================================================
// Week 2 Day 2 — async/await: pause and resume
// Запуск: node labs/promises/week2-day2-async-await.js
// ============================================================

// ─────────────────────────────────────────────
// Case 1: async without await
// ─────────────────────────────────────────────
async function noAwait() {
  console.log("[1] inside async without await");
  return "done";
}

function case1() {
  console.log("[1] before");
  noAwait().then((value) => console.log("[1] then:", value));
  console.log("[1] after");
}

// ─────────────────────────────────────────────
// Case 2: one await Promise.resolve()
// ─────────────────────────────────────────────
async function oneAwait() {
  console.log("[2] before await");
  await Promise.resolve();
  console.log("[2] after await");
}

function case2() {
  console.log("[2] before call");
  oneAwait();
  console.log("[2] after call");
}

// ─────────────────────────────────────────────
// Case 3: two awaits in one function
// ─────────────────────────────────────────────
async function twoAwaits() {
  console.log("[3] step 1");
  await Promise.resolve();
  console.log("[3] step 2");
  await Promise.resolve();
  console.log("[3] step 3");
}

function case3() {
  console.log("[3] before call");
  twoAwaits();
  console.log("[3] after call");
}

// ─────────────────────────────────────────────
// Case 4: two async functions interleaving
// ─────────────────────────────────────────────
async function taskA() {
  console.log("[4] A before await");
  await Promise.resolve();
  console.log("[4] A after await");
}

async function taskB() {
  console.log("[4] B before await");
  await Promise.resolve();
  console.log("[4] B after await");
}

function case4() {
  console.log("[4] sync start");
  taskA();
  taskB();
  console.log("[4] sync end");
}

// ─────────────────────────────────────────────
// Case 5: await of non-promise value
// ─────────────────────────────────────────────
async function awaitPlainValue() {
  console.log("[5] before await 42");
  const value = await 42;
  console.log("[5] after await:", value);
}

function case5() {
  console.log("[5] before call");
  awaitPlainValue();
  console.log("[5] after call");
}

// ─────────────────────────────────────────────
// Case 6: sequential vs parallel timing
// ─────────────────────────────────────────────
function wait(ms, label) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[6] done: ${label}`);
      resolve(label);
    }, ms);
  });
}

async function sequential() {
  console.time("[6] sequential");
  await wait(80, "A");
  await wait(80, "B");
  console.timeEnd("[6] sequential");
}

async function parallel() {
  console.time("[6] parallel");
  await Promise.all([wait(80, "A"), wait(80, "B")]);
  console.timeEnd("[6] parallel");
}

async function case6() {
  console.log("[6] sequential start");
  await sequential();
  console.log("[6] parallel start");
  await parallel();
}

const delay = 120;

// console.log("========== Case 1 ==========");
// case1();

setTimeout(() => {
  console.log("\n========== Case 2 ==========");
  case2();
}, delay * 1);

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

// setTimeout(() => {
//   console.log("\n========== Case 6 ==========");
//   void case6();
// }, delay * 5);
