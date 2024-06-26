import { getServerSession } from "next-auth";
import Header from "../_components/header";

import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
import { authOptions } from "../_lib/auth";


const BookingsPage = async () => {
  const session = await getServerSession(authOptions);

  if(!session){
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

    
     <div className="2xl:px-96 2xl:mt-16 px-5 py-6">
        <h1 className="text-xl font-bold mb-4">Agendamentos</h1>

        {confirmedBookings.length > 0 && (
          <>
              <h2 className="text-gray-400 uppercase font-bold text-sm mb-4">
                Confirmados
              </h2>
              <div className="flex 2xl:w-[444px] flex-col gap-3">
                {confirmedBookings.map((booking) => (
                  <BookingItem key={booking.id} booking={booking}/>
                ))}
              </div>
          </>
        )}
        


        {finishedBookings.length > 0 && (
          <>
            <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-4">Finalizados</h2>
            
            <div className="flex flex-col 2xl:w-[444px] gap-3">
              {finishedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking}/>
              ))}
            </div>
          </>
        )}
     </div>
    </>
  );
}
 
export default BookingsPage;