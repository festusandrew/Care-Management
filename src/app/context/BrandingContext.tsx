import { createContext, useContext, useState, ReactNode } from 'react';

interface BrandingState {
  clientLogoUrl: string | null;
  clientName: string;
  clientTagline: string;
  sidebarColor: string;
  setClientLogoUrl: (url: string | null) => void;
  setClientName: (name: string) => void;
  setClientTagline: (tagline: string) => void;
  setSidebarColor: (color: string) => void;
}

const BrandingContext = createContext<BrandingState | undefined>(undefined);

export function BrandingProvider({ children }: { children: ReactNode }) {
  const [clientLogoUrl, setClientLogoUrl] = useState<string | null>(null);
  const [clientName, setClientName] = useState('Riverside Care Group');
  const [clientTagline, setClientTagline] = useState('Care Provider · Bristol');
  const [sidebarColor, setSidebarColor] = useState('#111827'); // gray-900

  return (
    <BrandingContext.Provider
      value={{ clientLogoUrl, clientName, clientTagline, sidebarColor, setClientLogoUrl, setClientName, setClientTagline, setSidebarColor }}
    >
      {children}
    </BrandingContext.Provider>
  );
}

export function useBranding() {
  const ctx = useContext(BrandingContext);
  if (!ctx) throw new Error('useBranding must be used inside <BrandingProvider>');
  return ctx;
}
