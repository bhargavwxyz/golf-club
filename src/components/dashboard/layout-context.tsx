import { createContext, useContext, useState, type ReactNode } from "react";

type Ctx = { open: boolean; toggle: () => void; setOpen: (v: boolean) => void };
const SidebarCtx = createContext<Ctx | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <SidebarCtx.Provider value={{ open, setOpen, toggle: () => setOpen((v) => !v) }}>
      {children}
    </SidebarCtx.Provider>
  );
}

export function useSidebarState() {
  const ctx = useContext(SidebarCtx);
  if (!ctx) throw new Error("useSidebarState must be used inside SidebarProvider");
  return ctx;
}
