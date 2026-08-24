import React, { createContext, useContext, useRef } from 'react';

type DomRefs = {
  background: React.RefObject<HTMLDivElement | null>;
  hero: React.RefObject<HTMLDivElement | null>;
  antiHero: React.RefObject<HTMLDivElement | null>;
  building: React.RefObject<HTMLDivElement | null>;
  canvasRef: React.RefObject<HTMLDivElement | null>;
};

const DomRefsContext = createContext<DomRefs | null>(null);

export function DomRefsProvider({ children }: { children: React.ReactNode }) {
  const refs: DomRefs = {
    background: useRef<HTMLDivElement | null>(null),
    hero: useRef<HTMLDivElement | null>(null),
    antiHero: useRef<HTMLDivElement | null>(null),
    building: useRef<HTMLDivElement | null>(null),
    canvasRef: useRef<HTMLDivElement | null>(null),
  };

  return (
    <DomRefsContext.Provider value={refs}>{children}</DomRefsContext.Provider>
  );
}

export function useDomRefs() {
  const ctx = useContext(DomRefsContext);
  if (!ctx) throw new Error('useDomRefs must be used inside DomRefsProvider');
  return ctx;
}
