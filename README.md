# React Simple Calculator

![Overview](https://i.ibb.co/931TyBJS/image.png)

## Overview

In today's digital world, having reliable calculation tools that are accessible and user-friendly is essential. While there are many calculator applications available, finding one that combines simplicity with advanced features can be challenging.

This React Simple Calculator addresses this need by providing a clean, responsive calculator with both basic and advanced mathematical operations in an accessible interface.

## Features

- **Basic Arithmetic Operations**: Addition, subtraction, multiplication, and division
- **Special Operations**: Percentage calculation, Pi constant, and square root
- **Error Handling**: Robust validation to prevent calculation errors
- **Keyboard Support**: Use your keyboard for faster input
- **Accessibility**: ARIA attributes and keyboard navigation for all users
- **Responsive Design**: Works on devices of all sizes

## Technical Implementation

Facing the challenge of creating a calculator with both simplicity and functionality, I approached the development with these strategies:

- **React & TypeScript**: Built with React and TypeScript for type safety and component reusability
- **Modular Architecture**: Separated calculator logic from UI components
- **Custom Hooks**: Implemented React hooks for state management
- **Error Handling**: Added comprehensive error validation to ensure reliable calculations
- **Accessibility**: Incorporated ARIA attributes and keyboard navigation
- **Responsive Design**: Created a mobile-friendly interface that works across devices

### Key Components

- `Calculator.tsx`: Main component handling state and user interactions
- `Button.tsx`: Reusable button component with accessibility features
- `calculatorLogic.ts`: Pure logic functions separated from UI for better testing and maintenance

## How to Use

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/React-Simple-Calculator.git

# Navigate to project directory
cd React-Simple-Calculator

# Install dependencies
npm install

# Start the application
npm start
```

### Usage

- Use the calculator interface to perform calculations
- Special keys:
  - `AC`: Clear all values
  - `π`: Pi constant (3.14159...)
  - `%`: Calculate percentages
  - `sqrt`: Calculate square roots
- Keyboard shortcuts:
  - Number keys: 0-9
  - Operators: +, -, \*, /
  - Enter or =: Calculate result
  - Escape: Clear all
  - p: Pi constant
  - s: Square root
  - %: Percentage

## Results and Learnings

This calculator represents a successful implementation of a React application that balances simplicity with functionality. The modular approach to development allowed for:

- Clean separation of concerns between UI and logic
- Highly testable and maintainable code
- Accessible interface for all users
- Robust error handling to prevent unexpected behavior

Through this project, I demonstrated:

- Strong React component architecture
- TypeScript implementation for type safety
- Attention to accessibility needs
- Clean, maintainable code organization

_This project was created as a demonstration of React and TypeScript capabilities in building accessible, user-friendly web applications._
