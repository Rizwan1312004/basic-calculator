import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [btnValue1, setBtnValue1] = useState("");
  const [operator, setOperator] = useState("");
  function handleOnclick(value) {
    if (["+", "-", "*", "/"].includes(value)) {
      if (input !== "") {
        setBtnValue1(input);
        setOperator(value);
        setInput("");
      }
    } else if (value === "=") {
      if (btnValue1 !== "" && operator !== "" && input !== "") {
        const result = calculate(Number(btnValue1), Number(input), operator);
        setInput(String(result));
        setBtnValue1("");
        setOperator("");
      }
    } else {
      setInput((n) => n + value);
    }
  }

  function calculate(a, b, op) {
    if (op === "+") {
      return a + b;
    } else if (op === "-") {
      return a - b;
    } else if (op === "*") {
      return a * b;
    } else if (op === "/") {
      return b !== 0 ? a / b : "Error";
    } else {
      return "";
    }
  }

  function handleClear(value) {
    if (value === "C") {
      setBtnValue1("");
      setOperator("");
      setInput("");
    }
  }

  function handleBack(value) {
    if (value === "B") {
      setInput((n) => n.slice(0, -1));
    }
  }

  return (
    <div className="App">
      <Input btnValue={input} op={operator} />
      <Button
        handleOnclick={handleOnclick}
        handleClear={handleClear}
        handleBack={handleBack}
      />
    </div>
  );
}

function Input({ btnValue, op }) {
  return (
    <input
      value={btnValue || ""}
      type="text"
      placeholder={`${
        op === "+"
          ? "+"
          : op === "-"
          ? "-"
          : op === "*"
          ? "*"
          : op === "/"
          ? "/"
          : "0"
      }`}
      readOnly
    />
  );
}

function Button({ handleOnclick, handleClear, handleBack }) {
  const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const calArr = ["+", "-", "*", "/", "="];
  const clear = "C";
  const back = "B";

  return (
    <>
      <div class="bottom-buttons">
        <div className="back" onClick={() => handleBack(back)}>
          B
        </div>
        <div className="clear" onClick={() => handleClear(clear)}>
          C
        </div>
      </div>
      <div className="button-grid">
        {numArr.map((btn) => (
          <Items handleOnclick={handleOnclick} label={btn} key={btn} />
        ))}
        {calArr.map((btn) => (
          <Items
            label={btn}
            key={btn}
            handleOnclick={handleOnclick}
            special={btn === "="}
          />
        ))}
      </div>
    </>
  );
}

function Items({ label, handleOnclick, special }) {
  return (
    <div
      className={`btn ${special ? "equal" : ""}`}
      onClick={() => handleOnclick(label)}
    >
      {label}
    </div>
  );
}

export default App;
