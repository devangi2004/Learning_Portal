import { useState } from "react";
import client from "../api/client";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const upload = async () => {
    if (!file) return;
    const form = new FormData();
    form.append("note", file);
    form.append("title", file.name);
    await client.post("/notes/upload", form);
    setMessage("Uploaded successfully.");
  };

  return (
    <div className="card">
      <h2>Upload Notes</h2>
      <input type="file" accept=".pdf,.docx,.txt" onChange={(e) => setFile(e.target.files?.[0])} />
      <button onClick={upload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
}
