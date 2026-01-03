import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const DashboardCard = ({ 
  title, 
  description, 
  icon, 
  path, 
  statusIndicator, 
  statusText,
  statusVariant = 'default'
}) => {
  const navigate = useNavigate();

  const statusColors = {
    default: 'bg-muted text-muted-foreground',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error',
    primary: 'bg-primary/10 text-primary'
  };

  const handleClick = () => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group relative bg-card border border-border rounded-xl p-8 cursor-pointer transition-smooth hover:shadow-lg hover:-translate-y-1 active:scale-97"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center transition-smooth group-hover:bg-primary/20 group-hover:scale-110">
          <Icon name={icon} size={28} color="var(--color-primary)" />
        </div>

        {statusIndicator && (
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-caption font-medium ${statusColors?.[statusVariant]}`}>
            {statusIndicator && <Icon name={statusIndicator} size={14} />}
            {statusText && <span>{statusText}</span>}
          </div>
        )}
      </div>
      <h3 className="text-xl font-heading font-semibold text-foreground mb-2 transition-smooth group-hover:text-primary">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {description}
      </p>
      <div className="flex items-center gap-2 text-primary font-caption text-sm font-medium transition-smooth group-hover:gap-3">
        <span>View Details</span>
        <Icon name="ArrowRight" size={16} />
      </div>
    </div>
  );
};

export default DashboardCard;