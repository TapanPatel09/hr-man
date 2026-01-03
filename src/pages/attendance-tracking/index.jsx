import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import RoleGuard from '../../components/ui/RoleGuard';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AttendanceCalendar from './components/AttendanceCalendar';
import CheckInOutCard from './components/CheckInOutCard';
import WeeklyAttendanceTable from './components/WeeklyAttendanceTable';
import EmployeeAttendanceList from './components/EmployeeAttendanceList';
import AttendanceDetailsModal from './components/AttendanceDetailsModal';

const AttendanceTracking = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [viewMode, setViewMode] = useState('daily');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/sign-up-registration');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    navigate('/sign-up-registration');
  };

  const employeeAttendanceData = {
    '2026-01-01': 'Present',
    '2026-01-02': 'Present',
    '2025-12-31': 'Present',
    '2025-12-30': 'Half-day',
    '2025-12-27': 'Present',
    '2025-12-26': 'Leave',
    '2025-12-25': 'Leave',
    '2025-12-24': 'Present',
    '2025-12-23': 'Present',
    '2025-12-20': 'Present',
    '2025-12-19': 'Absent',
    '2025-12-18': 'Present',
    '2025-12-17': 'Present',
    '2025-12-16': 'Present',
    '2025-12-13': 'Present',
    '2025-12-12': 'Half-day',
    '2025-12-11': 'Present',
    '2025-12-10': 'Present',
    '2025-12-09': 'Present',
    '2025-12-06': 'Present',
    '2025-12-05': 'Present',
    '2025-12-04': 'Present',
    '2025-12-03': 'Present',
    '2025-12-02': 'Present'
  };

  const todayStatus = {
    status: 'Present',
    checkIn: '09:15 AM',
    checkOut: '06:30 PM'
  };

  const weeklyData = [
  { date: '12/30/2025', day: 'Monday', status: 'Present', checkIn: '09:00 AM', checkOut: '06:15 PM', workHours: '9.25' },
  { date: '12/31/2025', day: 'Tuesday', status: 'Present', checkIn: '09:15 AM', checkOut: '06:30 PM', workHours: '9.25' },
  { date: '01/01/2026', day: 'Wednesday', status: 'Leave', checkIn: '--', checkOut: '--', workHours: '--' },
  { date: '01/02/2026', day: 'Thursday', status: 'Present', checkIn: '09:00 AM', checkOut: '06:00 PM', workHours: '9.00' },
  { date: '01/03/2026', day: 'Friday', status: 'Present', checkIn: '09:15 AM', checkOut: '--', workHours: '--' }];


  const allEmployees = [
  {
    employeeId: 'EMP001',
    name: 'Sarah Johnson',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14da91c34-1763294780479.png",
    avatarAlt: 'Professional headshot of Sarah Johnson with shoulder-length brown hair wearing navy blue blazer',
    department: 'Engineering',
    todayStatus: 'Present',
    checkIn: '09:00 AM',
    checkOut: '06:15 PM'
  },
  {
    employeeId: 'EMP002',
    name: 'Michael Chen',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a9bc19f1-1763292173746.png",
    avatarAlt: 'Professional headshot of Michael Chen with short black hair wearing gray suit',
    department: 'Marketing',
    todayStatus: 'Present',
    checkIn: '09:15 AM',
    checkOut: '06:30 PM'
  },
  {
    employeeId: 'EMP003',
    name: 'Emily Rodriguez',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18fea03cd-1763298755013.png",
    avatarAlt: 'Professional headshot of Emily Rodriguez with long dark hair wearing white blouse',
    department: 'Sales',
    todayStatus: 'Half-day',
    checkIn: '09:30 AM',
    checkOut: '01:45 PM'
  },
  {
    employeeId: 'EMP004',
    name: 'David Thompson',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c0e7d6e5-1763291694066.png",
    avatarAlt: 'Professional headshot of David Thompson with blonde hair wearing blue shirt',
    department: 'Engineering',
    todayStatus: 'Absent',
    checkIn: '--',
    checkOut: '--'
  },
  {
    employeeId: 'EMP005',
    name: 'Lisa Anderson',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1076a9ac3-1763295560026.png",
    avatarAlt: 'Professional headshot of Lisa Anderson with red hair wearing green blazer',
    department: 'HR',
    todayStatus: 'Leave',
    checkIn: '--',
    checkOut: '--'
  },
  {
    employeeId: 'EMP006',
    name: 'James Wilson',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a77e6824-1763296279560.png",
    avatarAlt: 'Professional headshot of James Wilson with dark hair wearing black suit',
    department: 'Finance',
    todayStatus: 'Present',
    checkIn: '08:45 AM',
    checkOut: '06:00 PM'
  }];


  const handleCheckIn = () => {
    const now = new Date();
    const timeString = now?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    console.log('Checked in at:', timeString);
  };

  const handleCheckOut = () => {
    const now = new Date();
    const timeString = now?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    console.log('Checked out at:', timeString);
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handlePreviousWeek = () => {
    setCurrentDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000));
  };

  const handleNextWeek = () => {
    setCurrentDate(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000));
  };

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = (employee) => {
    console.log('Update status for:', employee?.name);
  };

  if (!user) {
    return null;
  }

  return (
    <RoleGuard user={user}>
      <div className="min-h-screen bg-background">
        <AppHeader user={user} onLogout={handleLogout} />

        <div className="pt-16">
          <NavigationBreadcrumb user={user} />

          <main className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
            <div className="mb-6 md:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
                    Attendance Tracking
                  </h1>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {user?.role === 'admin' ? 'Monitor and manage employee attendance records' : 'Track your daily attendance and work hours'}
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('daily')}
                    className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-md text-sm font-caption transition-smooth ${
                    viewMode === 'daily' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`
                    }>

                    <Icon name="Calendar" size={18} />
                    <span className="hidden sm:inline">Daily</span>
                  </button>
                  <button
                    onClick={() => setViewMode('weekly')}
                    className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-md text-sm font-caption transition-smooth ${
                    viewMode === 'weekly' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`
                    }>

                    <Icon name="CalendarDays" size={18} />
                    <span className="hidden sm:inline">Weekly</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between bg-card border border-border rounded-lg p-3 md:p-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={viewMode === 'daily' ? handlePreviousMonth : handlePreviousWeek}
                  iconName="ChevronLeft" />

                <span className="text-sm md:text-base font-medium text-foreground">
                  {viewMode === 'daily' ? currentDate?.toLocaleString('en-US', { month: 'long', year: 'numeric' }) :
                  `Week of ${currentDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                  }
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={viewMode === 'daily' ? handleNextMonth : handleNextWeek}
                  iconName="ChevronRight" />

              </div>
            </div>

            {user?.role === 'employee' ?
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-2">
                  {viewMode === 'daily' ?
                <AttendanceCalendar
                  currentDate={currentDate}
                  attendanceData={employeeAttendanceData}
                  onDateSelect={setSelectedDate}
                  selectedDate={selectedDate} /> :


                <WeeklyAttendanceTable
                  weekData={weeklyData}
                  currentWeek={currentDate} />

                }
                </div>

                <div className="lg:col-span-1">
                  <CheckInOutCard
                  onCheckIn={handleCheckIn}
                  onCheckOut={handleCheckOut}
                  todayStatus={todayStatus} />

                </div>
              </div> :

            <div className="space-y-6 md:space-y-8">
                {viewMode === 'daily' ?
              <EmployeeAttendanceList
                employees={allEmployees}
                onViewDetails={handleViewDetails}
                onUpdateStatus={handleUpdateStatus} /> :


              <div className="grid grid-cols-1 gap-6 md:gap-8">
                    {allEmployees?.slice(0, 3)?.map((employee) =>
                <WeeklyAttendanceTable
                  key={employee?.employeeId}
                  weekData={weeklyData}
                  currentWeek={currentDate} />

                )}
                  </div>
              }
              </div>
            }
          </main>
        </div>

        <AttendanceDetailsModal
          employee={selectedEmployee}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)} />

      </div>
    </RoleGuard>);

};

export default AttendanceTracking;