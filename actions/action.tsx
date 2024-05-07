'use server'

import { increaseApiLimit } from '@/lib/apiLimit';
import { openai } from '@ai-sdk/openai';
import { CoreMessage, streamText } from 'ai';
import { createStreamableValue } from 'ai/rsc';

const instructionMessage: CoreMessage = {
    role: "user",
    content: `You are an experienced programming assistant bot. 
            Your answers should be formatted in beautiful markdown style. 
            Also, please provide explanation of the code you generate.`
}

export async function continueConversation(messages: CoreMessage[]) {


    const result = await streamText({
        model: openai('gpt-4-turbo'),
        maxTokens: 512,
        messages: [instructionMessage, ...messages]
    })

    await increaseApiLimit();

    const stream = createStreamableValue(result.textStream)
    return stream.value
}

export async function continueConversationGeneral(messages: CoreMessage[]) {


    const result = await streamText({
        model: openai('gpt-4-turbo'),
        maxTokens: 512,
        messages
    })

    await increaseApiLimit();

    const stream = createStreamableValue(result.textStream)
    return stream.value
}