import { useState } from "react";
import client from "../api/client";
import useSpeechToText from "../hooks/useSpeechToText";

export default function PracticePage() {
  const [question, setQuestion] = useState("Tell me about a challenging project you handled.");
  const [feedback, setFeedback] = useState(null);
  const { transcript, setTranscript, listening, start, stop } = useSpeechToText();

  const evaluate = async () => {
    const { data } = await client.post("/interview/evaluate", { question, transcript });
    setFeedback(data);
  };

  return (
    <div className="card">
      <h2>AI Interview Practice</h2>
      <textarea value={question} onChange={(e) => setQuestion(e.target.value)} rows={2} />
      <textarea value={transcript} onChange={(e) => setTranscript(e.target.value)} rows={4} placeholder="Your answer transcript" />
      <div className="row">
        <button onClick={start} disabled={listening}>🎤 Start</button>
        <button onClick={stop}>Stop</button>
        <button onClick={evaluate}>Analyze</button>
      </div>
      {feedback && <pre>{JSON.stringify(feedback, null, 2)}</pre>}
    </div>
  );
}
