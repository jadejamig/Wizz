"use client";

import { continueConversation } from '@/actions/action';
import BotAvatar from '@/components/BotAvatar';
import Empty from '@/components/Empty';
import Heading from '@/components/Heading';
import Loader from '@/components/Loader';
import UserAvatar from '@/components/UserAvatar';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import UseProModal from '@/hooks/UseProModal';
import { checkApiLimit } from '@/lib/apiLimit';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { type CoreMessage } from 'ai';
import { readStreamableValue } from 'ai/rsc';
import { Code } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { renderToString } from 'react-dom/server';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { z } from 'zod';
import { formSchema } from './constants';

const CodePage = () => {

    const [messages, setMessages] = useState<CoreMessage[]>([])

    const proModal = UseProModal();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            
            const freeTrial = await checkApiLimit();

            if (!freeTrial) {
                proModal.onOpen();
                return;
            }

            const userMessage: CoreMessage = {
                role: "user",
                content: values.prompt
            };

            const newMessages: CoreMessage[] = [...messages, userMessage];
            setMessages(newMessages);
            
            const result = await continueConversation(newMessages);

            for await (const content of readStreamableValue(result)) {
                setMessages([
                  ...newMessages,
                  {
                    role: 'assistant',
                    content: content as string
                  }
                ])
            }

            form.reset();

        } catch (error: any) {
            toast.error("Something went wrong!");
        } finally {
            router.refresh()
        }
    };

    return (
        <div>
            <Heading
                title='Code Partner'
                description='Generate code using descriptive text.'
                icon={Code}
                iconColor='text-green-700'
                bgColor='bg-green-700/10'

            />
            <div className='px-4 lg:px-8'>
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='rounded-lg border w-full p-4 px-3 md:px-6 
                            focus-within:shadow-sm grid grid-cols-12 gap-2' 
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-10'>
                                        <FormControl className='m-0 p-0'>
                                            <Input 
                                                className='border-0 outline-none focus-visible:ring-0
                                                focus-visible:ring-transparent'
                                                disabled={isLoading}
                                                placeholder='Simple toggle button using react hooks.'
                                                {...field}
                                            >
                                            </Input>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button 
                                className='col-span-12 lg:col-span-2 w-full'
                                disabled={isLoading}
                            >
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className='space-y-4 m-4'>
                    {isLoading && (
                        <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
                            <Loader />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <Empty label='No conversations started.'/>
                    )}
                    <div className='flex flex-col-reverse gap-y-4 pb-4'>
                        {messages.map((message, index) => (
                            <div key={index}
                                className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg",
                                    message.role === "user" ? "bg-white border border-black/10" : "bg-muted"
                                 )}
                            >   
                                { message.role === "user" ? (<UserAvatar />) : (<BotAvatar />) }
                                <ReactMarkdown
                                    components={{
                                        pre: ({children, className, node, ...props}) => (
                                            <div className='overflow-auto w-full rounded-md'>
                                                <pre {...props} className=''>
                                                    <SyntaxHighlighter 
                                                        language="js" 
                                                        style={atomOneDarkReasonable} 
                                                        PreTag="div"
                                                        useInlineStyles
                                                    >
                                                        { new DOMParser().parseFromString(renderToString(children),"text/html").documentElement.textContent as string }
                                                    </SyntaxHighlighter>
                                                </pre>
                                            </div>
                                        ),
                                        code: ({node, ...props}) => (
                                            <code className='bg-black/10 rounded-sm p-1' {...props} />
                                        )
                                    }}

                                     className='text-sm overflow-hidden leading-7 space-y-4'
                                >
                                    { message.content as string | null }
                                </ReactMarkdown>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodePage