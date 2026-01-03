import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const badges = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: 'Your data is protected with 256-bit encryption'
    },
    {
      icon: 'Lock',
      title: 'GDPR Compliant',
      description: 'We follow strict data privacy regulations'
    },
    {
      icon: 'CheckCircle2',
      title: 'SOC 2 Certified',
      description: 'Enterprise-grade security standards'
    }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="bg-muted/30 border border-border rounded-xl p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="ShieldCheck" size={24} color="var(--color-primary)" />
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Enterprise Security & Compliance
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {badges?.map((badge, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4 bg-card rounded-lg border border-border transition-smooth hover:shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                <Icon name={badge?.icon} size={24} color="var(--color-primary)" />
              </div>
              <h4 className="text-sm font-caption font-semibold text-foreground mb-1">
                {badge?.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {badge?.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs text-center text-muted-foreground leading-relaxed">
            Your personal information is encrypted and stored securely. We never share your data with third parties without your explicit consent.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;