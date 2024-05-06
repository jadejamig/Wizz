"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

  
const LandingContent = () => {
    return (    
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Testimonials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {testimonials.map((item) => (
                    <Card key={item.description} className="bg-[#192339] border-none text-white">
                        <CardHeader>
                            <CardTitle className="flex flex-col gap-x-2 text-center">
                                <div>
                                    <p className="text-lg">{item.name}</p>
                                    <p className="text-zinc-400 text-sm">{item.title}</p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0 text-center">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default LandingContent

const testimonials = [
    {
      "name": "Michael Johnson",
      "avatar": "MJ",
      "title": "Freelance Designer",
      "description": "Impressed with the quality, will use again!"
    },
    {
      "name": "Emily Brown",
      "avatar": "EB",
      "title": "Digital Marketer",
      "description": "Easy to use interface, saved me a lot of time!"
    },
    {
      "name": "David Lee",
      "avatar": "DL",
      "title": "Software Engineer",
      "description": "Innovative solution, helped streamline our processes!"
    },
    {
      "name": "Sarah Clark",
      "avatar": "SC",
      "title": "Small Business Owner",
      "description": "Great customer support, very responsive!"
    },
    {
      "name": "Alexandra Wang",
      "avatar": "AW",
      "title": "Content Creator",
      "description": "Sleek design, exactly what I was looking for!"
    },
    {
      "name": "Daniel Kim",
      "avatar": "DK",
      "title": "Product Manager",
      "description": "Improved efficiency, couldn't be happier!"
    },
    {
      "name": "Michelle Garcia",
      "avatar": "MG",
      "title": "HR Specialist",
      "description": "User-friendly platform, saves us time and resources!"
    },
    {
      "name": "William Martinez",
      "avatar": "WM",
      "title": "Finance Analyst",
      "description": "Great value for the price, highly recommend!"
    }
  ]