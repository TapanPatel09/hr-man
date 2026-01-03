import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AppHeader = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthenticated = user && user?.name;

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/sign-up-registration');
  };

  const navigationItems = user?.role === 'admin' 
    ? [
        { label: 'Admin Dashboard', path: '/admin-hr-dashboard', icon: 'LayoutDashboard' },
        { label: 'Employees', path: '/employee-profile-management', icon: 'Users' },
        { label: 'Attendance', path: '/attendance-tracking', icon: 'Calendar' },
        { label: 'Leave Requests', path: '/leave-application', icon: 'FileText' }
      ]
    : [
        { label: 'Dashboard', path: '/employee-dashboard', icon: 'LayoutDashboard' },
        { label: 'Profile', path: '/employee-profile-management', icon: 'User' },
        { label: 'Attendance', path: '/attendance-tracking', icon: 'Calendar' },
        { label: 'Leave', path: '/leave-application', icon: 'FileText' }
      ];

  const isActivePath = (path) => location?.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-card shadow-md transition-smooth">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-8">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate(user?.role === 'admin' ? '/admin-hr-dashboard' : '/employee-dashboard')}
            >
              <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center transition-smooth hover:bg-primary/20">
                <Icon name="Briefcase" size={24} color="var(--color-primary)" />
              </div>
              <span className="text-xl font-heading font-semibold text-foreground hidden sm:block">
                Dayflow HRMS
              </span>
            </div>

            {isAuthenticated && (
              <nav className="hidden lg:flex items-center gap-1">
                {navigationItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => navigate(item?.path)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-caption text-sm transition-smooth ${
                      isActivePath(item?.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <Icon name={item?.icon} size={18} />
                    <span>{item?.label}</span>
                  </button>
                ))}
              </nav>
            )}
          </div>

          {isAuthenticated && (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-muted rounded-md">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="var(--color-primary)" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">{user?.name}</span>
                  <span className="text-xs font-caption text-muted-foreground capitalize">{user?.role}</span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                iconName="LogOut"
                className="hidden md:flex"
              />

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-md hover:bg-muted transition-smooth"
              >
                <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
              </button>
            </div>
          )}
        </div>

        {isAuthenticated && mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card">
            <nav className="flex flex-col p-4 gap-2">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => {
                    navigate(item?.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md font-caption text-sm transition-smooth ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </button>
              ))}

              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-3 px-4 py-3 bg-muted rounded-md mb-2">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} color="var(--color-primary)" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{user?.name}</span>
                    <span className="text-xs font-caption text-muted-foreground capitalize">{user?.role}</span>
                  </div>
                </div>

                <Button
                  variant="destructive"
                  fullWidth
                  onClick={handleLogout}
                  iconName="LogOut"
                  iconPosition="left"
                >
                  Logout
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default AppHeader;