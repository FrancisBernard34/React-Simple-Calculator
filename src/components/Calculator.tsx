import { useState, useEffect, useCallback } from 'react';
import {
  executeCalculation,
  specialOperations,
  validateNumericInput,
  formatNumber,
  type OperatorType,
} from '../utils/calculatorLogic';
import { Button } from './Button';
import './Calculator.css';

export default function Calculator() {
  const [num, setNum] = useState<string>('0');
  const [sign, setSign] = useState<OperatorType | null>(null);
  const [accumulator, setAccumulator] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [expression, setExpression] = useState<string>('');
  const [isNewNumber, setIsNewNumber] = useState<boolean>(true);

  const handleInput = useCallback(
    (value: string): void => {
      setError(null);
      const val = parseFloat(value);

      try {
        // Numeric input handling
        if (!isNaN(val) || value === '.') {
          if (isNewNumber) {
            const newNum = value === '.' ? '0.' : value;
            setNum(newNum);
            setExpression(sign ? `${expression} ${newNum}` : newNum);
            setIsNewNumber(false);
          } else {
            const newNum = validateNumericInput(num, value);
            setNum(newNum);
            setExpression(sign ? `${expression.slice(0, -num.length)}${newNum}` : newNum);
          }
        } else {
          switch (value) {
            case 'AC':
              setNum('0');
              setAccumulator(0);
              setSign(null);
              setExpression('');
              setIsNewNumber(true);
              break;

            case '=': {
              if (sign && expression.includes(sign)) {
                const currentNum = parseFloat(num);
                const result = executeCalculation(sign, accumulator, String(currentNum));
                if (typeof result === 'string') {
                  setError(result);
                  return;
                }
                const formattedResult = formatNumber(result);
                setNum(formattedResult);
                setExpression(`${expression} = ${formattedResult}`);
                setAccumulator(parseFloat(formattedResult));
                setSign(null);
                setIsNewNumber(true);
              }
              break;
            }

            case '+':
            case '-':
            case 'X':
            case '/': {
              const currentNum = parseFloat(num);
              if (sign && !isNewNumber) {
                // If there's a previous operation, calculate it first
                const result = executeCalculation(sign, accumulator, String(currentNum));
                if (typeof result === 'string') {
                  setError(result);
                  return;
                }
                const formattedResult = formatNumber(result);
                setNum(formattedResult);
                setExpression(`${formattedResult} ${value}`);
                setAccumulator(parseFloat(formattedResult));
              } else {
                setAccumulator(currentNum);
                setExpression(`${num} ${value}`);
              }
              setSign(value);
              setIsNewNumber(true);
              break;
            }

            case '%': {
              const currentNum = parseFloat(num);
              if (currentNum !== 0) {
                const result = specialOperations.percentage(currentNum);
                const formattedResult = formatNumber(result);
                setNum(formattedResult);
                setExpression(`${currentNum}% = ${formattedResult}`);
                setAccumulator(parseFloat(formattedResult));
                setIsNewNumber(true);
              }
              break;
            }

            case 'π': {
              const piValue = specialOperations.pi(0) as number;
              const formattedPi = formatNumber(piValue);

              if (sign && !isNewNumber) {
                const result = executeCalculation(sign, accumulator, formattedPi);
                if (typeof result === 'string') {
                  setError(result);
                  return;
                }
                const formattedResult = formatNumber(result);
                setNum(formattedResult);
                setExpression(`${expression} ${formattedPi} = ${formattedResult}`);
                setAccumulator(parseFloat(formattedResult));
                setSign(null);
                setIsNewNumber(true);
              } else if (sign) {
                setNum(formattedPi);
                setExpression(`${expression} ${formattedPi}`);
                setIsNewNumber(false);
              } else {
                // No operation in progress, just use Pi as the current value
                setNum(formattedPi);
                setExpression(`π = ${formattedPi}`);
                setAccumulator(piValue);
                setIsNewNumber(true);
              }
              break;
            }

            case 'sqrt': {
              const currentNum = parseFloat(num);
              if (currentNum !== 0) {
                const sqrtResult = specialOperations.sqrt(currentNum);
                if (typeof sqrtResult === 'string') {
                  setError(sqrtResult);
                  return;
                }
                const formattedResult = formatNumber(sqrtResult);
                setNum(formattedResult);
                setExpression(`√(${currentNum}) = ${formattedResult}`);
                setAccumulator(parseFloat(formattedResult));
                setIsNewNumber(true);
              }
              break;
            }
          }
        }
      } catch (err) {
        setError('An error occurred');
        console.error('Calculator error:', err);
      }
    },
    [num, sign, accumulator, expression, isNewNumber]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
      const operatorKeys = new Map([
        ['+', '+'],
        ['-', '-'],
        ['*', 'X'],
        ['/', '/'],
        ['enter', '='],
        ['=', '='],
        ['escape', 'AC'],
        ['p', 'π'],
        ['%', '%'],
        ['s', 'sqrt'],
      ]);

      if (validKeys.includes(key)) {
        handleInput(key);
      } else if (operatorKeys.has(key)) {
        const mappedKey = operatorKeys.get(key);
        if (mappedKey) {
          handleInput(mappedKey);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInput]);

  return (
    <div className="container" role="application" aria-label="Calculator">
      <div className="display" role="region" aria-live="polite" aria-atomic="true">
        <div className="expression" aria-label={`Expression: ${expression || num}`}>
          {expression || num}
        </div>
        <h1 aria-label={`Current value: ${num}`}>{num}</h1>
        {error && (
          <div className="error-message" role="alert" aria-live="assertive">
            {error}
          </div>
        )}
      </div>
      <div className="buttons" role="group" aria-label="Calculator buttons">
        <Button value="AC" onClick={handleInput} />
        <Button value="π" onClick={handleInput} />
        <Button value="%" onClick={handleInput} />
        <Button value="/" onClick={handleInput} />
        <Button value="7" onClick={handleInput} />
        <Button value="8" onClick={handleInput} />
        <Button value="9" onClick={handleInput} />
        <Button value="X" onClick={handleInput} />
        <Button value="4" onClick={handleInput} />
        <Button value="5" onClick={handleInput} />
        <Button value="6" onClick={handleInput} />
        <Button value="-" onClick={handleInput} />
        <Button value="1" onClick={handleInput} />
        <Button value="2" onClick={handleInput} />
        <Button value="3" onClick={handleInput} />
        <Button value="+" onClick={handleInput} />
        <Button value="0" onClick={handleInput} />
        <Button value="." onClick={handleInput} />
        <Button value="sqrt" onClick={handleInput} />
        <Button value="=" onClick={handleInput} />
      </div>
    </div>
  );
}
