import { imageFormSchema } from "@/app/ai-tools/(dashboard)/(routes)/image/constants";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
    try {

        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        
        const body = await req.json();

        const validatedFields = imageFormSchema.safeParse(body)

        if (!validatedFields.success) {
            return new NextResponse("Invalid input fields", { status: 400 });
        }

        const { prompt, amount = "1", resolution = "512x512" } = validatedFields.data;

        const openai = new OpenAI();

        if(!openai.apiKey) {
            return new NextResponse("OpenAI API Key not configured", { status: 500 });
        }

        console.log("generating images.....")
        const response = await openai.images.generate(
            {
                model: "dall-e-2",
                prompt: prompt,
                n: Number.parseInt(amount),
                size: resolution as "256x256" | "512x512" | "1024x1024"
            }
        )

        return NextResponse.json(response.data);

    } catch (error) {
        console.log("[IMAGE_ERROR] ", error )
        return new NextResponse("Internal error", { status: 500});
    }
}