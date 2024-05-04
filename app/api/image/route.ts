import { imageFormSchema } from "@/app/(dashboard)/(routes)/image/constants";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

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

        const { prompt, amount, resolution } = validatedFields.data;



        // if(!openai.apiKey) {
        //     return new NextResponse("OpenAI API Key not configured", { status: 500 });
        // }

        // if(!messages) {
        //     return new NextResponse("Messages are required", { status: 400 });
        // }

        // const response = await openai.chat.completions.create({
        //     model: "gpt-3.5-turbo",
        //     messages: messages,
        // });

        // return NextResponse.json(response.choices[0].message);

    } catch (error) {
        console.log("[IMAGE_ERROR] ", error )
        return new NextResponse("Internal error", { status: 500});
    }
}