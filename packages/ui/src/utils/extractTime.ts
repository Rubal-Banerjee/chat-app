export const getTime = (createdAt: Date) => {
  const parsedDate = new Date(createdAt);
  const hours = parsedDate.getHours().toString().padStart(2, "0");
  const mins = parsedDate.getMinutes().toString().padStart(2, "0");
  return `${hours}:${mins}`;
};
