import { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  currentPage: string;
  setCurrentPage: (page: string, params?: any) => void;
  pageParams: any;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [pageParams, setPageParams] = useState<any>(null);

  const navigate = (page: string, params?: any) => {
    setCurrentPage(page);
    setPageParams(params || null);
  };

  return (
    <NavigationContext.Provider value={{ currentPage, setCurrentPage: navigate, pageParams }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
