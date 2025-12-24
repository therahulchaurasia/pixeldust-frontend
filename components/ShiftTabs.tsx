'use client';
import { getFilterType } from '@/lib/shiftUtils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ShiftTabs() {
  const searchParams = useSearchParams();
  const currentView = getFilterType(searchParams.get('view'));
  const getTabClasses = (isActive: boolean) => {
    const base = isActive ? 'text-brand-900' : 'text-brand-300';
    return `${base} hover:text-brand-600 transition-colors`;
  };

  return (
    <nav className="flex gap-8 px-6 py-4 bg-transparent">
      <Link
        href="/?view=my-shifts"
        className={`text-xl ${getTabClasses(currentView === 'my-shifts')}`}
        replace
        aria-disabled={false}
      >
        My shifts
      </Link>
      <Link
        href="/?view=available"
        className={`text-xl ${getTabClasses(currentView === 'available')}`}
        replace
        aria-disabled={false}
      >
        Available shifts
      </Link>
    </nav>
  );
}
