'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ShiftTabs() {
  const searchParams = useSearchParams();
  const view = searchParams.get('view');
  const currentView = view === 'available' ? 'available' : 'my-shifts';
  const getTabClasses = (isActive: boolean) => {
    const base = isActive
      ? 'text-brand-900 font-bold'
      : 'text-brand-300 font-medium';
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
