// Type definitions
export type OperatorType = '+' | '-' | 'X' | '/';
type Operation = (a: number, b: number) => number;
type SpecialOperation = (a: number) => number | string;

interface Operations {
  add: Operation;
  subtract: Operation;
  multiply: Operation;
  divide: Operation;
}

interface SpecialOperations {
  percentage: SpecialOperation;
  pi: SpecialOperation;
  sqrt: SpecialOperation;
}

// Basic arithmetic operations with error handling
const operations: Operations = {
  add: (a: number, b: number) => {
    const result = a + b;
    return Number.isFinite(result) ? result : NaN;
  },
  subtract: (a: number, b: number) => {
    const result = a - b;
    return Number.isFinite(result) ? result : NaN;
  },
  multiply: (a: number, b: number) => {
    const result = a * b;
    return Number.isFinite(result) ? result : NaN;
  },
  divide: (a: number, b: number) => {
    if (b === 0) return NaN;
    const result = a / b;
    return Number.isFinite(result) ? result : NaN;
  },
};

// Special operations with error handling
export const specialOperations: SpecialOperations = {
  percentage: (a: number) => {
    if (!Number.isFinite(a)) return 'Error';
    const result = a / 100;
    return Number.isFinite(result) ? result : 'Error';
  },
  pi: () => Math.PI,
  sqrt: (a: number) => {
    if (a < 0) return 'Error';
    if (!Number.isFinite(a)) return 'Error';
    const result = Math.sqrt(a);
    return Number.isFinite(result) ? result : 'Error';
  },
};

export function validateNumericInput(currentNum: string, input: string): string {
  try {
    if (currentNum === '0' && input !== '.') {
      return input;
    }

    if (input === '.' && currentNum.includes('.')) {
      return currentNum;
    }

    if (currentNum === '0' && input === '.') {
      return '0.';
    }

    if (currentNum.replace('.', '').length >= 16) {
      return currentNum;
    }

    const newNum = currentNum + input;
    return isValidNumber(newNum) ? newNum : currentNum;
  } catch (error) {
    return currentNum;
  }
}

export function formatNumber(num: number | string): string {
  try {
    // Handle error cases
    if (typeof num === 'string') return num;
    if (!Number.isFinite(num)) return 'Error';

    // Handle special cases
    if (Math.abs(num) > 1e16) return 'Error';
    if (Math.abs(num) < 1e-16 && num !== 0) return '0';

    // Format regular numbers
    const formatted = Number(num);
    if (Number.isInteger(formatted)) {
      return formatted.toString();
    }

    // Handle decimal numbers
    const decimalString = formatted.toFixed(10).replace(/\.?0+$/, '');
    return decimalString;
  } catch (error) {
    return 'Error';
  }
}

// Helper function to validate numbers
function isValidNumber(str: string): boolean {
  if (str === '.' || str === '-.') return true;
  const num = parseFloat(str);
  return !isNaN(num) && Number.isFinite(num);
}

// Execute calculation with improved error handling
export function executeCalculation(operator: OperatorType, a: number, b: string): number | string {
  try {
    const numB = parseFloat(b);

    // Validate inputs
    if (isNaN(numB) || !Number.isFinite(numB)) return 'Error';
    if (!Number.isFinite(a)) return 'Error';

    // Perform calculation
    switch (operator) {
      case '+':
        return operations.add(a, numB);
      case '-':
        return operations.subtract(a, numB);
      case 'X':
        return operations.multiply(a, numB);
      case '/':
        return operations.divide(a, numB);
      default:
        return 'Error';
    }
  } catch (error) {
    return 'Error';
  }
}
