// ============================================================
// Week 6 — this: regular fn, method, loss, arrow, bind
// Запуск: node labs/this/week6-this.js
// ============================================================

// Перед запуском:
// 1. Для каждого case выпиши прогноз вывода.
// 2. Запусти файл.
// 3. Сравни прогноз с фактом.
// 4. Выполни задачи task1–task3 внизу (раскомментируй вызовы после решения).

"use strict";

// ─────────────────────────────────────────────
// Case 1: this in a regular function (standalone call)
// ─────────────────────────────────────────────
function case1_regularFunction() {
  function showThis(label) {
    console.log("[1]", label, "this ===", this);
  }

  showThis("direct call");
  showThis.call({ name: "forced-context" }, "via call");
}

// ─────────────────────────────────────────────
// Case 2: this in an object method
// ─────────────────────────────────────────────
function case2_objectMethod() {
  const ticketService = {
    prefix: "Ticket:",
    formatTitle(title) {
      return this.prefix + " " + title;
    },
    print(title) {
      console.log("[2]", this.formatTitle(title));
    },
  };

  ticketService.print("Broken login");
}

// ─────────────────────────────────────────────
// Case 3: losing this (detached method + callback)
// ─────────────────────────────────────────────
function case3_lostThis() {
  const ticketService = {
    prefix: "Ticket:",
    print(title) {
      const prefix = this?.prefix ?? "(lost this)";
      console.log("[3]", prefix, title);
    },
  };

  const detached = ticketService.print;
  detached("Detached call");

  setTimeout(ticketService.print, 0, "setTimeout without bind");
}

// ─────────────────────────────────────────────
// Case 4: arrow function vs regular function (lexical this)
// ─────────────────────────────────────────────
function case4_arrowVsRegular() {
  const timer = {
    label: "retry-queue",
    schedule() {
      const arrowLog = () => {
        console.log("[4] arrow sees label:", this.label);
      };

      const regularLog = function () {
        console.log("[4] regular sees label:", this && this.label);
      };

      arrowLog();
      regularLog();
    },
  };

  timer.schedule();
}

// ─────────────────────────────────────────────
// Case 5: bind fixes lost this
// ─────────────────────────────────────────────
function case5_bind() {
  const ticketService = {
    prefix: "Ticket:",
    print(title) {
      console.log("[5]", this.prefix, title);
    },
  };

  const boundPrint = ticketService.print.bind(ticketService);
  boundPrint("Bound call");

  setTimeout(ticketService.print.bind(ticketService), 0, "setTimeout with bind");
}

// ─────────────────────────────────────────────
// Tasks — реши сам, затем раскомментируй вызовы внизу файла
// ─────────────────────────────────────────────

// Task 1: верни функцию, которая при вызове печатает title тикета с префиксом объекта.
// Используй bind (не стрелку как метод объекта).
function task1_createBoundPrinter(ticketService) {
  // TODO: return bound function
  throw new Error("task1: implement createBoundPrinter");
}

// Task 2: оберни метод так, чтобы setTimeout не терял this (wrapper, не bind).
function task2_wrapForTimeout(ticketService) {
  // TODO: return function () { ... } that calls ticketService.print correctly
  throw new Error("task2: implement wrapForTimeout");
}

// Task 3: в объекте counter исправь increment — должен увеличивать count при obj.increment().
// Сейчас increment — стрелка (намеренная ошибка). Замени на обычный метод.
function task3_fixCounter() {
  const counter = {
    count: 0,
    increment: () => {
      this.count += 1;
    },
    getValue() {
      return this.count;
    },
  };

  // TODO: fix increment (method or bind), keep getValue as method
  return counter;
}

function runTasks() {
  const service = {
    prefix: "Task:",
    print(title) {
      console.log(this.prefix, title);
    },
  };

  const t1 = task1_createBoundPrinter(service);
  t1("task1 ok");

  const t2 = task2_wrapForTimeout(service);
  t2("task2 ok");

  const c = task3_fixCounter();
  c.increment();
  c.increment();
  console.log("[task3] count =", c.getValue());
}

console.log("========== Case 1: regular function ==========");
case1_regularFunction();

console.log("\n========== Case 2: object method ==========");
case2_objectMethod();

console.log("\n========== Case 3: lost this ==========");
case3_lostThis();

console.log("\n========== Case 4: arrow vs regular ==========");
case4_arrowVsRegular();

console.log("\n========== Case 5: bind ==========");
case5_bind();

// После решения task1–task3:
// console.log("\n========== Tasks ==========");
// runTasks();

console.log("\n========== Done (cases only; uncomment runTasks when ready) ==========");
