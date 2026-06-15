// ============================================================
// Week 5 — Closures: memory, counters, var loop, stale closure
// Запуск: node labs/closures/week5-closures.js
// ============================================================

// Перед запуском:
// 1. Для каждого case выпиши прогноз вывода.
// 2. Запусти файл.
// 3. Сравни прогноз с фактом.
// 4. Объясни результат своими словами.

// ─────────────────────────────────────────────
// Case 1: function remembers a variable
// ─────────────────────────────────────────────
function case1_rememberVariable() {
  function createMessagePrinter(name) {
    const message = "Hello, " + name;

    return function printMessage() {
      console.log("[1]", message);
    };
  }

  const printForAlex = createMessagePrinter("Alex");
  const printForSam = createMessagePrinter("Sam");

  printForAlex();
  printForSam();
}

// ─────────────────────────────────────────────
// Case 2: counter through closure
// ─────────────────────────────────────────────
function case2_counter() {
  function createCounter(label) {
    let count = 0;

    return function increment() {
      count += 1;
      console.log("[2]", label, count);
    };
  }

  const likesCounter = createCounter("likes");
  const viewsCounter = createCounter("views");

  likesCounter();
  likesCounter();
  viewsCounter();
  likesCounter();
}

// ─────────────────────────────────────────────
// Case 3: var in a loop — all functions share one variable
// ─────────────────────────────────────────────
function case3_varLoopProblem() {
  const handlers = [];

  for (var i = 0; i < 3; i += 1) {
    handlers.push(function printIndex() {
      console.log("[3] var i =", i);
    });
  }

  handlers[0]();
  handlers[1]();
  handlers[2]();
}

// ─────────────────────────────────────────────
// Case 4: stale closure — function uses an old prepared value
// ─────────────────────────────────────────────
function case4_staleClosure() {
  function createTicketStats() {
    let createdTickets = 0;
    const message = "Created tickets: " + createdTickets;

    return {
      createTicket() {
        createdTickets += 1;
        console.log("[4] ticket created");
      },
      printStats() {
        console.log("[4]", message);
      },
      printFreshStats() {
        console.log("[4] Created tickets:", createdTickets);
      },
    };
  }

  const stats = createTicketStats();

  stats.createTicket();
  stats.createTicket();
  stats.printStats();
  stats.printFreshStats();
}

console.log("========== Case 1: function remembers variable ==========");
case1_rememberVariable();

console.log("\n========== Case 2: counter through closure ==========");
case2_counter();

console.log("\n========== Case 3: var loop problem ==========");
case3_varLoopProblem();

console.log("\n========== Case 4: stale closure ==========");
case4_staleClosure();

console.log("\n========== Done ==========");
