import { TZDate } from "@date-fns/tz";

const formatDateTZ = (date: Date) => {
  const savedTZ = localStorage.getItem('timeZone') || '';
  const formattedDate = new TZDate(
    date,
    savedTZ
  )
  return formattedDate;
}

export default formatDateTZ