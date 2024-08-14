"use client"
import SideMenu from "@/app/_components/side-menu";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarberShopInfoProps {
  barbershop: Barbershop;
}

const BarberShopInfo = ({ barbershop }: BarberShopInfoProps) => {
  const router = useRouter()

  const handleBackClick = () => {
    router.replace('/');
  }

  return ( 
      <div>
        <div className=" 2xl:px-5 2xl:w-[758px] 2xl:h-[485px] h-[250px] w-full relative" >
          <Button 
            className="xl:hidden z-50 top-4 left-4 absolute" 
            size="icon" 
            variant="outline"
            onClick={handleBackClick}
          >
            <ChevronLeftIcon />
          </Button>

        

          <Sheet>
                <SheetTrigger className="xl:hidden" asChild>
                  <Button 
                  className="z-50 top-4 right-4 absolute" 
                  size="icon" 
                  variant="outline"
                  >
                    <MenuIcon />
                  </Button>
                </SheetTrigger>

                <SheetContent className="p-0">
                  <SideMenu />
                </SheetContent>
            </Sheet>


          <Image 
            className="xl:rounded-xl opacity-75"
            src={barbershop.imageUrl} 
            alt={barbershop.name} 
            style={{
              objectFit: "cover",
            }}
            fill
          />
        </div>

          <div className="2xl:flex 2xl:w-[758px] 2xl:justify-between px-5 pt-4 
           pb-6 2xl:pb-0 2xl:border-b-transparent border-b border-solid border-secondary">

            <div>
              <h1 className="text-xl font-bold">{barbershop.name}</h1>

              <div className="flex items-center gap-1 mt-2">
                <MapPinIcon className="text-primary" size={18}/>
                <p className="text-sm">{barbershop.address}</p>
              </div>
            </div>
            
            <div className="2xl:bg-card 2xl:h-20 2xl:w-44 2xl:justify-center 
            2xl:rounded-xl 2xl:flex-col flex items-center gap-1 mt-2">
              <div className="flex gap-1 2xl:flex 2xl:items-center 2xl:gap-1">
                <StarIcon className="text-primary" size={18}/>
                <p className="2xl:text-xl text-sm">5,0</p>
              </div>

              <p className="text-sm">(300 avaliações)</p>
            </div>
        </div> 
  </div>
  
 );
}
 
export default BarberShopInfo;