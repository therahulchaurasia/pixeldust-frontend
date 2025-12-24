'use client';

import { useInteraction } from './InteractionContext';
import { memo, useEffect } from 'react';

type CityFilterProps = {
  cityCounts: Record<string, number>;
  selectedCity: string;
  onSelectCity: (city: string) => void;
};

function CityFilter({
  cityCounts,
  selectedCity,
  onSelectCity,
}: CityFilterProps) {
  const { interactingId } = useInteraction();
  const cities = Object.keys(cityCounts).sort();
  useEffect(() => {
    if (cities.length > 0 && !selectedCity) {
      onSelectCity(cities[0]);
    }
  }, [cities, selectedCity, onSelectCity]);

  const isDisabled = interactingId !== null;

  return (
    <div className="flex gap-4 px-6 py-4 overflow-x-auto">
      {cities.map((city) => {
        const isActive = selectedCity === city;
        const count = cityCounts[city];

        return (
          <button
            key={city}
            disabled={isDisabled}
            onClick={() => onSelectCity(city)}
            className={`
              text-lg font-medium transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
              ${
                isActive
                  ? 'text-brand-900 font-bold'
                  : 'text-brand-300 hover:text-brand-600'
              }
            `}
          >
            {city} ({count})
          </button>
        );
      })}
    </div>
  );
}

export default memo(CityFilter);
