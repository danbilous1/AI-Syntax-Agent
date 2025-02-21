import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// we will have input component in future, that i will import here

import "./App.css";

function App() {
  const [inputs, setInputs] = useState([
    { id: 1, label: "1.", value: "" },
    { id: 2, label: "2.", value: "" },
    { id: 3, label: "3.", value: "" },
  ]);

  // Function to determine the correct suffix
  const getOrdinalPlaceholder = (num) => {
    if (num % 100 >= 11 && num % 100 <= 13) return `${num}th Step`;
    const lastDigit = num % 10;
    switch (lastDigit) {
      case 1:
        return `${num}st Step`;
      case 2:
        return `${num}nd Step`;
      case 3:
        return `${num}rd Step`;
      default:
        return `${num}th Step`;
    }
  };

  // Function to handle input changes
  const handleChange = (id, newValue) => {
    setInputs(
      inputs.map((input) =>
        input.id === id ? { ...input, value: newValue } : input
      )
    );
  };
  
  
  return (
    <div>
      <Input label="Your idea" id="idea" placeholder="Your coding Idea" />
      <Input label="Your code(Optional)" id="code" placeholder="Your code" />
      <h6>Your Solving Plan:</h6>
      <div className="inputs-container">
        <Input label="1." id="1" flex="false" />
        <Input label="2." id="2" flex="false" />
        <Input label="3." id="3" flex="false" />
      </div>
      <div className="d-flex justify-content-between mt-2">
        <button className="btn btn-light" onClick={addInput}>
          +
        </button>
        <button className="btn btn-primary" onClick={() => {}}>
          Solve with AI
        </button>
      </div>
    </div>
  );
}

export default App;
