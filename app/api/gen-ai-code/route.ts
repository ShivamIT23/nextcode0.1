import { GenAICode } from "@nextCode/config/AIModel";
import { NextRequest } from "next/server";

export const runtime = "edge"; // Optional: run faster at the edge

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  try {
    const result = await GenAICode.sendMessageStream(prompt);

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          controller.enqueue(new TextEncoder().encode(chunk.text()));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain", // or text/event-stream if needed
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
