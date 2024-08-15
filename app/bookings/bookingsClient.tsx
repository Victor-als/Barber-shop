"use client";

import { useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import BookingItem from "../_components/booking-item";
import BookingItemCard from "../_components/booking-large";
import BookingItemSheet from "../_components/booking-small";
import { Booking } from "./types";

interface ClientBookingsProps {
  confirmedBookings: Booking[];
  finishedBookings: Booking[];
}

const ClientBookings = ({ confirmedBookings, finishedBookings }: ClientBookingsProps) => {
  const isLargeScreen = useMediaQuery("(min-width: 1536px)");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const handleItemClick = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  return (
    <div className="flex flex-col 2xl:flex-row gap-10">
      <div className="flex 2xl:w-[865px] flex-col">
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="text-gray-400 uppercase font-bold text-sm mb-4">Confirmados</h2>
            <div className="flex flex-col gap-3">
              {confirmedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={booking}
                  onClick={() => handleItemClick(booking)}
                />
              ))}
            </div>
          </>
        )}

        {finishedBookings.length > 0 && (
          <>
            <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-4">Finalizados</h2>
            <div className="flex flex-col 2xl:w-[444px] mb-7 2xl:mx-80 gap-3">
              {finishedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={booking}
                  onClick={() => handleItemClick(booking)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {isLargeScreen ? (
        <div className="2xl:w-[544px] 2xl:h-[816px] pt-40 flex-shrink-0">
          {selectedBooking ? (
            <BookingItemCard booking={selectedBooking} />
          ) : (
            <div className="text-gray-500">Selecione um item para ver os detalhes.</div>
          )}
        </div>
      ) : (
        <div className={`w-full mt-10 ${selectedBooking ? "block" : "hidden"}`}>
          {selectedBooking ? (
            <BookingItemSheet booking={selectedBooking} onClose={() => setSelectedBooking(null)} />
          ) : (
            <div className="text-gray-500">Selecione um item para ver os detalhes.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default ClientBookings;