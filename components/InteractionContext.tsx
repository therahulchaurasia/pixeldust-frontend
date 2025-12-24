'use client';

import React, { createContext, useContext, useState } from 'react';

type InteractionContextType = {
  interactingId: string | null;
  setInteractingId: (id: string | null) => void;
};

const InteractionContext = createContext<InteractionContextType | undefined>(
  undefined,
);

function InteractionProvider({ children }: { children: React.ReactNode }) {
  const [interactingId, setInteractingId] = useState<string | null>(null);

  return (
    <InteractionContext.Provider value={{ interactingId, setInteractingId }}>
      {children}
    </InteractionContext.Provider>
  );
}
function useInteraction() {
  const context = useContext(InteractionContext);
  if (!context)
    throw new Error('useInteraction must be used within InteractionProvider');
  return context;
}

export default InteractionContext;
export { InteractionProvider, useInteraction };
