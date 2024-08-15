"use client";

import { useState } from "react";
import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import BarbershopMap from "../../public/barbershopMap.png";
import { Button } from "./ui/button";
import { cancelBooking } from "../_actions/cancel-booking";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { 
  AlertDialog, 
  AlertDialogTrigger, 
  AlertDialogContent, 
  AlertDialogTitle, 
  AlertDialogDescription, 
  AlertDialogCancel, 
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter
} from "./ui/alert-dialog";
import BookingInfo from "./booking-info";

interface BookingItemCardProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    }
  }>;
}

const BookingItemCard = ({ booking }: BookingItemCardProps) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const isBookingConfirmed = isFuture(booking.date);

  const handleCancelClick = async () => {
    setIsDeleteLoading(true);
    try {
      await cancelBooking(booking.id);
      toast.success("Reserva cancelada com sucesso!");      
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <Card className="min-w-full">
      <CardContent className="py-0 flex px-0"> 
        <div className="flex flex-col gap-3 py-5 flex-[3] pl-5">
          <Badge 
            variant={isBookingConfirmed ? 'default' : 'secondary'}
            className="w-fit text-primary"
          >
            {isBookingConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>
          <h2 className="font-bold">{booking.service.name}</h2>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={booking.barbershop.imageUrl} />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <h3 className="text-sm">{booking.barbershop.name}</h3>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center border-l flex-1 border-solid border-secondary">
          <p className="text-sm capitalize">
            {format(booking.date, "MMMM", {
              locale: ptBR,
            })}
          </p>
          <p className="text-2xl">{format(booking.date, "dd")}</p>
          <p className="text-sm">{format(booking.date, "hh:mm")}</p>
        </div>
      </CardContent>
      <CardContent className="px-5 py-4">
        <div className="relative h-[190px] w-full mt-6">
          <Image 
            src={BarbershopMap}
            alt={booking.service.name}
            fill 
            style={{
              objectFit: 'contain',
              borderRadius: 16
            }}
          />
          <div className="absolute w-full bottom-4 left-0 px-5">
            <Card>
              <CardContent className="p-3 flex gap-2">
                <Avatar>
                  <AvatarImage src={booking.barbershop.imageUrl} />
                </Avatar>
                <div>
                  <h2 className="font-bold">{booking.barbershop.name}</h2>
                  <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">
                    {booking.barbershop.address}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Badge 
          variant={isBookingConfirmed ? 'default' : 'secondary'}
          className="w-fit text-primary mt-6 mb-6"
        >
          {isBookingConfirmed ? "Confirmado" : "Finalizado"}
        </Badge>
        <BookingInfo booking={booking} />
        <div className="flex-row gap-3 mt-10">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                disabled={!isBookingConfirmed || isDeleteLoading} 
                variant="destructive" 
                className="w-full"
              >
                Cancelar Reserva
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[90%]">
              <AlertDialogHeader>
                <AlertDialogTitle>Deseja mesmo cancelar essa reserva?</AlertDialogTitle>
                <AlertDialogDescription>
                  Uma vez cancelada, não será possível reverter essa ação.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-row gap-3">
                <AlertDialogCancel className="w-full mt-0">Voltar</AlertDialogCancel>
                <AlertDialogAction 
                  disabled={isDeleteLoading} 
                  className="w-full" 
                  onClick={handleCancelClick}
                >
                  {isDeleteLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}   
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItemCard;