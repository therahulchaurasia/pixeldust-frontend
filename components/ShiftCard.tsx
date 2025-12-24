'use client';
import { formatTimeRange, isShiftStarted } from '@/lib/shiftUtils';
import { Shift } from '@/lib/types';
import { useInteraction } from './InteractionContext';
import { JSX } from 'react';

type ShiftCardProps = {
  shift: Shift;
  status: 'booked' | 'available' | 'overlapping';
  onAction: (id: string) => void;
};

function ShiftCard({ shift, status, onAction }: ShiftCardProps) {
  const { interactingId } = useInteraction();
  const timeString = formatTimeRange(shift.startTime, shift.endTime);
  const hasStarted = isShiftStarted(shift);

  const isOverlapping = status === 'overlapping';
  const isBooked = status === 'booked';
  const isThisCardLoading = interactingId === shift.id;
  const isGlobalLoading = interactingId !== null;
  const isDisabled = isOverlapping || hasStarted || isGlobalLoading;

  function getButtonVariant(isDisabled: boolean, isBooked: boolean): string {
    if (isDisabled) return '';
    return isBooked
      ? 'border-pink-300 text-pink-600 hover:bg-pink-50'
      : 'border-green-300 text-green-600 hover:bg-green-50';
  }

  function renderButtonLabel(
    isLoading: boolean,
    isBooked: boolean,
  ): string | JSX.Element {
    if (isLoading) {
      return <span className="animate-pulse">Processing...</span>;
    }
    return isBooked ? 'Cancel' : 'Book';
  }

  return (
    <div className="px-6 py-5 flex justify-between items-center border-b border-brand-200/50 hover:bg-brand-50 transition-colors bg-white">
      <div
        className={`flex flex-col gap-1 ${isOverlapping ? 'opacity-40' : ''}`}
      >
        <span className="text-brand-600 text-lg font-medium">{timeString}</span>
        <span className="text-brand-300 text-sm font-medium">{shift.area}</span>
      </div>

      <div className="flex items-center gap-4">
        {isBooked && (
          <span className="text-brand-900 font-bold text-sm">Booked</span>
        )}
        {isOverlapping && (
          <span className="text-pink-600 font-bold text-sm">Overlapping</span>
        )}
        <button
          onClick={() => onAction(shift.id)}
          disabled={isDisabled}
          className={`px-6 py-1.5 rounded-full font-bold text-sm text-brand-600 border transition-all cursor-pointer disabled:cursor-not-allowed
    			${getButtonVariant(isDisabled, isBooked)}`}
        >
          {renderButtonLabel(isThisCardLoading, isBooked)}
        </button>
      </div>
    </div>
  );
}

export default ShiftCard;
