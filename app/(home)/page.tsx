import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale';
import Header from "../_components/header";
import Search from './_components/search';
import BookingItem from '../_components/booking-item';
import { db } from '../_lib/prisma';
import BarbershopItem from './_components/barbershop-item';
import { getServerSession } from 'next-auth';
import { authOptions } from '../_lib/auth';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../_components/ui/carousel';


export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershops, recommendedBarbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({}),
    db.barbershop.findMany({
      orderBy: {
        id: 'asc'
      }
    }),
    session?.user
      ? db.booking.findMany({
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
        })
      : Promise.resolve([]),
  ]);

  return (
   <>
     <Header />

     <div className='2xl:relative 2xl:bg-cover 2xl:bg-no-repeat 2xl:min-h-[520px] 
      2xl:bg-bg-image'
     >
      <div className='2xl:absolute 2xl:flex 2xl:px-20 2xl:gap-20 2xl:pt-14 2xl:bg-black 
       2xl:bg-opacity-75 2xl:min-h-full 2xl:w-full'
      >

        <div className='2xl:flex 2xl:flex-col 2xl:min-w-[680px]'>
            <div className='px-5 pt-5'>
              <h2 className='text-xl font-bold'>
              {session?.user ? 
                `Olá ${session.user.name?.split(" ")[0]}!` 
                :
                "Olá, vamos agendar seu corte hoje?"}
              </h2>
              <p className='capitalize text-sm'>{format(new Date(), "EEEE',' d 'de' MMMM", {
                locale: ptBR,
              })}</p>
            </div>

          <div className='px-5 mt-6'>
            <Search />
          </div>
          <div className="mt-6">
            {confirmedBookings.length > 0 && (
              <>
                <h2 className='text-xs pl-5 uppercase mb-3 text-gray-400 font-bold'>Agendamentos</h2>

                <div className='flex px-5 gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
                {confirmedBookings.map(booking =>  <BookingItem key={booking.id} booking={booking} /> )}
                </div>
              </>
            )}
          </div>
        </div>



           <div className='mt-6 px-2 2xl:px-0 2xl:max-w-[850px]'>
            <h2 className='text-xs px-5 uppercase mb-3 text-gray-400 font-bold'>Recomendados</h2>


            <Carousel>
              <CarouselContent className='flex 2xl:px-0 px-5 2xl:gap-28 gap-4 overflow-x-auto 2xl:overflow-x-visible
               [&::-webkit-scrollbar]:hidden'
              >
                {barbershops.map((barbershop) => (
                  <CarouselItem  key={barbershop.id} className='min-w-[167px] max-w-[167px]'>
                    <BarbershopItem barbershop={barbershop}/>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className='invisible 2xl:visible'/>
              <CarouselNext className='invisible 2xl:visible'/>
            </Carousel>
          </div>
      </div>
     </div>



    <div className='2xl:mx-24 px-2 2xl:px-0 '>
      <div className='2xl:mt-8 mt-6 mb-[4.5rem] 2xl:max-w-[1650px]'>
        <h2 className='text-xs px-5 uppercase mb-3 text-gray-400 font-bold'>Populares</h2>

         <Carousel>
          <CarouselContent className='flex 2xl:gap-28 2xl:px-0 px-5 gap-4 overflow-x-auto 2xl:overflow-x-visible
            [&::-webkit-scrollbar]:hidden'
          >
            {recommendedBarbershops.map((barbershop) => (
              <CarouselItem  key={barbershop.id} className='min-w-[167px] max-w-[167px]'>
                <BarbershopItem barbershop={barbershop}/>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='invisible 2xl:visible'/>
          <CarouselNext className='invisible 2xl:visible'/>
         </Carousel>
        
      </div>
    </div>
   </>
  );
}
