import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityNotification = ({ type, title, message, timestamp, status }) => {
  const typeConfig = {
    leave: {
      icon: 'FileText',
      bgColor: 'bg-primary/10',
      iconColor: 'var(--color-primary)'
    },
    attendance: {
      icon: 'Calendar',
      bgColor: 'bg-warning/10',
      iconColor: 'var(--color-warning)'
    },
    announcement: {
      icon: 'Bell',
      bgColor: 'bg-accent/10',
      iconColor: 'var(--color-accent)'
    },
    approval: {
      icon: 'CheckCircle',
      bgColor: 'bg-success/10',
      iconColor: 'var(--color-success)'
    }
  };

  const config = typeConfig?.[type] || typeConfig?.announcement;

  const statusColors = {
    approved: 'text-success bg-success/10',
    rejected: 'text-error bg-error/10',
    pending: 'text-warning bg-warning/10'
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  return (
    <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-card border border-border rounded-lg hover:shadow-md transition-smooth">
      <div className={`${config?.bgColor} w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
        <Icon name={config?.icon} size={20} color={config?.iconColor} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="text-sm md:text-base font-heading font-semibold text-foreground">{title}</h4>
          {status && (
            <span className={`${statusColors?.[status]} text-xs font-caption font-medium px-2 py-1 rounded-md whitespace-nowrap`}>
              {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
            </span>
          )}
        </div>
        <p className="text-xs md:text-sm text-muted-foreground mb-2 line-clamp-2">{message}</p>
        <p className="text-xs text-muted-foreground font-caption flex items-center gap-1">
          <Icon name="Clock" size={12} />
          <span>{getTimeAgo(timestamp)}</span>
        </p>
      </div>
    </div>
  );
};

export default ActivityNotification;