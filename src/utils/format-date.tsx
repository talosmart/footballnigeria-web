export default function formatDate(dateParam: string) {
  const date = new Date(dateParam);

  const formatted = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);

  return formatted; // "dd MM yyyy"
}
