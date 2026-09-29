const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const path = require("node:path");
const test = require("node:test");

const {
  addition,
  subtraction,
  multiplication,
  division,
  calculate,
} = require("../calculator.js");
const calculatorPath = path.join(__dirname, "..", "calculator.js");

test("addition function adds two values", () => {
  assert.equal(addition("2", "3"), 5);
});

test("subtraction function subtracts the second value from the first", () => {
  assert.equal(subtraction("10", "4"), 6);
});

test("multiplication function multiplies two values", () => {
  assert.equal(multiplication("45", "2"), 90);
});

test("division function divides the first value by the second", () => {
  assert.equal(division("20", "5"), 4);
});

test("division function rejects division by zero", () => {
  assert.throws(() => division("20", "0"), {
    message: "Não é possível dividir por zero.",
  });
});

test("addition: example from the image (2 + 3)", () => {
  assert.equal(calculate("2", "+", "3"), 5);
});

test("addition: supports negative and decimal numbers", () => {
  assert.equal(calculate("-2", "+", "0.5"), -1.5);
});

test("subtraction: example from the image (10 - 4)", () => {
  assert.equal(calculate("10", "-", "4"), 6);
});

test("subtraction: supports negative results", () => {
  assert.equal(calculate("4", "-", "10"), -6);
});

test("multiplication: example from the image (45 * 2)", () => {
  assert.equal(calculate("45", "*", "2"), 90);
});

test("multiplication: supports negative and decimal numbers", () => {
  assert.equal(calculate("-1.5", "*", "2"), -3);
});

test("division: example from the image (20 / 5)", () => {
  assert.equal(calculate("20", "/", "5"), 4);
});

test("division: supports fractional results", () => {
  assert.equal(calculate("7", "/", "2"), 3.5);
});

test("division: rejects division by zero", () => {
  assert.throws(
    () => calculate("20", "/", "0"),
    { message: "Não é possível dividir por zero." },
  );
});

test("validation: rejects empty values", () => {
  assert.throws(() => calculate("", "+", "2"), {
    message: "Informe dois números válidos.",
  });
  assert.throws(() => calculate("2", "+", " "), {
    message: "Informe dois números válidos.",
  });
});

test("validation: rejects non-numeric and non-finite values", () => {
  for (const value of ["abc", "Infinity", "-Infinity", "NaN"]) {
    assert.throws(() => calculate(value, "+", "2"), {
      message: "Informe dois números válidos.",
    });
  }
});

test("validation: rejects unsupported operators", () => {
  assert.throws(() => calculate("2", "%", "3"), {
    message: "Operador inválido. Use +, -, * ou /.",
  });
});

test("CLI: prints the calculation result", () => {
  const result = spawnSync(
    process.execPath,
    [calculatorPath, "2", "+", "3"],
    { encoding: "utf8" },
  );

  assert.equal(result.status, 0);
  assert.equal(result.stdout.trim(), "5");
  assert.equal(result.stderr, "");
});

test("CLI: prints usage for --help and -h", () => {
  for (const option of ["--help", "-h"]) {
    const result = spawnSync(process.execPath, [calculatorPath, option], {
      encoding: "utf8",
    });

    assert.equal(result.status, 0);
    assert.match(result.stdout, /Operadores: \+ \(adição\)/);
    assert.equal(result.stderr, "");
  }
});

test("CLI: reports an error for missing arguments", () => {
  const result = spawnSync(process.execPath, [calculatorPath, "2", "+"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 1);
  assert.match(result.stdout, /Uso:/);
});

test("CLI: reports calculation errors and exits unsuccessfully", () => {
  const result = spawnSync(
    process.execPath,
    [calculatorPath, "20", "/", "0"],
    { encoding: "utf8" },
  );

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Não é possível dividir por zero/);
});
