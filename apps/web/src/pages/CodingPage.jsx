import { useState } from "react";
import client from "../api/client";

export default function CodingPage() {
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("// Write your code here");

  const generate = async () => {
    const { data } = await client.post("/coding/problem", { topic: "arrays", difficulty: "medium" });
    setProblem(data);
  };

  return (
    <div className="card">
      <h2>Coding Practice</h2>
      <button onClick={generate}>Generate Problem</button>
      {problem && (
        <>
          <h3>{problem.title}</h3>
          <p>{problem.problem}</p>
          <p><strong>Input/Output:</strong> {problem.inputOutput}</p>
          <p><strong>Constraints:</strong> {problem.constraints}</p>
          <textarea rows={10} value={code} onChange={(e) => setCode(e.target.value)} />
        </>
      )}
    </div>
  );
}
