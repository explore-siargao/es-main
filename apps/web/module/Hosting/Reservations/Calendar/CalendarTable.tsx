import { useState } from 'react';
import { format, addDays, startOfMonth } from 'date-fns';
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
    const startMonth = format(startDate, 'MMMM');
    const endMonth = format(addDays(startDate, daysPerPage - 1), 'MMMM');
    return startMonth === endMonth ? startMonth : `${startMonth} - ${endMonth}`;
  };

  const moveStartDateByOneDay = (direction: number) => {
    setStartDate(addDays(startDate, direction));
  };

  return (
    <div className='w-full'>
      <div className="overflow-auto rounded-lg">
        <table className="min-w-max w-full table-auto border-2">
          <thead className=''>
            <tr className="uppercase text-sm leading-normal">
              <td colSpan={1} rowSpan={2} className="border"><Sidebar nextPrevFunction={moveStartDateByOneDay} /></td>
              <td colSpan={15} className="border text-lg py-2 font-bold text-center">{generateMonthHeader()}</td>
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
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalendarTable;
