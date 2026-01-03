import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AttendanceChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{payload?.[0]?.payload?.day}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: entry?.color }}></div>
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-medium text-foreground">{entry?.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2">
          Weekly Attendance Overview
        </h2>
        <p className="text-sm text-muted-foreground">
          Attendance trends for the current week
        </p>
      </div>

      <div className="w-full h-64 md:h-80 lg:h-96" aria-label="Weekly Attendance Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="day" 
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--color-border)' }}
            />
            <YAxis 
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--color-border)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
            <Bar dataKey="present" fill="var(--color-success)" radius={[4, 4, 0, 0]} name="Present" />
            <Bar dataKey="absent" fill="var(--color-error)" radius={[4, 4, 0, 0]} name="Absent" />
            <Bar dataKey="halfDay" fill="var(--color-warning)" radius={[4, 4, 0, 0]} name="Half-day" />
            <Bar dataKey="leave" fill="var(--color-primary)" radius={[4, 4, 0, 0]} name="Leave" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceChart;