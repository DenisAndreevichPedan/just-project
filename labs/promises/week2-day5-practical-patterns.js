// ============================================================
// Week 2 Day 5 — Practical async patterns
// Запуск: node labs/promises/week2-day5-practical-patterns.js
// ============================================================

function fakeRequest({ ms, shouldFail = false, data }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("request failed"));
        return;
      }

      resolve(data);
    }, ms);
  });
}

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error(`timeout after ${ms}ms`)), ms);
    }),
  ]);
}

async function toResult(promise) {
  try {
    const data = await promise;
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

// ─────────────────────────────────────────────
// Case 1: try/catch/finally with return
// ─────────────────────────────────────────────
async function case1() {
  try {
    console.log("[1] try");
    return "value from try";
  } catch (error) {
    console.log("[1] catch", error);
    return "value from catch";
  } finally {
    console.log("[1] finally");
  }
}

// ─────────────────────────────────────────────
// Case 2: timeout wrapper
// ─────────────────────────────────────────────
async function case2() {
  try {
    const result = await withTimeout(
      fakeRequest({ ms: 120, data: "slow response" }),
      60,
    );

    console.log("[2]", result);
  } catch (error) {
    console.log("[2] catch:", error.message);
  }
}

// ─────────────────────────────────────────────
// Case 3: explicit result object
// ─────────────────────────────────────────────
async function case3() {
  const success = await toResult(fakeRequest({ ms: 20, data: { id: 1 } }));
  const failure = await toResult(fakeRequest({ ms: 20, shouldFail: true }));

  console.log("[3] success:", success);
  console.log("[3] failure:", failure);
}

// ─────────────────────────────────────────────
// Case 4: cleanup in finally
// ─────────────────────────────────────────────
async function case4() {
  let loading = true;

  try {
    console.log("[4] loading =", loading);
    await fakeRequest({ ms: 20, shouldFail: true });
  } catch (error) {
    console.log("[4] catch:", error.message);
  } finally {
    loading = false;
    console.log("[4] loading =", loading);
  }
}

// ─────────────────────────────────────────────
// Case 5: partial failure with allSettled
// ─────────────────────────────────────────────
async function case5() {
  const result = await Promise.allSettled([
    fakeRequest({ ms: 30, data: "profile" }),
    fakeRequest({ ms: 40, shouldFail: true }),
    fakeRequest({ ms: 20, data: "settings" }),
  ]);

  console.log("[5]", result);
}

async function run() {
  console.log("========== Case 1 ==========");
  const value = await case1();
  console.log("[1] result:", value);

  console.log("\n========== Case 2 ==========");
  await case2();

  console.log("\n========== Case 3 ==========");
  await case3();

  console.log("\n========== Case 4 ==========");
  await case4();

  console.log("\n========== Case 5 ==========");
  await case5();
}

void run();
