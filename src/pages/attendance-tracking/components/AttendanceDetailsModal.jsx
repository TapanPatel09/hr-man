import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AttendanceDetailsModal = ({ employee, onClose, isOpen }) => {
  if (!isOpen || !employee) return null;

  const monthlyStats = {
    totalDays: 22,
    present: 18,
    absent: 2,
    halfDay: 1,
    leave: 1,
    totalHours: 162.5,
    avgHours: 9.0
  };

  const recentAttendance = [
    { date: '01/02/2026', day: 'Thursday', status: 'Present', checkIn: '09:15 AM', checkOut: '06:30 PM', hours: '9.25' },
    { date: '12/31/2025', day: 'Wednesday', status: 'Present', checkIn: '09:00 AM', checkOut: '06:15 PM', hours: '9.25' },
    { date: '12/30/2025', day: 'Tuesday', status: 'Half-day', checkIn: '09:30 AM', checkOut: '01:45 PM', hours: '4.25' },
    { date: '12/27/2025', day: 'Monday', status: 'Present', checkIn: '08:45 AM', checkOut: '06:00 PM', hours: '9.25' },
    { date: '12/26/2025', day: 'Friday', status: 'Leave', checkIn: '--', checkOut: '--', hours: '--' }
  ];

  const getStatusBadge = (status) => {
    const colors = {
      'Present': 'bg-success/20 text-success',
      'Absent': 'bg-error/20 text-error',
      'Half-day': 'bg-warning/20 text-warning',
      'Leave': 'bg-primary/20 text-primary'
    };
    return colors?.[status] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 md:p-6 border-b border-border flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
            Attendance Details
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
          />
        </div>

        <div className="overflow-y-auto flex-1 p-4 md:p-6">
          <div className="bg-muted/50 rounded-lg p-4 md:p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={employee?.avatar}
                  alt={employee?.avatarAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-1">
                  {employee?.name}
                </h4>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="Hash" size={14} />
                    {employee?.employeeId}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Briefcase" size={14} />
                    {employee?.department}
                  </span>
                </div>
              </div>
              <div className={`px-3 py-1.5 rounded-md text-sm font-medium ${getStatusBadge(employee?.todayStatus)}`}>
                {employee?.todayStatus}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-base md:text-lg font-heading font-semibold text-foreground mb-4">
              Monthly Summary
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Calendar" size={18} color="var(--color-primary)" />
                  <span className="text-xs md:text-sm font-caption text-muted-foreground">Total Days</span>
                </div>
                <p className="text-xl md:text-2xl font-semibold text-foreground">{monthlyStats?.totalDays}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="CheckCircle" size={18} color="var(--color-success)" />
                  <span className="text-xs md:text-sm font-caption text-muted-foreground">Present</span>
                </div>
                <p className="text-xl md:text-2xl font-semibold text-success">{monthlyStats?.present}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Clock" size={18} color="var(--color-warning)" />
                  <span className="text-xs md:text-sm font-caption text-muted-foreground">Half-day</span>
                </div>
                <p className="text-xl md:text-2xl font-semibold text-warning">{monthlyStats?.halfDay}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="XCircle" size={18} color="var(--color-error)" />
                  <span className="text-xs md:text-sm font-caption text-muted-foreground">Absent/Leave</span>
                </div>
                <p className="text-xl md:text-2xl font-semibold text-error">{monthlyStats?.absent + monthlyStats?.leave}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-base md:text-lg font-heading font-semibold text-foreground mb-4">
              Recent Attendance
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs md:text-sm font-caption font-medium text-muted-foreground">Date</th>
                    <th className="text-left px-4 py-3 text-xs md:text-sm font-caption font-medium text-muted-foreground">Day</th>
                    <th className="text-left px-4 py-3 text-xs md:text-sm font-caption font-medium text-muted-foreground">Status</th>
                    <th className="text-left px-4 py-3 text-xs md:text-sm font-caption font-medium text-muted-foreground">Check In</th>
                    <th className="text-left px-4 py-3 text-xs md:text-sm font-caption font-medium text-muted-foreground">Check Out</th>
                    <th className="text-left px-4 py-3 text-xs md:text-sm font-caption font-medium text-muted-foreground">Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentAttendance?.map((record, index) => (
                    <tr key={index} className="hover:bg-muted/30 transition-smooth">
                      <td className="px-4 py-3 text-sm text-foreground">{record?.date}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{record?.day}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusBadge(record?.status)}`}>
                          {record?.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground">{record?.checkIn}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{record?.checkOut}</td>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{record?.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 border-t border-border flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="default" iconName="Download" iconPosition="left">
            Export Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDetailsModal;