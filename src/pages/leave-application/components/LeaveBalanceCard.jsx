import React from 'react';
import Icon from '../../../components/AppIcon';

const LeaveBalanceCard = ({ balances }) => {
  const balanceItems = [
    {
      type: 'Paid Leave',
      available: balances?.paid,
      total: 20,
      icon: 'Calendar',
      color: 'var(--color-success)',
      bgColor: 'bg-success/10'
    },
    {
      type: 'Sick Leave',
      available: balances?.sick,
      total: 12,
      icon: 'Heart',
      color: 'var(--color-warning)',
      bgColor: 'bg-warning/10'
    },
    {
      type: 'Unpaid Leave',
      available: '∞',
      total: '∞',
      icon: 'CalendarX',
      color: 'var(--color-muted-foreground)',
      bgColor: 'bg-muted'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <div className="flex items-center gap-3 mb-4 md:mb-5">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="PieChart" size={20} color="var(--color-primary)" />
        </div>
        <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
          Leave Balance Overview
        </h3>
      </div>
      <div className="space-y-3 md:space-y-4">
        {balanceItems?.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 md:p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${item?.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon name={item?.icon} size={18} color={item?.color} />
              </div>
              <div>
                <p className="text-sm md:text-base font-caption font-medium text-foreground">
                  {item?.type}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Available / Total
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg md:text-xl font-heading font-bold text-foreground">
                {item?.available}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                of {item?.total}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 md:mt-5 pt-4 md:pt-5 border-t border-border">
        <div className="flex items-center justify-between text-xs md:text-sm">
          <span className="text-muted-foreground">Pending Requests</span>
          <span className="font-caption font-medium text-warning">2 requests</span>
        </div>
      </div>
    </div>
  );
};

export default LeaveBalanceCard;