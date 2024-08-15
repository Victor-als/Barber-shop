import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import ClientBookings from "./bookingsClient";


const BookingsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/');
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          gte: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lt: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
  ]);

  return (
    <>
      <Header />
      <ClientBookings 
        confirmedBookings={confirmedBookings}
        finishedBookings={finishedBookings}
      />
    </>
  );
}

export default BookingsPage;