export function getDayAndMonth(date:string) {
  const emailDate = new Date(date);
  const days = emailDate.getDate();
  const month = emailDate.getMonth() + 1;

  return `${days}/${month}`;
}