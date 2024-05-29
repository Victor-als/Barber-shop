import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
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
      </CardContent>
    </Card>
   );
}
 
export default Header;