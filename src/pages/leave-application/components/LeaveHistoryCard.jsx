import React from 'react';
import Icon from '../../../components/AppIcon';

const LeaveHistoryCard = ({ request }) => {
  const statusConfig = {
    pending: {
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      label: 'Pending'
    },
    approved: {
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      label: 'Approved'
    },
    rejected: {
      icon: 'XCircle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      label: 'Rejected'
    }
  };

  const config = statusConfig?.[request?.status?.toLowerCase()] || statusConfig?.pending;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-5 transition-smooth hover:shadow-md">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 md:mb-2">
            <h4 className="text-sm md:text-base font-heading font-semibold text-foreground">
              {request?.leaveType} Leave
            </h4>
            <span className="text-xs md:text-sm font-caption text-muted-foreground">
              #{request?.requestId}
            </span>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">
            {formatDate(request?.startDate)} - {formatDate(request?.endDate)} ({calculateDays(request?.startDate, request?.endDate)} days)
          </p>
        </div>

        <div className={`flex items-center gap-1.5 px-2.5 md:px-3 py-1 md:py-1.5 rounded-md ${config?.bgColor} flex-shrink-0`}>
          <Icon name={config?.icon} size={14} className={config?.color} />
          <span className={`text-xs md:text-sm font-caption font-medium ${config?.color}`}>
            {config?.label}
          </span>
        </div>
      </div>
      {request?.remarks && (
        <div className="mb-3 md:mb-4">
          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
            {request?.remarks}
          </p>
        </div>
      )}
      {request?.managerComment && (
        <div className="bg-muted/50 rounded-md p-3 md:p-4 border-l-4 border-primary">
          <div className="flex items-center gap-2 mb-1.5 md:mb-2">
            <Icon name="MessageSquare" size={14} color="var(--color-primary)" />
            <span className="text-xs md:text-sm font-caption font-medium text-foreground">
              Manager Comment
            </span>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">
            {request?.managerComment}
          </p>
        </div>
      )}
      <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-border mt-3 md:mt-4">
        <span className="text-xs md:text-sm font-caption text-muted-foreground">
          Applied on {formatDate(request?.appliedDate)}
        </span>
        {request?.approvedDate && (
          <span className="text-xs md:text-sm font-caption text-muted-foreground">
            {config?.label} on {formatDate(request?.approvedDate)}
          </span>
        )}
      </div>
    </div>
  );
};

export default LeaveHistoryCard;