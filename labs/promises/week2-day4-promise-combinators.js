// ============================================================
// Week 2 Day 4 — Promise combinators in practice
// Запуск: node labs/promises/week2-day4-promise-combinators.js
// ============================================================

function fakeTask(label, ms, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`task ${label} failed`));
        return;
      }

      resolve(`task ${label} ok`);
    }, ms);
  });
}

// ─────────────────────────────────────────────
// Case 1: Promise.all success
// ─────────────────────────────────────────────
async function case1() {
  const result = await Promise.all([
    fakeTask("A", 40),
    fakeTask("B", 60),
  ]);

  console.log("[1]", result);
}

// ─────────────────────────────────────────────
// Case 2: Promise.all fails fast
// ─────────────────────────────────────────────
async function case2() {
  try {
    const result = await Promise.all([
      fakeTask("A", 50),
      fakeTask("B", 20, true),
      fakeTask("C", 70),
    ]);

    console.log("[2]", result);
  } catch (error) {
    console.log("[2] catch:", error.message);
  }
}

// ─────────────────────────────────────────────
// Case 3: Promise.allSettled keeps all results
// ─────────────────────────────────────────────
async function case3() {
  const result = await Promise.allSettled([
    fakeTask("A", 30),
    fakeTask("B", 20, true),
    fakeTask("C", 40),
  ]);

  console.log("[3]", result);
}

// ─────────────────────────────────────────────
// Case 4: Promise.race
// ─────────────────────────────────────────────
async function case4() {
  try {
    const result = await Promise.race([
      fakeTask("slow", 80),
      fakeTask("fast", 20),
    ]);

    console.log("[4]", result);
  } catch (error) {
    console.log("[4] catch:", error.message);
  }
}

// ─────────────────────────────────────────────
// Case 5: Promise.any ignores rejections
// until all promises fail
// ─────────────────────────────────────────────
async function case5() {
  try {
    const result = await Promise.any([
      fakeTask("A", 20, true),
      fakeTask("B", 40, true),
      fakeTask("C", 50),
    ]);

    console.log("[5]", result);
  } catch (error) {
    console.log("[5] catch:", error.constructor.name);
  }
}

// ─────────────────────────────────────────────
// Case 6: sequential vs parallel time
// ─────────────────────────────────────────────
async function case6() {
  console.time("[6] sequential");
  await fakeTask("A", 70);
  await fakeTask("B", 70);
  console.timeEnd("[6] sequential");

  console.time("[6] parallel");
  await Promise.all([fakeTask("A", 70), fakeTask("B", 70)]);
  console.timeEnd("[6] parallel");
}

const delay = 140;

console.log("========== Case 1 ==========");
void case1();

setTimeout(() => {
  console.log("\n========== Case 2 ==========");
  void case2();
}, delay * 1);

setTimeout(() => {
  console.log("\n========== Case 3 ==========");
  void case3();
}, delay * 2);

setTimeout(() => {
  console.log("\n========== Case 4 ==========");
  void case4();
}, delay * 3);

setTimeout(() => {
  console.log("\n========== Case 5 ==========");
  void case5();
}, delay * 4);

setTimeout(() => {
  console.log("\n========== Case 6 ==========");
  void case6();
}, delay * 5);
