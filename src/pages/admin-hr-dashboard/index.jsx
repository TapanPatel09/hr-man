import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import RoleGuard from '../../components/ui/RoleGuard';
import MetricsCard from './components/MetricsCard';
import EmployeeTable from './components/EmployeeTable';
import ActivityFeed from './components/ActivityFeed';
import AttendanceChart from './components/AttendanceChart';
import QuickActions from './components/QuickActions';

const AdminHRDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('dayflowUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      if (parsedUser?.role !== 'admin') {
        navigate('/employee-dashboard');
      }
    } else {
      navigate('/sign-up-registration');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('dayflowUser');
    setUser(null);
    navigate('/sign-up-registration');
  };

  const metricsData = [
  {
    title: "Total Employees",
    value: "248",
    subtitle: "Active workforce",
    icon: "Users",
    trend: "up",
    trendValue: "+12",
    variant: "default"
  },
  {
    title: "Attendance Rate",
    value: "94.2%",
    subtitle: "This week",
    icon: "Calendar",
    trend: "up",
    trendValue: "+2.3%",
    variant: "success"
  },
  {
    title: "Pending Leaves",
    value: "18",
    subtitle: "Awaiting approval",
    icon: "FileText",
    trend: "neutral",
    trendValue: "0",
    variant: "warning"
  },
  {
    title: "Payroll Status",
    value: "$842K",
    subtitle: "Monthly total",
    icon: "DollarSign",
    trend: "up",
    trendValue: "+5.1%",
    variant: "default"
  }];


  const employeesData = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@dayflow.com",
    employeeId: "EMP001",
    department: "Engineering",
    status: "Present",
    lastActivity: "Checked in at 9:15 AM",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a9e8814c-1763296696290.png",
    avatarAlt: "Professional headshot of woman with brown hair in business attire smiling at camera"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@dayflow.com",
    employeeId: "EMP002",
    department: "Marketing",
    status: "Present",
    lastActivity: "Checked in at 8:45 AM",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ea5c0096-1763294223103.png",
    avatarAlt: "Professional headshot of Asian man with short black hair wearing navy blue suit"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@dayflow.com",
    employeeId: "EMP003",
    department: "Human Resources",
    status: "Half-day",
    lastActivity: "Half-day leave approved",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1643a5bbd-1763300147010.png",
    avatarAlt: "Professional headshot of Hispanic woman with long dark hair in formal business attire"
  },
  {
    id: 4,
    name: "David Thompson",
    email: "david.thompson@dayflow.com",
    employeeId: "EMP004",
    department: "Finance",
    status: "Leave",
    lastActivity: "On sick leave",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12573b6e2-1763295501189.png",
    avatarAlt: "Professional headshot of man with blonde hair and glasses wearing gray suit"
  },
  {
    id: 5,
    name: "Priya Patel",
    email: "priya.patel@dayflow.com",
    employeeId: "EMP005",
    department: "Operations",
    status: "Present",
    lastActivity: "Checked in at 9:00 AM",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_140d5c4ac-1763301782456.png",
    avatarAlt: "Professional headshot of Indian woman with black hair wearing professional business attire"
  },
  {
    id: 6,
    name: "James Wilson",
    email: "james.wilson@dayflow.com",
    employeeId: "EMP006",
    department: "Sales",
    status: "Absent",
    lastActivity: "No check-in today",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10ac880b8-1763291923738.png",
    avatarAlt: "Professional headshot of African American man with short hair in dark business suit"
  },
  {
    id: 7,
    name: "Lisa Anderson",
    email: "lisa.anderson@dayflow.com",
    employeeId: "EMP007",
    department: "Design",
    status: "Present",
    lastActivity: "Checked in at 9:30 AM",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1216c049b-1763298495846.png",
    avatarAlt: "Professional headshot of woman with red hair wearing creative business casual attire"
  },
  {
    id: 8,
    name: "Robert Martinez",
    email: "robert.martinez@dayflow.com",
    employeeId: "EMP008",
    department: "Engineering",
    status: "Present",
    lastActivity: "Checked in at 8:30 AM",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1db44e0a2-1763294966953.png",
    avatarAlt: "Professional headshot of Hispanic man with dark hair and beard in business attire"
  }];


  const activitiesData = [
  {
    id: 1,
    type: "registration",
    user: "Alex Kumar",
    action: "completed onboarding process",
    details: "Employee ID: EMP249 | Department: Engineering",
    timestamp: new Date(Date.now() - 900000),
    requiresAction: false
  },
  {
    id: 2,
    type: "leave",
    user: "Jennifer Lee",
    action: "submitted leave request",
    details: "Paid Leave | Jan 15-17, 2026 | 3 days",
    timestamp: new Date(Date.now() - 1800000),
    requiresAction: true
  },
  {
    id: 3,
    type: "attendance",
    user: "Marcus Brown",
    action: "marked absent",
    details: "No check-in recorded for today",
    timestamp: new Date(Date.now() - 3600000),
    requiresAction: false
  },
  {
    id: 4,
    type: "leave",
    user: "Sophia Garcia",
    action: "submitted leave request",
    details: "Sick Leave | Jan 10-12, 2026 | 3 days",
    timestamp: new Date(Date.now() - 7200000),
    requiresAction: true
  },
  {
    id: 5,
    type: "profile",
    user: "Daniel Kim",
    action: "updated profile information",
    details: "Changed address and contact details",
    timestamp: new Date(Date.now() - 10800000),
    requiresAction: false
  },
  {
    id: 6,
    type: "attendance",
    user: "Rachel White",
    action: "checked in late",
    details: "Checked in at 10:45 AM",
    timestamp: new Date(Date.now() - 14400000),
    requiresAction: false
  },
  {
    id: 7,
    type: "leave",
    user: "Thomas Anderson",
    action: "submitted leave request",
    details: "Unpaid Leave | Jan 20-25, 2026 | 6 days",
    timestamp: new Date(Date.now() - 18000000),
    requiresAction: true
  },
  {
    id: 8,
    type: "payroll",
    user: "System",
    action: "generated monthly payroll",
    details: "December 2025 payroll processed successfully",
    timestamp: new Date(Date.now() - 86400000),
    requiresAction: false
  }];


  const attendanceChartData = [
  { day: 'Mon', present: 235, absent: 8, halfDay: 3, leave: 2 },
  { day: 'Tue', present: 238, absent: 5, halfDay: 4, leave: 1 },
  { day: 'Wed', present: 232, absent: 10, halfDay: 5, leave: 1 },
  { day: 'Thu', present: 240, absent: 4, halfDay: 2, leave: 2 },
  { day: 'Fri', present: 228, absent: 12, halfDay: 6, leave: 2 },
  { day: 'Sat', present: 180, absent: 60, halfDay: 5, leave: 3 },
  { day: 'Sun', present: 0, absent: 0, halfDay: 0, leave: 248 }];


  if (!user) {
    return null;
  }

  return (
    <RoleGuard requiredRole="admin" user={user}>
      <div className="min-h-screen bg-background">
        <AppHeader user={user} onLogout={handleLogout} />
        
        <div className="pt-16">
          <NavigationBreadcrumb user={user} />
          
          <main className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
                Admin Dashboard
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Comprehensive workforce management and oversight
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              {metricsData?.map((metric, index) =>
              <MetricsCard key={index} {...metric} />
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="lg:col-span-2">
                <EmployeeTable employees={employeesData} />
              </div>
              
              <div className="space-y-4 md:space-y-6">
                <QuickActions />
                <ActivityFeed activities={activitiesData} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:gap-6">
              <AttendanceChart data={attendanceChartData} />
            </div>
          </main>
        </div>
      </div>
    </RoleGuard>);

};

export default AdminHRDashboard;