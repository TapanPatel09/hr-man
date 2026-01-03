import React from 'react';
import Icon from '../../../components/AppIcon';

const WeeklyAttendanceTable = ({ weekData, currentWeek }) => {
  const getStatusIcon = (status) => {
    const icons = {
      'Present': { name: 'CheckCircle', color: 'var(--color-success)' },
      'Absent': { name: 'XCircle', color: 'var(--color-error)' },
      'Half-day': { name: 'Clock', color: 'var(--color-warning)' },
      'Leave': { name: 'Calendar', color: 'var(--color-primary)' }
    };
    return icons?.[status] || { name: 'Circle', color: 'var(--color-muted-foreground)' };
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Present': 'bg-success/20 text-success',
      'Absent': 'bg-error/20 text-error',
      'Half-day': 'bg-warning/20 text-warning',
      'Leave': 'bg-primary/20 text-primary'
    };
    return colors?.[status] || 'bg-muted text-muted-foreground';
  };

  const calculateWeekStats = () => {
    const stats = {
      present: 0,
      absent: 0,
      halfDay: 0,
      leave: 0,
      totalHours: 0
    };

    weekData?.forEach(day => {
      if (day?.status === 'Present') stats.present++;
      else if (day?.status === 'Absent') stats.absent++;
      else if (day?.status === 'Half-day') stats.halfDay++;
      else if (day?.status === 'Leave') stats.leave++;

      if (day?.workHours) {
        stats.totalHours += parseFloat(day?.workHours);
      }
    });

    return stats;
  };

  const stats = calculateWeekStats();
  const weekStart = currentWeek?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const weekEnd = new Date(currentWeek.getTime() + 6 * 24 * 60 * 60 * 1000)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-1">
              Weekly Attendance
            </h3>
            <p className="text-sm text-muted-foreground">
              {weekStart} - {weekEnd}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-primary/10 rounded-md">
              <span className="text-sm font-caption text-primary font-medium">
                {stats?.present} / {weekData?.length} Days
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-caption font-medium text-muted-foreground">
                Date
              </th>
              <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-caption font-medium text-muted-foreground">
                Day
              </th>
              <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-caption font-medium text-muted-foreground">
                Status
              </th>
              <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-caption font-medium text-muted-foreground">
                Check In
              </th>
              <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-caption font-medium text-muted-foreground">
                Check Out
              </th>
              <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-caption font-medium text-muted-foreground">
                Work Hours
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {weekData?.map((day, index) => {
              const icon = getStatusIcon(day?.status);
              return (
                <tr key={index} className="hover:bg-muted/30 transition-smooth">
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <span className="text-sm md:text-base font-medium text-foreground">
                      {day?.date}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <span className="text-sm md:text-base text-muted-foreground">
                      {day?.day}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <div className="flex items-center gap-2">
                      <Icon name={icon?.name} size={18} color={icon?.color} />
                      <span className={`px-2 md:px-3 py-1 rounded-md text-xs md:text-sm font-medium ${getStatusBadge(day?.status)}`}>
                        {day?.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <span className="text-sm md:text-base text-foreground">
                      {day?.checkIn || '--:--'}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <span className="text-sm md:text-base text-foreground">
                      {day?.checkOut || '--:--'}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <span className="text-sm md:text-base font-medium text-foreground">
                      {day?.workHours || '--'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="p-4 md:p-6 border-t border-border bg-muted/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="flex flex-col">
            <span className="text-xs md:text-sm font-caption text-muted-foreground mb-1">Total Hours</span>
            <span className="text-lg md:text-xl font-semibold text-foreground">{stats?.totalHours?.toFixed(1)}h</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs md:text-sm font-caption text-muted-foreground mb-1">Present Days</span>
            <span className="text-lg md:text-xl font-semibold text-success">{stats?.present}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs md:text-sm font-caption text-muted-foreground mb-1">Half Days</span>
            <span className="text-lg md:text-xl font-semibold text-warning">{stats?.halfDay}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs md:text-sm font-caption text-muted-foreground mb-1">Absent/Leave</span>
            <span className="text-lg md:text-xl font-semibold text-error">{stats?.absent + stats?.leave}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyAttendanceTable;