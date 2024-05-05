"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

interface MobileSidebarProps {
  apiLimitCount: number
}

const MobileSidebar = ({ apiLimitCount }: MobileSidebarProps) => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='md:hidden'>
            <Menu/>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 border-0 focus:ring-0">
        <Sidebar apiLimitCount={apiLimitCount} setOpen={setSheetOpen}/>
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar