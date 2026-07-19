"use server";

import { generateText, ModelMessage } from "ai";

import { gemini } from "@/lib/ai/gemini";
import { openai } from "@/lib/ai/openai";
import { groq } from "@/lib/ai/groq";

import { tools } from "./tools";
import { generateModuleShapePrompt, systemPromt } from "./data";

type Model = "gemini" | "openai" | "groq";

export async function askAI(
  model: Model,
  messages: ModelMessage[],
  compressedText?: string,
) {
  const { text, toolResults, toolCalls } = await generateText({
    model:
      model === "openai"
        ? openai("gpt-4o")
        : model === "gemini"
          ? gemini("gemini-2.0-flash")
          : groq("llama-3.3-70b-versatile"),
    messages: !messages
      ? ([
          {
            role: "system",
            content: generateModuleShapePrompt(compressedText ? compressedText : ""),
          },
        ] as ModelMessage[])
      : messages,
    tools,
    maxOutputTokens: 512,
    instructions: systemPromt,
  });

  return { text, toolResults, toolCalls };
}
