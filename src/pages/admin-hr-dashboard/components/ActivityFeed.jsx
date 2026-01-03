import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      'registration': 'UserPlus',
      'leave': 'FileText',
      'attendance': 'Calendar',
      'profile': 'User',
      'payroll': 'DollarSign'
    };
    return icons?.[type] || 'Bell';
  };

  const getActivityColor = (type) => {
    const colors = {
      'registration': 'bg-success/10 text-success',
      'leave': 'bg-warning/10 text-warning',
      'attendance': 'bg-primary/10 text-primary',
      'profile': 'bg-secondary/10 text-secondary',
      'payroll': 'bg-accent/10 text-accent'
    };
    return colors?.[type] || 'bg-muted text-muted-foreground';
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffMs = now - activityTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return activityTime?.toLocaleDateString();
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">
            Recent Activity
          </h2>
          <button className="text-sm font-caption text-primary hover:text-primary/80 transition-smooth">
            View All
          </button>
        </div>
      </div>
      <div className="divide-y divide-border max-h-96 md:max-h-[500px] overflow-y-auto">
        {activities?.map((activity) => (
          <div key={activity?.id} className="p-4 md:p-6 hover:bg-muted/30 transition-smooth">
            <div className="flex gap-3 md:gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={18} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground mb-1">
                  <span className="font-medium">{activity?.user}</span>
                  {' '}
                  <span className="text-muted-foreground">{activity?.action}</span>
                </p>
                
                {activity?.details && (
                  <p className="text-xs text-muted-foreground mb-2">
                    {activity?.details}
                  </p>
                )}
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon name="Clock" size={12} />
                  <span>{formatTime(activity?.timestamp)}</span>
                </div>
              </div>

              {activity?.requiresAction && (
                <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-xs font-caption font-medium hover:bg-primary/90 transition-smooth flex-shrink-0">
                  Review
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;