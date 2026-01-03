import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsCard = ({ icon, label, value, subtext, variant = 'default' }) => {
  const variantStyles = {
    default: 'bg-card border-border',
    success: 'bg-success/5 border-success/20',
    warning: 'bg-warning/5 border-warning/20',
    primary: 'bg-primary/5 border-primary/20'
  };

  const iconColors = {
    default: 'var(--color-primary)',
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    primary: 'var(--color-primary)'
  };

  return (
    <div className={`${variantStyles?.[variant]} border rounded-xl p-4 md:p-5 lg:p-6 transition-smooth hover:shadow-md`}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name={icon} size={24} color={iconColors?.[variant]} />
        </div>
      </div>
      <div>
        <p className="text-xs md:text-sm font-caption text-muted-foreground mb-1">{label}</p>
        <p className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-1">{value}</p>
        {subtext && (
          <p className="text-xs md:text-sm text-muted-foreground font-caption">{subtext}</p>
        )}
      </div>
    </div>
  );
};

export default QuickStatsCard;