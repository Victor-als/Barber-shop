import { Prisma } from "@prisma/client";

export type Booking = Prisma.BookingGetPayload<{
  include: {
    service: true;
    barbershop: true;
  }
}>;