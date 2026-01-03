import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Attendance Report',
      icon: 'FileBarChart',
      variant: 'default',
      onClick: () => navigate('/attendance-tracking')
    },
    {
      label: 'Approve Leaves',
      icon: 'CheckCircle',
      variant: 'success',
      onClick: () => navigate('/leave-application')
    },
    {
      label: 'Add Employee',
      icon: 'UserPlus',
      variant: 'outline',
      onClick: () => navigate('/sign-up-registration')
    },
    {
      label: 'Export Data',
      icon: 'Download',
      variant: 'secondary',
      onClick: () => alert('Export functionality will be available soon')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions?.map((action, index) => (
          <Button
            key={index}
            variant={action?.variant}
            iconName={action?.icon}
            iconPosition="left"
            onClick={action?.onClick}
            fullWidth
            className="justify-start"
          >
            {action?.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;