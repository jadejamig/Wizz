"use client";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import {
    Code,
    ImageIcon,
    LayoutDashboard,
    MessageSquare,
    MusicIcon,
    Settings,
    VideoIcon
} from "lucide-react";

import { usePathname } from "next/navigation";

const monsterrat = Montserrat({weight: "600", subsets: ["latin"]});


const Sidebar = (props: any) => {
    const pathname = usePathname();
    
    return (
        <div className="space-y-4 py-4 flex flex-col h-full
                        bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href='/ai-tools/dashboard' className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image fill alt="logo" src='/wizard.png' sizes="auto"/>
                    </div>
                    <h1 className={cn("text-2xl font-bold", monsterrat.className)}>Wizz</h1>
                </Link>
                <div className="space-y-1">
                    {routes_list.map((route) => (
                        <Link 
                            key={route.href} href={route.href} 
                            className={cn("text-sm flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                pathname === route.href ? "bg-white/10" : ""
                             )}
                             onClick={() => {
                                if (!props.setOpen)
                                    return
                                props.setOpen(false)
                             }}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)}/>
                                <div className={pathname === route.href ? "text-white" : "text-zinc-400" }>
                                    {route.label}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
    }

export default Sidebar

export const routes_list = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/ai-tools/dashboard",
        color: "text-sky-500"
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/ai-tools/conversation",
        color: "text-violet-500"
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/ai-tools/image",
        color: "text-pink-500"
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/ai-tools/video",
        color: "text-orange-700"
    },
    {
        label: "Music Generation",
        icon: MusicIcon,
        href: "/ai-tools/music",
        color: "text-emerald-500"
    },
    {
        label: "Code Generation",
        icon: Code,
        href: "/ai-tools/code",
        color: "text-green-700"
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/ai-tools/settings",
        color: ""
    },
]