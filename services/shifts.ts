const BACKEND_URL = 'http://localhost:8080';

const getShifts = async () => {
  const res = await fetch(`${BACKEND_URL}/shifts`);
  if (!res.ok) throw new Error('Failed to fetch shifts');
  return res.json();
};

const bookShift = async (id: string) => {
  const res = await fetch(`${BACKEND_URL}/shifts/${id}/book`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Failed to book shift');
  return res.json();
};
const cancelShift = async (id: string) => {
  const res = await fetch(`${BACKEND_URL}/shifts/${id}/cancel`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Failed to cancel shift');
  return res.json();
};

export { getShifts, bookShift, cancelShift };
