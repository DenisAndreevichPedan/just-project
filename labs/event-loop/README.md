# Week 1 Day 1 — Event Loop: micro/macro tasks

**Среда:** Node v22 / Browser  
**Дата:** 04.03.2026

---

## Таблица наблюдений

| # | Код (кратко) | Мой прогноз | Факт | Совпало? |
|---|---|---|---|---|
| 1 | `sync` → `setTimeout(0)` → `sync` | start → end → setTimeout | start → end → setTimeout | ✅ |
| 2 | `sync` → `Promise.then` → `sync` | start → end → promise | start → end → promise | ✅ |
| 3 | `setTimeout(0)` + `Promise.then` + `sync` | sync → promise → setTimeout | sync → promise → setTimeout | ✅ |
| 4 | `queueMicrotask` + `Promise.then` + `sync` | sync → queueMicrotask → promise | sync → queueMicrotask → promise | ✅ |
| 5 | `async/await` — две async-функции | before → before await → after await → after call | before → before await → after call → after await | ❌ |
| 6 | `Promise` внутри `setTimeout` + внешний `Promise` | sync → outer promise → setTimeout start → setTimeout end → promise inside | sync → outer promise → setTimeout start → setTimeout end → promise inside | ✅ |
| 7 | вложенный `Promise.then` внутри `Promise.then` | sync → promise 1 → promise 2 → setTimeout | sync → promise 1 → promise 2 → setTimeout | ✅ |
| 8 | две `async`-функции вперемешку | start → A до await → B до await → end → A после → B после | start → A до await → B до await → end → A после → B после | ✅ |

---

## Выводы по кейсам

**Case 4** — `queueMicrotask` и `Promise.then` идут в **одну и ту же** очередь микрозадач.
Никакого приоритета между ними нет — просто `queueMicrotask` был зарегистрирован раньше, поэтому выполнился первым.

**Case 5** — ошибся, потому что `await` — это точка **приостановки функции**.
Когда выполнение доходит до `await`, функция прерывается и возвращает управление вызывающему коду.
Поэтому `after asyncWork()` печатается раньше, чем `after await` — управление вернулось наружу,
а продолжение функции встало в очередь микрозадач.

---

## Итоги

**Главное правило №1:**  
Сначала выполняется весь синхронный код текущего стека вызовов — только потом что-либо асинхронное.

**Главное правило №2:**  
После каждого синхронного стека — сначала **вся** очередь микрозадач (Promise, queueMicrotask, await-продолжения), и только потом одна макрозадача (setTimeout, setInterval).

**Где ошибся и почему:**  
Case 5: думал, что async-функция выполняется целиком до возврата. На деле `await` возвращает управление наружу — код после `await` становится микрозадачей. Поэтому `after asyncWork()` напечаталось раньше `after await`.
