import { extractedText } from "./extractedText";

export function compressForAI(rawText: string): string {
  const lines = rawText
    .split("\n")
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  const keywordPattern =
    /%|due|date|exam|test|assignment|weight|assessment|admission|semester|practical|project|aleks|online|attendance|class.?work|lecturer|office|email|consultation|recess|opportunity|paper|duration|venue/i;

  const datePattern =
    /\b\d{1,2}\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+\d{4}\b/i;

  const relevant = lines.filter(
    (line) => keywordPattern.test(line) || datePattern.test(line),
  );

  // Drop obvious boilerplate/noise lines even if they matched a keyword
  // (adjust this list once you see real OCR output — page footers etc.
  // often accidentally contain words like "office" or "date printed").
  const noisePattern = /^(page \d+|©|confidential|printed on|nwu\b.*\d{4})/i;
  const cleaned = relevant.filter((line) => !noisePattern.test(line));

  // Dedupe consecutive identical lines (common OCR artifact)
  const deduped = cleaned.filter(
    (line, i) => i === 0 || line !== cleaned[i - 1],
  );

  return deduped.join("\n");
}

console.log(compressForAI(extractedText));
