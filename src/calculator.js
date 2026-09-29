#!/usr/bin/env node

// Operações suportadas: adição (+), subtração (-), multiplicação (*) e divisão (/).
function calculate(firstValue, operator, secondValue) {
  const firstNumber = Number(firstValue);
  const secondNumber = Number(secondValue);

  if (
    firstValue.trim() === "" ||
    secondValue.trim() === "" ||
    !Number.isFinite(firstNumber) ||
    !Number.isFinite(secondNumber)
  ) {
    throw new Error("Informe dois números válidos.");
  }

  switch (operator) {
    case "+":
      return firstNumber + secondNumber;
    case "-":
      return firstNumber - secondNumber;
    case "*":
      return firstNumber * secondNumber;
    case "/":
      if (secondNumber === 0) {
        throw new Error("Não é possível dividir por zero.");
      }
      return firstNumber / secondNumber;
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

module.exports = { calculate };
