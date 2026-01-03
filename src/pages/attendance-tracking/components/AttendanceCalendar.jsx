import React from 'react';


const AttendanceCalendar = ({ currentDate, attendanceData, onDateSelect, selectedDate }) => {
  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const monthName = currentDate?.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  const getAttendanceStatus = (day) => {
    const dateStr = `${currentDate?.getFullYear()}-${String(currentDate?.getMonth() + 1)?.padStart(2, '0')}-${String(day)?.padStart(2, '0')}`;
    return attendanceData?.[dateStr] || null;
  };

  const getStatusColor = (status) => {
    const colors = {
      'Present': 'bg-success/20 text-success border-success/30',
      'Absent': 'bg-error/20 text-error border-error/30',
      'Half-day': 'bg-warning/20 text-warning border-warning/30',
      'Leave': 'bg-primary/20 text-primary border-primary/30'
    };
    return colors?.[status] || 'bg-muted text-muted-foreground border-border';
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today?.getDate() && 
           currentDate?.getMonth() === today?.getMonth() && 
           currentDate?.getFullYear() === today?.getFullYear();
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    return day === selectedDate?.getDate() && 
           currentDate?.getMonth() === selectedDate?.getMonth() && 
           currentDate?.getFullYear() === selectedDate?.getFullYear();
  };

  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days?.push(<div key={`empty-${i}`} className="aspect-square" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const status = getAttendanceStatus(day);
    const today = isToday(day);
    const selected = isSelected(day);
    
    days?.push(
      <button
        key={day}
        onClick={() => onDateSelect(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
        className={`aspect-square rounded-lg border-2 transition-smooth hover:scale-105 flex flex-col items-center justify-center gap-1 p-2 ${
          selected ? 'ring-2 ring-primary ring-offset-2' : ''
        } ${today ? 'border-primary' : getStatusColor(status)}`}
      >
        <span className={`text-sm md:text-base font-medium ${today ? 'text-primary' : ''}`}>
          {day}
        </span>
        {status && (
          <div className="flex items-center gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${
              status === 'Present' ? 'bg-success' :
              status === 'Absent' ? 'bg-error' :
              status === 'Half-day'? 'bg-warning' : 'bg-primary'
            }`} />
            <span className="text-xs font-caption hidden lg:block">{status}</span>
          </div>
        )}
      </button>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
          {monthName}
        </h3>
      </div>
      <div className="grid grid-cols-7 gap-2 md:gap-3 mb-2 md:mb-3">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']?.map(day => (
          <div key={day} className="text-center text-xs md:text-sm font-caption font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 md:gap-3">
        {days}
      </div>
      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { label: 'Present', color: 'bg-success', count: Object.values(attendanceData)?.filter(s => s === 'Present')?.length },
            { label: 'Absent', color: 'bg-error', count: Object.values(attendanceData)?.filter(s => s === 'Absent')?.length },
            { label: 'Half-day', color: 'bg-warning', count: Object.values(attendanceData)?.filter(s => s === 'Half-day')?.length },
            { label: 'Leave', color: 'bg-primary', count: Object.values(attendanceData)?.filter(s => s === 'Leave')?.length }
          ]?.map(item => (
            <div key={item?.label} className="flex items-center gap-2 md:gap-3">
              <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${item?.color}`} />
              <div className="flex flex-col">
                <span className="text-xs md:text-sm font-caption text-muted-foreground">{item?.label}</span>
                <span className="text-base md:text-lg font-semibold text-foreground">{item?.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalendar;