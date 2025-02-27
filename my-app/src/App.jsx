import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Input from "./components/Input";
import "./App.css";

function App() {
  const [inputs, setInputs] = useState([
    { id: 1, label: "1.", value: "" },
    { id: 2, label: "2.", value: "" },
    { id: 3, label: "3.", value: "" },
  ]);

  // Function to determine the correct place
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

  // Function to add a new input
  const addInput = () => {
    const newId =
      inputs.length > 0 ? Math.max(...inputs.map((i) => i.id)) + 1 : 1;
    setInputs([...inputs, { id: newId, label: `${newId}.`, value: "" }]);
  };

  // Function to delete an inputs
  const handleDeleteInput = (id) => {
    setInputs(
      (prevInputs) =>
        prevInputs
          .filter((input) => input.id !== id)
          .map((input, index) => ({
            ...input,
            id: index + 1,
            label: `${index + 1}.`,
          })) // Renumbering
    );
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
    <div className="container mt-4 g-4">
      <h4 className="mb-3">AI Syntax Agent</h4>
      <div className="row g-3">
        <div>
          <Input
            label="Your Idea"
            id="idea"
            placeholder="Your coding idea"
            onChange={handleChange}
          />
          <Input
            label="Your Code (Optional)"
            id="code"
            placeholder="Your code (Optional)"
            onChange={handleChange}
          />
        </div>

        <div>
          <h6 className="mt-3">Your Solving Plan:</h6>
          <div className="inputs-container">
            {inputs.map((input) => (
              <Input
                key={input.id}
                label={input.label}
                id={input.id}
                placeholder={getOrdinalPlaceholder(input.id)}
                value={input.value}
                onChange={handleChange}
                onDelete={handleDeleteInput}
                isPlanInput={true}
              />
            ))}
          </div>
        </div>
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
