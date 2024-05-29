import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const BookingItem = () => {
  return ( 
    <Card>
      <CardContent className="p-5 py-0 flex justify-between"> 
          <div className="flex flex-col gap-3 py-5">
            <Badge 
             className="w-fit bg-[#221c3d] text-primary hover:bg-[#221c3d]">
              Confirmado
            </Badge>
            <h2 className="font-bold">Corte de Cabelo</h2>

            <div className="flex items-center gap-2 ">
              <Avatar className="h-8 w-8">
                <AvatarImage />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>

              <h3 className="text-sm">Vintage Barber</h3>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center border-l-2 px-3 border-solid border-secondary">
            <p className="text-sm">Maio</p>
            <p className="text-2xl">29</p>
            <p className="text-sm">16:30</p>
          </div>
      </CardContent>
    </Card>
   );
}
 
export default BookingItem;