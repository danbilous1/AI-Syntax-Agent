import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// we will have input component in future, that i will import here

import "./App.css";

function App() {
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
