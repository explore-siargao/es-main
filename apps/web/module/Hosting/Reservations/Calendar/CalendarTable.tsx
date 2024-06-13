import { useState } from 'react';
import { format, addDays, startOfMonth, getMonth } from 'date-fns';
import Sidebar from './Sidebar';
import sampleData from './SampleData.json';
import React from 'react';
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
  rooms: Room[];
}

export interface SampleData {
  categories: Category[];
}

const CalendarTable = () => {
  const [startDate, setStartDate] = useState<Date>(startOfMonth(new Date()));
  const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({});
  const daysPerPage = 15;

  const toggleCollapse = (category: string) => {
    setCollapsed(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const generateCalendarHeader = () => {
    const headers = [];
    for (let i = 0; i < daysPerPage; i++) {
      const date = addDays(startDate, i);
      headers.push(
        <th key={i} className="border p-2">
          {format(date, 'EEE dd')}
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
          <td key={i} colSpan={colspan} className="border text-lg py-2 font-bold text-center">
            {format(addDays(startDate, i - colspan), 'MMMM yyyy')}
          </td>
        );
        currentMonth = month;
        colspan = 1;
      }
    }
    headers.push(
      <td key="last" colSpan={colspan} className="border text-lg py-2 font-bold text-center">
        {format(addDays(startDate, daysPerPage - colspan), 'MMMM yyyy')}
      </td>
    );

    return headers;
  };

  const moveStartDateByOneDay = (direction: number) => {
    setStartDate(addDays(startDate, direction));
  };

  return (
    <div className="w-full">
      <div className="overflow-auto rounded-lg">
        <table className="min-w-max w-full table-auto border-2">
          <thead className="">
            <tr className="uppercase text-sm leading-normal">
              <td colSpan={1} rowSpan={2} className="border">
                <Sidebar nextPrevFunction={moveStartDateByOneDay} />
              </td>
              {generateMonthHeader()}
            </tr>
            <tr className="uppercase text-sm leading-normal">
              {generateCalendarHeader()}
            </tr>
          </thead>
          <tbody>
            {sampleData.categories.map(category => (
              <React.Fragment key={category.name}>
                <tr className="hover:bg-gray-100 cursor-pointer" onClick={() => toggleCollapse(category.name)}>
                  <td className="border p-4 text-left font-bold" colSpan={daysPerPage + 1}><span className='flex gap-2'>{!collapsed[category.name] ? <ChevronRight /> : <ChevronDown />}{category.name}</span></td>
                </tr>
                {!collapsed[category.name] && category.rooms.map(room => (
                  <tr key={room.abbr} className="hover:bg-gray-100">
                    <td className="border p-4 text-left">{room.abbr}</td>
                    {Array.from({ length: daysPerPage }).map((_, index) => (
                      <td key={index} className="border p-4 text-center"> </td>
                    ))}
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