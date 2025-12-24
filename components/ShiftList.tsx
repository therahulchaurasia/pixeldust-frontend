'use client';

import { useState } from 'react';
import { useInteraction } from './InteractionContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getShifts, bookShift, cancelShift } from '../services/shifts';
import {
  getFilterType,
  groupShiftsByDate,
  isOverlapping,
} from '@/lib/shiftUtils';
import ShiftCard from './ShiftCard';
import CityFilter from './CityFilter';
import { Shift } from '@/lib/types';
import { useSearchParams } from 'next/navigation';

function ShiftList() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const filterType = getFilterType(searchParams.get('view'));

  const [activeCity, setActiveCity] = useState('');
  const { setInteractingId } = useInteraction();

	// We don't want to refetch shifts often, so we set staleTime to Infinity
  const { data: allShifts = [], isLoading } = useQuery<Shift[]>({
    queryKey: ['shifts'],
    queryFn: getShifts,
    staleTime: Infinity,
  });



  const { mutate: handleBook } = useMutation({
    mutationFn: bookShift,
    onMutate: (id: string) => setInteractingId(id),
    onSettled: () => setInteractingId(null),
		// We could do optimistic updates here for better UX
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['shifts'] }),
  });

  const { mutate: handleCancel } = useMutation({
    mutationFn: cancelShift,
    onMutate: (id: string) => setInteractingId(id),
    onSettled: () => setInteractingId(null),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['shifts'] }),
  });

  const bookedShifts = allShifts.filter((s) => s.booked);
  const cityCounts = calcCityCounts(allShifts);

  const displayedShifts = filterDisplayedShifts(
    allShifts,
    filterType,
    activeCity,
    bookedShifts,
  );

  const groupedShifts = groupShiftsByDate(displayedShifts);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-brand-100 border-t-brand-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-brand-300 font-medium">Loading shifts...</p>
      </div>
    );
  }

  return (
    <div
      className={`${
        groupedShifts.length !== 0 ? 'pb-12' : 'pb-0'
      } overflow-hidden border border-brand-200/50 rounded-xl bg-white min-h-full`}
    >
      {filterType === 'available' && (
        <div className="border-b border-brand-100">
          <CityFilter
            cityCounts={cityCounts}
            selectedCity={activeCity}
            onSelectCity={setActiveCity}
          />
        </div>
      )}

      {groupedShifts.map((group) => (
        <ShiftGroup
          key={group.title}
          title={group.title}
          shifts={group.shifts}
          bookedShifts={bookedShifts}
          onBook={handleBook}
          onCancel={handleCancel}
        />
      ))}

      {!isLoading && groupedShifts.length === 0 && (
        <div className="p-12 text-center">
          <p className="text-brand-300 text-lg">No shifts found.</p>
        </div>
      )}
    </div>
  );
}

// I want to wrap this function with useMemo in the parent component
function calcCityCounts(shifts: Shift[]): Record<string, number> {
  return shifts.reduce((acc, shift) => {
    acc[shift.area] = (acc[shift.area] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

function filterDisplayedShifts(
  allShifts: Shift[],
  filterType: 'available' | 'my-shifts',
  activeCity: string,
  bookedShifts: Shift[],
): Shift[] {
  if (filterType === 'my-shifts') {
    return bookedShifts;
  }
  return allShifts.filter((s) => (activeCity ? s.area === activeCity : true));
}

function getShiftStatus(
  shift: Shift,
  bookedShifts: Shift[],
): 'booked' | 'overlapping' | 'available' {
  if (shift.booked) return 'booked';
  return isOverlapping(shift, bookedShifts) ? 'overlapping' : 'available';
}

function GroupHeader({ title }: { title: string }) {
  return (
    <div className="bg-brand-50 px-6 py-3 border-b border-brand-100 flex items-center gap-3">
      <span className="text-brand-600 font-bold text-sm uppercase">
        {title}
      </span>
    </div>
  );
}

function ShiftGroup({
  title,
  shifts,
  bookedShifts,

  onBook,
  onCancel,
}: {
  title: string;
  shifts: Shift[];
  bookedShifts: Shift[];
  onBook: (id: string) => void;
  onCancel: (id: string) => void;
}) {
  return (
    <div>
      <GroupHeader title={title} />
      {shifts.map((shift) => {
        const status = getShiftStatus(shift, bookedShifts);
        return (
          <ShiftCard
            key={shift.id}
            shift={shift}
            status={status}
            onAction={(id) => (shift.booked ? onCancel(id) : onBook(id))}
          />
        );
      })}
    </div>
  );
}

export default ShiftList;
