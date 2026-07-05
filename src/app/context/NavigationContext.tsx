import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface NavigationContextType {
  currentPage: string;
  setCurrentPage: (page: string, params?: any) => void;
  pageParams: any;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [pageParams, setPageParams] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (isSidebarCollapsed) {
      document.body.classList.add('sidebar-collapsed');
    } else {
      document.body.classList.remove('sidebar-collapsed');
    }
  }, [isSidebarCollapsed]);

  const navigate = (page: string, params?: any) => {
    setCurrentPage(page);
    setPageParams(params || null);
    setIsSidebarOpen(false);
  };

  return (
    <NavigationContext.Provider
      value={{
        currentPage,
        setCurrentPage: navigate,
        pageParams,
        isSidebarOpen,
        setIsSidebarOpen,
        isSidebarCollapsed,
        setIsSidebarCollapsed
      }}
    >
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
