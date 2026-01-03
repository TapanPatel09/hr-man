import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = ({ userName }) => {
  const currentDate = new Date();
  const formattedDate = currentDate?.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const getGreeting = () => {
    const hour = currentDate?.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 md:p-8 lg:p-10 shadow-lg">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="User" size={28} color="white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-white mb-2">
              {getGreeting()}, {userName}!
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/90 font-caption flex items-center gap-2">
              <Icon name="Calendar" size={18} color="white" />
              <span>{formattedDate}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 md:px-5 md:py-4">
          <Icon name="Clock" size={20} color="white" />
          <div className="text-white">
            <p className="text-xs md:text-sm font-caption opacity-90">Current Time</p>
            <p className="text-base md:text-lg font-semibold">
              {currentDate?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;