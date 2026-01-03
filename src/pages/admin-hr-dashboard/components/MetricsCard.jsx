import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, subtitle, icon, trend, trendValue, variant = 'default' }) => {
  const variantColors = {
    default: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error'
  };

  const trendColors = {
    up: 'text-success',
    down: 'text-error',
    neutral: 'text-muted-foreground'
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 transition-smooth hover:shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center ${variantColors?.[variant]}`}>
          <Icon name={icon} size={20} className="md:w-6 md:h-6" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs md:text-sm font-caption font-medium ${trendColors?.[trend]}`}>
            <Icon name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} size={14} />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-1">
        {value}
      </h3>
      <p className="text-xs md:text-sm font-caption text-muted-foreground mb-2">
        {title}
      </p>
      {subtitle && (
        <p className="text-xs text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default MetricsCard;