import React, { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBreadcrumb = ({ items, user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const defaultItems = React.useMemo(() => {
    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [];

    const dashboardPath = user?.role === 'admin' ? '/admin-hr-dashboard' : '/employee-dashboard';
    const dashboardLabel = user?.role === 'admin' ? 'Admin Dashboard' : 'Dashboard';

    breadcrumbs?.push({
      label: dashboardLabel,
      path: dashboardPath,
      icon: 'LayoutDashboard'
    });

    const routeLabels = {
      'employee-profile-management': 'Profile Management',
      'attendance-tracking': 'Attendance Tracking',
      'leave-application': 'Leave Application',
      'admin-hr-dashboard': 'Admin Dashboard',
      'employee-dashboard': 'Employee Dashboard'
    };

    pathSegments?.forEach((segment, index) => {
      const path = '/' + pathSegments?.slice(0, index + 1)?.join('/');
      const label = routeLabels?.[segment] || segment?.split('-')?.map(word => 
        word?.charAt(0)?.toUpperCase() + word?.slice(1)
      )?.join(' ');

      if (path !== dashboardPath) {
        breadcrumbs?.push({
          label,
          path,
          icon: null
        });
      }
    });

    return breadcrumbs;
  }, [location?.pathname, user]);

  const breadcrumbItems = items || defaultItems;

  if (breadcrumbItems?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center gap-2 py-4 px-6 bg-muted/50 border-b border-border" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 flex-wrap">
        {breadcrumbItems?.map((item, index) => {
          const isLast = index === breadcrumbItems?.length - 1;
          const isClickable = !isLast && item?.path;

          return (
            <li key={item?.path || index} className="flex items-center gap-2">
              {index > 0 && (
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              )}
              {isClickable ? (
                <button
                  onClick={() => navigate(item?.path)}
                  className="flex items-center gap-2 text-sm font-caption text-muted-foreground hover:text-foreground transition-smooth"
                >
                  {item?.icon && <Icon name={item?.icon} size={16} />}
                  <span>{item?.label}</span>
                </button>
              ) : (
                <span className="flex items-center gap-2 text-sm font-caption text-foreground font-medium">
                  {item?.icon && <Icon name={item?.icon} size={16} />}
                  <span>{item?.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default NavigationBreadcrumb;