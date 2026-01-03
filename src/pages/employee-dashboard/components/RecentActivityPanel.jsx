import React from 'react';
import Icon from '../../../components/AppIcon';
import ActivityNotification from './ActivityNotification';

const RecentActivityPanel = ({ activities }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Activity" size={24} color="var(--color-primary)" />
          </div>
          <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">Recent Activity</h2>
        </div>
        <button className="text-sm md:text-base text-primary hover:text-primary/80 font-caption font-medium transition-smooth flex items-center gap-2">
          <span>View All</span>
          <Icon name="ArrowRight" size={16} />
        </button>
      </div>
      <div className="space-y-3 md:space-y-4">
        {activities?.length > 0 ? (
          activities?.map((activity) => (
            <ActivityNotification
              key={activity?.id}
              type={activity?.type}
              title={activity?.title}
              message={activity?.message}
              timestamp={activity?.timestamp}
              status={activity?.status}
            />
          ))
        ) : (
          <div className="text-center py-8 md:py-12">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Inbox" size={32} color="var(--color-muted-foreground)" />
            </div>
            <p className="text-sm md:text-base text-muted-foreground font-caption">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivityPanel;