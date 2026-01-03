import React from 'react';
import Icon from '../../../components/AppIcon';

const LeaveTypeCard = ({ type, balance, description, isSelected, onClick }) => {
  const typeConfig = {
    paid: {
      icon: 'Calendar',
      color: 'var(--color-success)',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/30'
    },
    sick: {
      icon: 'Heart',
      color: 'var(--color-warning)',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/30'
    },
    unpaid: {
      icon: 'CalendarX',
      color: 'var(--color-muted-foreground)',
      bgColor: 'bg-muted',
      borderColor: 'border-border'
    }
  };

  const config = typeConfig?.[type?.toLowerCase()] || typeConfig?.unpaid;

  return (
    <div
      onClick={onClick}
      className={`relative bg-card border-2 rounded-xl p-4 md:p-6 cursor-pointer transition-smooth hover:shadow-md ${
        isSelected 
          ? 'border-primary shadow-md' 
          : `${config?.borderColor} hover:border-primary/50`
      }`}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
          <Icon name="Check" size={14} color="white" />
        </div>
      )}
      <div className={`w-12 h-12 md:w-14 md:h-14 ${config?.bgColor} rounded-lg flex items-center justify-center mb-3 md:mb-4`}>
        <Icon name={config?.icon} size={24} color={config?.color} />
      </div>
      <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-1 md:mb-2">
        {type} Leave
      </h3>
      <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2">
        {description}
      </p>
      <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-border">
        <span className="text-xs md:text-sm font-caption text-muted-foreground">Balance</span>
        <span className="text-base md:text-lg font-heading font-semibold text-foreground">
          {balance} days
        </span>
      </div>
    </div>
  );
};

export default LeaveTypeCard;