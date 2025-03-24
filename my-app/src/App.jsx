import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Input from "./components/Input";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./App.css";

function App() {
  const GEMINI_API_KEY = "your_gemini_api_key_here"; // Replace with your actual Gemini API key

  const [inputs, setInputs] = useState([
    { id: 1, label: "1.", value: "" },
    { id: 2, label: "2.", value: "" },
    { id: 3, label: "3.", value: "" },
  ]);
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");

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

  const addInput = () => {
    const newId =
      inputs.length > 0 ? Math.max(...inputs.map((i) => i.id)) + 1 : 1;
    setInputs([...inputs, { id: newId, label: `${newId}.`, value: "" }]);
  };

  const handleDeleteInput = (id) => {
    setInputs(
      (prevInputs) =>
        prevInputs
          .filter((input) => input.id !== id)
          .map((input, index) => ({
            ...input,
            id: index + 1,
            label: `${index + 1}.`,
          }))
    );
  };

  const handleChange = (id, newValue) => {
    setInputs(
      inputs.map((input) =>
        input.id === id ? { ...input, value: newValue } : input
      )
    );
  };

  const handleLanguageChange = (id, newValue) => {
    setLanguage(newValue);
  };

  const generateContent = async () => {
    const idea = document.getElementById("idea").value;
    const code = document.getElementById("code").value;
    const planSteps = inputs
      .map((input) => input.value)
      .filter((value) => value.trim() !== "");

    const prompt = `I have a coding idea: ${idea}. Here is some optional code: ${code}. My solving plan is: ${planSteps.join(
      ", "
    )}. Please provide a code solution in ${language} with short explanations in comments.`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
      setOutput(generatedText);
    } catch (error) {
      console.error("Error fetching data:", error);
      setOutput("An error occurred while generating the solution.");
    }
  };

  return (
    <div className="container mt-4 g-4" style={{ maxWidth: "800px" }}>
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
          <Input
            label="Programming Language"
            id="language"
            placeholder="e.g., JavaScript, Python"
            value={language}
            onChange={handleLanguageChange}
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
        <button className="btn btn-primary" onClick={generateContent}>
          Solve with AI
        </button>
      </div>

      {output && (
        <div className="mt-4">
          <h5>Generated Solution:</h5>
          <SyntaxHighlighter
            language={language.toLowerCase()}
            style={darcula}
            wrapLines={true}
            customStyle={{ maxWidth: "100%", overflowX: "auto" }}
          >
            {output}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
}

export default App;
