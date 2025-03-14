import { chatSession } from "@nextCode/config/AIModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {prompt} = await req.json();

    try{
        const res = await chatSession.sendMessage(prompt)
        const AIres = res.response.text();
        return NextResponse.json({result:AIres})
    }catch(e){
        console.log(e);
        return NextResponse.json({error:e})
    }
}