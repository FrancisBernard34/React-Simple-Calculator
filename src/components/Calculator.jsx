import { useState } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [num, setNum] = useState("0");
  const [sign, setSign] = useState(null);
  const [accumulator, setAccumulator] = useState(0);

  function HandleClick(value) {
    let val = parseFloat(value);
    if (!isNaN(val)) {
      if (num === "0") {
        setNum(value.toString());
      } else {
        setNum(num + value);
      }
    } else {
      switch (value) {
        case "AC":
          setNum("0");
          setAccumulator(0);
          break;
        case "=":
          if (sign == "+") {
            setNum(accumulator + parseFloat(num));
          } else if (sign == "-") {
            setNum(accumulator - parseFloat(num));
          } else if (sign == "X") {
            setNum(accumulator * parseFloat(num));
          } else if (sign == "/") {
            setNum(accumulator / parseFloat(num));
          } else {
            alert("Invalid");
          }
          setAccumulator(0);
          break;
        case "+":
          setAccumulator(accumulator + parseFloat(num));
          setNum("0");
          setSign("+");
          break;
        case "-":
          if (accumulator == 0) {
            setAccumulator(parseFloat(num));
          } else {
            setAccumulator(accumulator - parseFloat(num));
          }
          setNum("0");
          setSign("-");
          break;
        case "X":
          if (accumulator == 0) {
            setAccumulator(parseFloat(num));
          } else {
            setAccumulator(accumulator * parseFloat(num));
          }
          setNum("0");
          setSign("X");
          break;
        case "/":
          if (accumulator == 0) {
            setAccumulator(parseFloat(num));
          } else {
            setAccumulator(accumulator / parseFloat(num));
          }
          setNum("0");
          setSign("/");
          break;
        case "%":
          if (num !== "0") {
            setNum((parseFloat(num) / 100).toFixed(9));
          }
          break;
        case ".":
          if (num !== "0") {
            setNum(num + ".");
          }
          break;
        case "π":
          setNum("3.14");
          break;
        case "sqrt":
          if (num !== "0") {
            setNum(Math.sqrt(num))
          }
          break;
        default:
          console.log("Undefined");
      }
    }
  }

  function Button({ value }) {
    return <button onClick={() => HandleClick(value)}>{value}</button>;
  }

  function DisplayNum() {
    return <h1>{num}</h1>;
  }

  return (
    <div className="Container">
      <div className="Display">
        <DisplayNum />
      </div>
      <div className="Buttons">
        <Button value={"AC"} />
        <Button value={"π"} />
        <Button value={"%"} />
        <Button value={"/"} />
        <Button value={"7"} />
        <Button value={"8"} />
        <Button value={"9"} />
        <Button value={"X"} />
        <Button value={"4"} />
        <Button value={"5"} />
        <Button value={"6"} />
        <Button value={"-"} />
        <Button value={"1"} />
        <Button value={"2"} />
        <Button value={"3"} />
        <Button value={"+"} />
        <Button value={"0"} />
        <Button value={"."} />
        <Button value={"sqrt"} />
        <Button value={"="} />
      </div>
    </div>
  );
}
