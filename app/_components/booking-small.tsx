"use client";

import { useEffect, useState } from "react";
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
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

interface BookingItemSheetProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    }
  }> | null;
  onClose: () => void;
}

const BookingItemSheet = ({ booking, onClose }: BookingItemSheetProps) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  useEffect(() => {
    if (!booking) {
      onClose();
    }
  }, [booking, onClose]);

  const handleCancelClick = async () => {
    setIsDeleteLoading(true);
    try {
      if (booking) {
        await cancelBooking(booking.id);
        toast.success("Reserva cancelada com sucesso!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  if (!booking) return null;

  const isBookingConfirmed = isFuture(booking.date);

  return (
    <Sheet open onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Detalhes da Reserva</SheetTitle>
          <SheetClose />
        </SheetHeader>
            <div className="relative h-[190px] w-full mt-6">
              <Image
                src={BarbershopMap}
                alt={booking.service.name}
                fill
                style={{ objectFit: 'contain', borderRadius: 16 }}
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
  
    
      </SheetContent>
    </Sheet>
  );
};

export default BookingItemSheet;