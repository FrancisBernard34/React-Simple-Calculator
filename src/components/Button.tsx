interface ButtonProps {
  value: string;
  onClick: (value: string) => void;
}

export const Button = ({ value, onClick }: ButtonProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(value);
    }
  };

  const getAriaLabel = (): string => {
    switch (value) {
      case 'AC':
        return 'Clear all';
      case 'π':
        return 'Pi';
      case '%':
        return 'Percentage';
      case '/':
        return 'Divide';
      case 'X':
        return 'Multiply';
      case '-':
        return 'Subtract';
      case '+':
        return 'Add';
      case '=':
        return 'Equals';
      case 'sqrt':
        return 'Square root';
      default:
        return value;
    }
  };

  return (
    <button
      onClick={() => onClick(value)}
      onKeyDown={handleKeyDown}
      aria-label={getAriaLabel()}
      tabIndex={0}
      role="button"
      className={`calculator-button ${isNaN(Number(value)) ? 'operator' : 'number'}`}
    >
      {value}
    </button>
  );
};
