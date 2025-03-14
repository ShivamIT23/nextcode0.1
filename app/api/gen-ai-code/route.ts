import { GenAICode } from "@nextCode/config/AIModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  try {
    const result = await GenAICode.sendMessage(prompt);
    const response = result.response.text();
    return NextResponse.json(JSON.parse(response));
  } catch (err) {
    return NextResponse.json(err);
  }
}
