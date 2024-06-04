"use client"

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
//import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  // const {data} = useSession();
  // const handlerLoginCard = async () => {
  //   await signIn();
  // }
  return ( 
    <Card>
      <CardContent className="px-5 py-8 justify-between items-center flex flex-row">
        <Image 
          src="/Logo.png" 
          alt="FSW Barber"
          height={22} 
          width={120}
        />
        <Button 
          className="h-8 w-8" 
          variant="outline" 
          size="icon"
        >
          <MenuIcon />
        </Button>

        {/* {data?.user 
         ? <div>
            <Button onClick={() => signOut()}>Logout</Button>
            <h1>{data.user.name}</h1> 
          </div> 
         :  <Button onClick={handlerLoginCard}>Login</Button>
        } */}
       
      </CardContent>
    </Card>
   );
}
 
export default Header;