import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import DashboardCard from '../../components/ui/DashboardCard';
import WelcomeHeader from './components/WelcomeHeader';
import QuickStatsCard from './components/QuickStatsCard';
import RecentActivityPanel from './components/RecentActivityPanel';
import UpcomingDeadlines from './components/UpcomingDeadlines';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData?.role === 'employee') {
        setUser(userData);
      } else {
        navigate('/admin-hr-dashboard');
      }
    } else {
      navigate('/sign-up-registration');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/sign-up-registration');
  };

  const mockActivities = [
    {
      id: 1,
      type: 'approval',
      title: 'Leave Request Approved',
      message: 'Your sick leave request for January 15-17, 2026 has been approved by HR Manager Sarah Johnson.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'approved'
    },
    {
      id: 2,
      type: 'attendance',
      title: 'Attendance Reminder',
      message: 'Please remember to check-in when you arrive at the office today. Your last check-in was at 9:15 AM.',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: null
    },
    {
      id: 3,
      type: 'announcement',
      title: 'System Maintenance Notice',
      message: 'The HRMS system will undergo scheduled maintenance on January 5, 2026 from 2:00 AM to 4:00 AM EST. Please save your work before this time.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: null
    },
    {
      id: 4,
      type: 'leave',
      title: 'Leave Balance Update',
      message: 'Your annual leave balance has been updated. You now have 12 days of paid leave remaining for 2026.',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
      status: null
    }
  ];

  const mockDeadlines = [
    {
      id: 1,
      title: 'Performance Review Submission',
      description: 'Complete your self-assessment form for Q4 2025 performance review. This is required for your annual appraisal process.',
      date: new Date('2026-01-10'),
      priority: 'high'
    },
    {
      id: 2,
      title: 'Benefits Enrollment',
      description: 'Review and update your health insurance and retirement plan selections for the upcoming year.',
      date: new Date('2026-01-15'),
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Training Completion',
      description: 'Complete the mandatory cybersecurity awareness training module assigned to all employees.',
      date: new Date('2026-01-20'),
      priority: 'medium'
    }
  ];

  const dashboardCards = [
    {
      title: 'My Profile',
      description: 'View and update your personal information, job details, and profile picture. Keep your contact information current.',
      icon: 'User',
      path: '/employee-profile-management',
      statusIndicator: 'CheckCircle',
      statusText: '95% Complete',
      statusVariant: 'success'
    },
    {
      title: 'Attendance Tracking',
      description: 'Check-in and check-out for the day. View your attendance history, monthly summary, and track your working hours.',
      icon: 'Calendar',
      path: '/attendance-tracking',
      statusIndicator: 'Clock',
      statusText: 'Not Checked In',
      statusVariant: 'warning'
    },
    {
      title: 'Leave Requests',
      description: 'Apply for leave, view your leave balance, and track the status of your pending and approved leave applications.',
      icon: 'FileText',
      path: '/leave-application',
      statusIndicator: 'AlertCircle',
      statusText: '2 Pending',
      statusVariant: 'primary'
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-caption">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader user={user} onLogout={handleLogout} />
      <div className="pt-16">
        <NavigationBreadcrumb user={user} />
        
        <main className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
          <WelcomeHeader userName={user?.name} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-6 md:mt-8">
            <QuickStatsCard
              icon="TrendingUp"
              label="Monthly Attendance"
              value="92%"
              subtext="18 of 20 days present"
              variant="success"
            />
            <QuickStatsCard
              icon="Calendar"
              label="Leave Balance"
              value="12"
              subtext="Days remaining in 2026"
              variant="primary"
            />
            <QuickStatsCard
              icon="Clock"
              label="Working Hours"
              value="168"
              subtext="Hours this month"
              variant="default"
            />
            <QuickStatsCard
              icon="AlertCircle"
              label="Pending Actions"
              value="3"
              subtext="Items need attention"
              variant="warning"
            />
          </div>

          <div className="mt-6 md:mt-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-4 md:mb-6">
              Quick Access
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {dashboardCards?.map((card) => (
                <DashboardCard
                  key={card?.path}
                  title={card?.title}
                  description={card?.description}
                  icon={card?.icon}
                  path={card?.path}
                  statusIndicator={card?.statusIndicator}
                  statusText={card?.statusText}
                  statusVariant={card?.statusVariant}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
            <RecentActivityPanel activities={mockActivities} />
            <UpcomingDeadlines deadlines={mockDeadlines} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;