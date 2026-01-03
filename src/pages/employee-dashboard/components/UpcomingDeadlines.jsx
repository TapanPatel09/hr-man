import React from 'react';
import Icon from '../../../components/AppIcon';

const UpcomingDeadlines = ({ deadlines }) => {
  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-error bg-error/10 border-error/20',
      medium: 'text-warning bg-warning/10 border-warning/20',
      low: 'text-success bg-success/10 border-success/20'
    };
    return colors?.[priority] || colors?.medium;
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDaysRemaining = (date) => {
    const now = new Date();
    const diff = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
    if (diff < 0) return 'Overdue';
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    return `${diff} days`;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
          <Icon name="AlertCircle" size={24} color="var(--color-warning)" />
        </div>
        <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">Upcoming Deadlines</h2>
      </div>
      <div className="space-y-3 md:space-y-4">
        {deadlines?.length > 0 ? (
          deadlines?.map((deadline) => (
            <div key={deadline?.id} className="flex items-start gap-3 p-3 md:p-4 bg-muted/50 rounded-lg border border-border">
              <div className={`${getPriorityColor(deadline?.priority)} px-2 py-1 rounded-md text-xs font-caption font-medium whitespace-nowrap`}>
                {deadline?.priority?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm md:text-base font-heading font-semibold text-foreground mb-1">{deadline?.title}</h4>
                <p className="text-xs md:text-sm text-muted-foreground mb-2 line-clamp-2">{deadline?.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-caption">
                  <span className="flex items-center gap-1">
                    <Icon name="Calendar" size={12} />
                    {formatDate(deadline?.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Clock" size={12} />
                    {getDaysRemaining(deadline?.date)}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 md:py-12">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} color="var(--color-success)" />
            </div>
            <p className="text-sm md:text-base text-muted-foreground font-caption">No upcoming deadlines</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingDeadlines;