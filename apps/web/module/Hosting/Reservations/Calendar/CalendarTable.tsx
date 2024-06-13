import React, { useState } from 'react';
import { format, addDays, startOfMonth, getMonth, differenceInDays, isAfter, isBefore } from 'date-fns';
import Sidebar from './Sidebar';
import sampleData from './SampleData.json';
import { ChevronDown, ChevronRight } from 'lucide-react';

export interface Booking {
  name: string;
  start_date: string;
  end_date: string;
}

export interface Room {
  abbr: string;
  status: string;
  bookings: Booking[];
}

export interface Category {
  name: string;
  price: string;
  rooms: Room[];
}

export interface SampleData {
  categories: Category[];
}

const CalendarTable = () => {
  const [startDate, setStartDate] = useState<Date>(startOfMonth(new Date()));
  const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({});
  const daysPerPage = 13;

  const toggleCollapse = (category: string) => {
    setCollapsed(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const generateCalendarHeader = () => {
    const headers = [];
    for (let i = 0; i < daysPerPage; i++) {
      const date = addDays(startDate, i);
      headers.push(
        <th key={i} className={`border p-2 w-24 ${(i + 1) === daysPerPage && "border-r-0"}`}>
          {format(date, 'EEE dd')}
        </th>
      );
    }
    return headers;
  };

  const generateCalendarRowBorder = () => {
    const headers = [];
    for (let i = 0; i < daysPerPage; i++) {
      headers.push(
        <th key={i} className={`${(i + 1) !== daysPerPage && "border-r"} p-2 w-full max-w-24`}>
        </th>
      );
    }
    return headers;
  };

  const generateMonthHeader = () => {
    const headers = [];
    let currentMonth = getMonth(startDate);
    let colspan = 0;

    for (let i = 0; i < daysPerPage; i++) {
      const date = addDays(startDate, i);
      const month = getMonth(date);
      if (month === currentMonth) {
        colspan++;
      } else {
        headers.push(
          <td key={i} colSpan={colspan} className="border border-t-0 border-r-0 text-lg py-2 font-bold text-center">
            {format(addDays(startDate, i - colspan), 'MMMM yyyy')}
          </td>
        );
        currentMonth = month;
        colspan = 1;
      }
    }
    headers.push(
      <td key="last" colSpan={colspan} className="border border-t-0 border-r-0 text-lg py-2 font-bold text-center">
        {format(addDays(startDate, daysPerPage - colspan), 'MMMM yyyy')}
      </td>
    );

    return headers;
  };

  const moveStartDateByOneDay = (direction: number) => {
    setStartDate(addDays(startDate, direction));
  };

  const getBookingStyle = (startDate: Date, daysPerPage: number, booking: Booking) => {
    const bookingStart = new Date(booking.start_date);
    const bookingEnd = new Date(booking.end_date);
    const calendarEnd = addDays(startDate, daysPerPage - 1);

    if (isAfter(bookingStart, calendarEnd) || isBefore(bookingEnd, startDate)) {
      return null;
    }

    const startOffset = differenceInDays(bookingStart, startDate);
    const endOffset = differenceInDays(bookingEnd, startDate);

    const startCol = Math.max(startOffset, 0);
    const endCol = Math.min(endOffset, daysPerPage - 1);
    
    const colSpan = endCol - startCol + 1;
    return { startCol, colSpan };
  };

  const calculateRemainingQuantity = (category: Category, date: Date) => {
    let bookedRooms = 0;

    category.rooms.forEach(room => {
      room.bookings.forEach(booking => {
        const bookingStart = new Date(booking.start_date);
        const bookingEnd = new Date(booking.end_date);

        if (isBefore(date, bookingStart) || isAfter(date, bookingEnd)) {
          return;
        }

        bookedRooms += 1;
      });
    });

    return category.rooms.length - bookedRooms;
  };

  return (
    <div className="w-full mt-4 overflow-hidden rounded-lg border border-b-0">
      <div className="overflow-auto">
        <table className="min-w-max w-full rounded-lg">
          <thead className="">
            <tr className="uppercase text-sm leading-normal">
              <td colSpan={1} rowSpan={2} className="">
                <Sidebar nextPrevFunction={moveStartDateByOneDay} />
              </td>
              {generateMonthHeader()}
            </tr>
            <tr className="uppercase text-sm leading-normal">
              {generateCalendarHeader()}
            </tr>
          </thead>
          <tbody>
            {sampleData.categories.map((category, index) => (
              <React.Fragment key={category.name}>
                <tr className="hover:bg-gray-100 cursor-pointer" onClick={() => toggleCollapse(category.name)}>
                  <td className={`border p-4 text-left font-bold border-l-0`}>
                    <span className='flex gap-2 items-center'>
                      {!collapsed[category.name] ? <ChevronRight /> : <ChevronDown />}
                      {category.name}
                    </span>
                  </td>
                  {[...Array(daysPerPage)].map((_, i) => {
                    const date = addDays(startDate, i);
                    const remainingQuantity = calculateRemainingQuantity(category, date);
                    return (
                      <td key={i} className={`border gap-1 text-sm p-2 h-max text-center text-gray-500 font-semibold max-w-24 ${(i + 1) === daysPerPage && "border-r-0"}`}>
                        <div className='flex flex-col'>
                          <div>
                            {remainingQuantity}
                          </div>
                          <div>
                            ${parseFloat(category.price).toFixed(2)}
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
                {!collapsed[category.name] && category.rooms.map((room, index) => (
                  <tr key={room.abbr} className="hover:bg-gray-100 relative">
                    <td className="border p-4 text-left border-l-0">{room.abbr}</td>
                    <td colSpan={daysPerPage} className={`border text-center relative ${(index + 1) !== daysPerPage && "border-r-0"}`}>
                      {room.bookings.map(booking => {
                        const style = getBookingStyle(startDate, daysPerPage, booking);
                        if (!style) return null;

                        const { startCol, colSpan } = style;

                        return (
                          <div
                            key={booking.name}
                            style={{
                              left: `${(startCol * 100 / daysPerPage) + 4}%`,
                              width: `${(colSpan * 100 / daysPerPage) - 8}%`,
                            }}
                            onClick={() => console.log(booking)}
                            className="booking-block hover:cursor-pointer flex z-20 bg-primary-500 hover:bg-primary-700 rounded-lg h-[80%] top-[10%] absolute items-center justify-center"
                          >
                            <span className='text-white'>{booking.name}</span>
                          </div>
                        );
                      })}
                      <div className="absolute inset-0 z-10 flex h-full">
                        {generateCalendarRowBorder()}
                      </div>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalendarTable;
