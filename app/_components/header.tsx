"use client"

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent,SheetTrigger } from "./ui/sheet";
import SideMenu from "./side-menu";
import Link from "next/link";


const Header = () => {
  
  return ( 
    <header>
       <Card>
          <CardContent className="2xl:px-24 px-5 py-8 justify-between items-center flex flex-row">
            <Link href="/">
              <Image 
                src="/Logo.png" 
                alt="FSW Barber"
                height={22} 
                width={120}
              />
            </Link>
            <Sheet>
                <SheetTrigger className="xl:hidden" asChild>
                    <Button 
                      className="h-8 w-8" 
                      variant="outline" 
                      size="icon"
                    >
                      <MenuIcon />
                    </Button>
                </SheetTrigger>

                <SheetContent className="p-0">
                  <SideMenu/>
                </SheetContent>
            </Sheet>

          </CardContent>
      </Card>
    </header>
   );
}
 
export default Header;