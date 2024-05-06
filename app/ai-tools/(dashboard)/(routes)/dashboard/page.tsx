"use client";

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import React from 'react'
import { Code, ImageIcon, MessageSquare, MusicIcon, VideoIcon } from "lucide-react";
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className='mb-8 space-y-4'>
        <h2 className='text-2xl md:text-4xl font-bold text-center'>
          Explore the power of AI
        </h2>
        <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>
      <div className='px-4 md:px-20 lg:px-32 space-y-4'>
        {tools_list.map((tool) => (
          <Card key={tool.href}
                className='p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer'
                onClick={() => {router.push(tool.href)}}
          >
                <div className='flex items-center gap-x-4'>
                  <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                    <tool.icon className={cn('w-8 h-8', tool.color)} />
                  </div>
                  <div className='font-semibold'>
                    {tool.label}
                  </div>
                </div>
                <ArrowRight className='w-5 h-5'/>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage

const tools_list = [
  {
      label: "AI Assistant",
      icon: MessageSquare,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
      href: "/ai-tools/conversation"
  },
  {
      label: "Image Model",
      icon: ImageIcon,
      href: "/ai-tools/image",
      color: "text-pink-700",
      bgColor: "bg-pink-700/10",
      
  },
  {
      label: "Video Model",
      icon: VideoIcon,
      href: "/ai-tools/video",
      color: "text-orange-700",
      bgColor: "bg-orange-700/10"
  },
  {
      label: "Music Model",
      icon: MusicIcon,
      href: "/ai-tools/music",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
  },
  {
      label: "Code Partner",
      icon: Code,
      href: "/ai-tools/code",
      color: "text-green-700",
      bgColor: "bg-green-700/10"
  }
]