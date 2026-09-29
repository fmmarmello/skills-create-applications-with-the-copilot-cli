#!/usr/bin/env node

// Operações suportadas: adição (+), subtração (-), multiplicação (*) e divisão (/).
function parseOperands(firstValue, secondValue) {
  const firstNumber = parseOperand(firstValue);
  const secondNumber = parseOperand(secondValue);
  return [firstNumber, secondNumber];
}

function parseOperand(value) {
  if (
    (typeof value !== "string" && typeof value !== "number") ||
    (typeof value === "string" && value.trim() === "")
  ) {
    throw new Error("Informe dois números válidos.");
  }

  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error("Informe dois números válidos.");
  }
  return number;
}

function addition(firstValue, secondValue) {
  const [firstNumber, secondNumber] = parseOperands(firstValue, secondValue);
  return firstNumber + secondNumber;
}

function subtraction(firstValue, secondValue) {
  const [firstNumber, secondNumber] = parseOperands(firstValue, secondValue);
  return firstNumber - secondNumber;
}

function multiplication(firstValue, secondValue) {
  const [firstNumber, secondNumber] = parseOperands(firstValue, secondValue);
  return firstNumber * secondNumber;
}

function division(firstValue, secondValue) {
  const [firstNumber, secondNumber] = parseOperands(firstValue, secondValue);
  if (secondNumber === 0) {
    throw new Error("Não é possível dividir por zero.");
  }
  return firstNumber / secondNumber;
}

function calculate(firstValue, operator, secondValue) {
  parseOperands(firstValue, secondValue);

  switch (operator) {
    case "+":
      return addition(firstValue, secondValue);
    case "-":
      return subtraction(firstValue, secondValue);
    case "*":
      return multiplication(firstValue, secondValue);
    case "/":
      return division(firstValue, secondValue);
    default:
      throw new Error("Operador inválido. Use +, -, * ou /.");
  }
}

function printUsage() {
  console.log("Uso: node src/calculator.js <número> <operador> <número>");
  console.log("Operadores: + (adição), - (subtração), * (multiplicação), / (divisão)");
  console.log('Exemplo: node src/calculator.js 10 "+" 5');
}

function main(args) {
  if (args.length === 1 && (args[0] === "--help" || args[0] === "-h")) {
    printUsage();
    return;
  }

  if (args.length !== 3) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  try {
    console.log(calculate(args[0], args[1], args[2]));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main(process.argv.slice(2));
}

module.exports = { addition, subtraction, multiplication, division, calculate };
