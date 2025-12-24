import { Shift } from './types';
import { differenceInMinutes, format, isToday, isTomorrow } from 'date-fns';

interface ShiftGroup {
	title: string;
	subTitle: string;
	shifts: Shift[];
}

const formatTimeRange = (start: number, end: number) => {
  return `${format(start, 'HH:mm')}-${format(end, 'HH:mm')}`;
};

const isOverlapping = (target: Shift, bookedShifts: Shift[]) => {
  return bookedShifts.some(
    (b) => b.startTime < target.endTime && b.endTime > target.startTime,
  );
};

const isShiftStarted = (shift: Shift) => {
  return Date.now() >= shift.startTime;
};

function getFilterType(view: string | null): 'available' | 'my-shifts' {
  return view === 'available' ? 'available' : 'my-shifts';
}

export const groupShiftsByDate = (shifts: Shift[]): ShiftGroup[] => {
  const groups: Record<string, Shift[]> = {};

  shifts.forEach((shift) => {
    const dateKey = format(shift.startTime, 'yyyy-MM-dd');
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(shift);
  });
  const result = Object.entries(groups)
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([dateKey, groupShifts]) => {
      const startDate = new Date(groupShifts[0].startTime);

      let title = format(startDate, 'MMMM d');
      if (isToday(startDate)) title = 'Today';
      if (isTomorrow(startDate)) title = 'Tomorrow';

      const count = groupShifts.length;
      const totalMinutes = groupShifts.reduce((acc, s) => {
        return acc + differenceInMinutes(s.endTime, s.startTime);
      }, 0);

      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      let durationStr = `${hours} h`;
      if (minutes > 0) durationStr += ` ${minutes} m`;

      return {
        title,
        subTitle: `${count} shift${count > 1 ? 's' : ''}, ${durationStr}`,
        shifts: groupShifts.sort((a, b) => a.startTime - b.startTime),
      };
    });
  return result;
};


export { formatTimeRange, isOverlapping, isShiftStarted, getFilterType };
