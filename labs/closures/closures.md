# Неделя 5 — заметка: closures

Краткий конспект для критерия «можешь объяснить устно и письменно».

## 1. Что такое closure

Closure — это ситуация, когда функция помнит переменные из внешней области видимости даже после того, как внешняя функция уже завершилась.

Простой пример:

```js
function makeGreeter(name) {
  return function greet() {
    console.log("Hello, " + name);
  };
}

const greetAnna = makeGreeter("Anna");
greetAnna(); // Hello, Anna
```

`makeGreeter` уже закончилась, но `greet` всё ещё помнит `name`.

## 2. Почему это полезно

Closure позволяет хранить приватное состояние без глобальных переменных.

Например, счётчик:

```js
function createCounter() {
  let count = 0;

  return function increment() {
    count += 1;
    return count;
  };
}

const counter = createCounter();
counter(); // 1
counter(); // 2
```

Переменная `count` не лежит в глобальной области. Её видит только функция `increment`.

## 3. Проблема с `var` в цикле

`var` имеет function scope, а не block scope. Это значит, что в цикле все функции могут смотреть на одну и ту же переменную.

```js
const handlers = [];

for (var i = 0; i < 3; i += 1) {
  handlers.push(function () {
    console.log(i);
  });
}

handlers[0](); // 3
handlers[1](); // 3
handlers[2](); // 3
```

Функции не сохранили отдельные значения `0`, `1`, `2`. Они все смотрят на одну переменную `i`, которая после цикла стала равна `3`.

С `let` поведение другое: на каждой итерации создаётся новая привязка переменной.

```js
const handlers = [];

for (let i = 0; i < 3; i += 1) {
  handlers.push(function () {
    console.log(i);
  });
}

handlers[0](); // 0
handlers[1](); // 1
handlers[2](); // 2
```

## 4. Stale closure

Stale closure — это когда функция помнит старое значение переменной, а ты ожидал, что она увидит новое.

Простой пример:

```js
function createLogger() {
  let count = 0;
  const message = "Count is " + count;

  return {
    increment() {
      count += 1;
    },
    log() {
      console.log(message);
    },
  };
}

const logger = createLogger();
logger.increment();
logger.increment();
logger.log(); // Count is 0
```

`count` изменился, но `message` был собран раньше. `log` печатает старую строку.

## 5. Где это встречается в React

В React stale closure часто появляется, когда callback или effect использует значение из старого render.

Например:

```js
useEffect(() => {
  const id = setInterval(() => {
    console.log(count);
  }, 1000);

  return () => clearInterval(id);
}, []);
```

Если `count` меняется, interval всё равно может печатать старое значение, потому что effect создал callback один раз. Чтобы исправлять такие случаи, нужно понимать зависимости effect, functional updates и `useRef`.

## Чек для AI

Попроси модель:

1. Проверить твоё объяснение closure в 2–3 предложениях.
2. Проверить, правильно ли ты объяснил stale closure.
3. Дать маленькую задачу на counter через closure без решения. Решение — в [`README.md`](./README.md#задача-на-counter-без-gpt).
