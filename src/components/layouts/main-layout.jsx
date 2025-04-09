import { useNavigate } from 'react-router-dom';
import { FloatingDock } from '../ui/floating-dock';
import { getNavigationItems } from '../shared/navigation-items';

export function MainLayout({ children }) {
  const navigate = useNavigate();
  const navItems = getNavigationItems(navigate);

  return (
    <div className="flex h-screen overflow-hidden">
      {children}
      
      <FloatingDock 
        items={navItems}
        desktopClassName="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        mobileClassName="fixed bottom-8 right-8 z-50"
      />
    </div>
  );
}