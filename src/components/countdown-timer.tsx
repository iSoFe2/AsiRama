import React from "react";
import { Card } from "@heroui/react";

interface TimeUnitProps {
  value: number;
  label: string;
}

function TimeUnit({ value, label }: TimeUnitProps) {
  return (
    <div className="flex flex-col items-center">
      <Card className="w-16 h-16 flex items-center justify-center bg-black/40 backdrop-blur-md border-white/10">
        <span className="text-2xl font-bold">{value}</span>
      </Card>
      <span className="text-xs mt-2 text-white/70">{label}</span>
    </div>
  );
}

interface CountdownTimerProps {
  className?: string;
}

export function CountdownTimer({ className = "" }: CountdownTimerProps) {
  // Set launch date to 30 days from now
  const launchDate = React.useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date;
  }, []);

  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +launchDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    // Calculate immediately
    calculateTimeLeft();
    
    // Then set up interval
    const timer = setInterval(calculateTimeLeft, 1000);
    
    // Clear interval on unmount
    return () => clearInterval(timer);
  }, [launchDate]);

  return (
    <div className={`flex gap-4 ${className}`}>
      <TimeUnit value={timeLeft.seconds} label="ثواني" />
      <TimeUnit value={timeLeft.minutes} label="دقائق" />
      <TimeUnit value={timeLeft.hours} label="ساعات" />
      <TimeUnit value={timeLeft.days} label="أيام" />
    </div>
  );
}