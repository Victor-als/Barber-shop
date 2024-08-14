
import { db } from "@/app/_lib/prisma";
import BarberShopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import Image from "next/image";

import { Card, CardContent } from "@/app/_components/ui/card";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";

interface BarbershopDetailsPageProps {
  params: {
    id?: string;
  }
}

const BarbershopDetailsPage  = async ({ params }: BarbershopDetailsPageProps) => {
  const session = await getServerSession(authOptions)

  if(!params.id) {
    return null;
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    }
  });

  if(!barbershop) {
    return null;
  }

  return ( 
    <div className="2xl:flex 2xl:justify-center 2xl:gap-10 2xl:pt-20">
      <div className="2xl:gap-10">
        <BarberShopInfo barbershop={barbershop}/>
       
          <h2 className="2xl:w-[758px] px-5 2xl:pt-0 pt-6 text-sm text-gray-400 
            font-bold">
            Serviços
          </h2>
          <div className=" 2xl:w-[758px] 2xl:grid 2xl:grid-cols-2 px-5 flex 
            flex-col gap-4 py-6">
            {barbershop.services.map(service => (
                <ServiceItem 
                 key={service.id} 
                 barbershop={barbershop} 
                 service={service} 
                 isAuthenticated={!!session?.user}/>
              ))}

          </div> 

      </div>
         <div className="hidden 2xl:block 2xl:h-[790px] 2xl:w-[386px] 2xl:px-4 
          2xl:rounded-xl 2xl:bg-card">
         <div>
            <div className="relative h-[190px] w-full mt-6">
                <Image 
                className="2xl:rounded-xl"
                width={346}
                height={180}
                src="/barbershopMap.png" 
                alt="mapa"
                style={{
                  objectFit: "cover",
                }}
                />

                <div className="absolute w-full bottom-4 left-0 px-5">
                  <Card>
                    <CardContent className="p-3 flex gap-2">
                      <Avatar>
                        <AvatarImage src={barbershop.imageUrl}></AvatarImage>
                      </Avatar>

                      <div>
                        <h2 className="font-bold">{barbershop.name}</h2>
                        <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">
                          {barbershop.address}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
              </div>

              <div className="mt-5 border-b-2">
                <span className="font-bold mt-6">Sobre Nós</span>
                <p className="text-sm mb-6 text-gray-400 pt-3">
                  Bem-vindo à Vintage Barber, onde tradição encontra estilo. Nossa 
                  equipe de mestres barbeiros transforma cortes de cabelo e barbas 
                  em obras de arte. Em um ambiente acolhedor, promovemos confiança, 
                  estilo e uma comunidade unida.
                </p>
              </div>


              <div className="flex border-b-2 flex-col gap-2 mt-4 pb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Segunda</span>
                  <span>Fechado</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Terça-Feira</span>
                  <span>09:00 - 21:00</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Quarta-Feira</span>
                  <span>09:00 - 21:00</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Quinta-Feira</span>
                  <span>09:00 - 21:00</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Sexta-Feira</span>
                  <span>09:00 - 21:00</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Sábado</span>
                  <span>08:00 - 17:00</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Domingo</span>
                  <span>Fechado</span>
                </div>
              </div>


              <div className="flex justify-between pt-10">
                <p className="text-lg">Em parceria com</p>
                <Image  
                  src="/Logo.png" 
                  alt="FSW Barber"
                  height={22} 
                  width={120}
                />
              </div>
            </div>

          
        </div>
    </div>
  </div >
);
}
 
export default BarbershopDetailsPage;


