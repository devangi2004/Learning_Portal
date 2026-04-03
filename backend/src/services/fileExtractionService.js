import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export const extractText = async (file) => {
  const type = file.originalname.split(".").pop().toLowerCase();

  if (type === "txt") {
    return { type, text: file.buffer.toString("utf-8") };
  }

  if (type === "pdf") {
    const parsed = await pdfParse(file.buffer);
    return { type, text: parsed.text };
  }

  if (type === "docx") {
    const parsed = await mammoth.extractRawText({ buffer: file.buffer });
    return { type, text: parsed.value };
  }

  throw new Error("Unsupported file type. Use PDF, DOCX, or TXT.");
};
