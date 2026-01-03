import React from 'react';
import Icon from '../../../components/AppIcon';

const PolicyInfoPanel = ({ leaveType }) => {
  const policyData = {
    paid: {
      title: 'Paid Leave Policy',
      icon: 'Info',
      color: 'var(--color-success)',
      bgColor: 'bg-success/10',
      rules: [
        'Minimum 2 days notice required for planned leave',
        'Maximum 15 consecutive days per request',
        'Annual allocation: 20 days per year',
        'Unused balance carries forward to next year (max 10 days)',
        'Requires manager approval for requests &gt; 5 days'
      ]
    },
    sick: {
      title: 'Sick Leave Policy',
      icon: 'AlertCircle',
      color: 'var(--color-warning)',
      bgColor: 'bg-warning/10',
      rules: [
        'Can be applied on same day for emergencies',
        'Medical certificate required for &gt; 3 consecutive days',
        'Annual allocation: 12 days per year',
        'Does not carry forward to next year',
        'Manager notification required within 2 hours of absence'
      ]
    },
    unpaid: {
      title: 'Unpaid Leave Policy',
      icon: 'AlertTriangle',
      color: 'var(--color-muted-foreground)',
      bgColor: 'bg-muted',
      rules: [
        'Minimum 7 days notice required',
        'Subject to business requirements and approval',
        'No salary paid during unpaid leave period',
        'Benefits may be affected during extended unpaid leave',
        'Requires senior management approval'
      ]
    }
  };

  const policy = policyData?.[leaveType?.toLowerCase()] || policyData?.paid;

  return (
    <div className={`${policy?.bgColor} border border-border rounded-xl p-4 md:p-6`}>
      <div className="flex items-center gap-3 mb-4 md:mb-5">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-card rounded-lg flex items-center justify-center">
          <Icon name={policy?.icon} size={20} color={policy?.color} />
        </div>
        <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
          {policy?.title}
        </h3>
      </div>
      <ul className="space-y-2.5 md:space-y-3">
        {policy?.rules?.map((rule, index) => (
          <li key={index} className="flex items-start gap-2.5 md:gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              {rule}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 md:mt-5 pt-4 md:pt-5 border-t border-border">
        <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
          <Icon name="Calendar" size={16} />
          <span>Policy effective from January 2026</span>
        </div>
      </div>
    </div>
  );
};

export default PolicyInfoPanel;