import { useState } from 'react';
import { format, addDays, startOfMonth, getMonth, getYear } from 'date-fns';
import Sidebar from './Sidebar';

const CalendarTable = () => {
  const [startDate, setStartDate] = useState(startOfMonth(new Date()));
  const daysPerPage = 15;

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
            <tr className="hover:bg-gray-100">
              <td className="border p-4 text-center"> </td>
              {Array.from({ length: daysPerPage }).map((_, index) => (
                <td key={index} className="border p-4 text-center"> </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalendarTable;
