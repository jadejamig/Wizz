import { videoFormSchema } from "@/app/ai-tools/(dashboard)/(routes)/video/constants";
import { checkApiLimit, increaseApiLimit } from "@/lib/apiLimit";
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
        
        const validatedFields = videoFormSchema.safeParse(body)

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
            fps: 24,
            width: 1024,
            height: 576,
            prompt: prompt,
            guidance_scale: 17.5,
            negative_prompt: "very blue, dust, noisy, washed out, ugly, distorted, broken"
        };

        const freeTrial = await checkApiLimit();

        if (!freeTrial) {
            return new NextResponse("Free trial has expired.", { status: 403 });
        }
        
        const response = await replicate.run(
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            { input }
        );

        await increaseApiLimit();

        return NextResponse.json(response)

    } catch (error) {
        console.log("[VIDEO_ERROR] ", error )
        return new NextResponse("Internal error", { status: 500});
    }
}