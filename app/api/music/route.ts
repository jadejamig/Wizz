import { musicFormSchema } from "@/app/ai-tools/(dashboard)/(routes)/music/constants";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req: NextRequest) {
    try {
        
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        
        const validatedFields = musicFormSchema.safeParse(body)

        if (!validatedFields.success) {
            return new NextResponse("Invalid input fields", { status: 400 });
        }

        const { prompt } = body;

        if(!process.env.REPLICATE_API_TOKEN) {
            return new NextResponse("Replicate API Key is not configured", { status: 500 });
        }

        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN
        })
        
        const input = {
            prompt: prompt,
            model_version: "stereo-large",
            output_format: "mp3",
            normalization_strategy: "peak"
        };
        
        const response = await replicate.run(
            "meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb",
            { input }
        );

        return NextResponse.json(response)

    } catch (error) {
        console.log("[MUSIC_ERROR] ", error )
        return new NextResponse("Internal error", { status: 500});
    }
}