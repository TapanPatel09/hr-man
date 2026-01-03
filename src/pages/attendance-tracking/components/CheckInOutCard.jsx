import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CheckInOutCard = ({ onCheckIn, onCheckOut, todayStatus }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(todayStatus?.checkIn ? true : false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setIsCheckedIn(todayStatus?.checkIn ? true : false);
  }, [todayStatus]);

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleCheckIn = () => {
    onCheckIn();
    setIsCheckedIn(true);
  };

  const handleCheckOut = () => {
    onCheckOut();
    setIsCheckedIn(false);
  };

  return (
    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6 md:p-8">
      <div className="flex items-start justify-between mb-6 md:mb-8">
        <div>
          <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-2">
            Today's Attendance
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">
            {formatDate(currentTime)}
          </p>
        </div>
        <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/20 rounded-lg flex items-center justify-center">
          <Icon name="Clock" size={28} color="var(--color-primary)" />
        </div>
      </div>
      <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 md:p-6 mb-6 md:mb-8">
        <div className="text-center">
          <p className="text-sm md:text-base font-caption text-muted-foreground mb-2">Current Time</p>
          <p className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary">
            {formatTime(currentTime)}
          </p>
        </div>
      </div>
      {todayStatus && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 md:mb-8">
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                <Icon name="LogIn" size={18} color="var(--color-success)" />
              </div>
              <span className="text-sm font-caption text-muted-foreground">Check In</span>
            </div>
            <p className="text-lg md:text-xl font-semibold text-foreground">
              {todayStatus?.checkIn || '--:--'}
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-error/20 rounded-lg flex items-center justify-center">
                <Icon name="LogOut" size={18} color="var(--color-error)" />
              </div>
              <span className="text-sm font-caption text-muted-foreground">Check Out</span>
            </div>
            <p className="text-lg md:text-xl font-semibold text-foreground">
              {todayStatus?.checkOut || '--:--'}
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        {!isCheckedIn ? (
          <Button
            variant="default"
            size="lg"
            fullWidth
            onClick={handleCheckIn}
            iconName="LogIn"
            iconPosition="left"
            className="flex-1"
          >
            Check In
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              size="lg"
              fullWidth
              disabled
              iconName="CheckCircle"
              iconPosition="left"
              className="flex-1"
            >
              Checked In
            </Button>
            <Button
              variant="destructive"
              size="lg"
              fullWidth
              onClick={handleCheckOut}
              iconName="LogOut"
              iconPosition="left"
              className="flex-1"
            >
              Check Out
            </Button>
          </>
        )}
      </div>
      {todayStatus?.status && (
        <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border/50">
          <div className="flex items-center justify-between">
            <span className="text-sm font-caption text-muted-foreground">Today's Status</span>
            <div className={`px-3 py-1.5 rounded-md text-sm font-medium ${
              todayStatus?.status === 'Present' ? 'bg-success/20 text-success' :
              todayStatus?.status === 'Absent' ? 'bg-error/20 text-error' :
              todayStatus?.status === 'Half-day'? 'bg-warning/20 text-warning' : 'bg-primary/20 text-primary'
            }`}>
              {todayStatus?.status}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckInOutCard;