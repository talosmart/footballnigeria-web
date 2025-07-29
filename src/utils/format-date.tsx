// export default function formatDate(dateParam: string) {
//   const date = new Date(dateParam);

//   const formatted = new Intl.DateTimeFormat("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   }).format(date);

//   return formatted; // "dd MM yyyy"
// }


export default function formatDate(dateParam?: string) {
  if (!dateParam || typeof dateParam !== 'string') {
    return '--';
  }

  try {
    const cleanDateString = dateParam.replace(/\.(\d{3})\d*Z$/, '.$1Z');
    const date = new Date(cleanDateString);

    if (isNaN(date.getTime())) return '--';

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  } catch {
    return '--';
  }
}


