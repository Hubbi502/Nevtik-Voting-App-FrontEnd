'use client';

import { useEffect, useState } from 'react';

type CountdownProps = {
  targetDate: string; // e.g., '2025-05-01T00:00:00'
};

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [hasMounted, setHasMounted] = useState(false);

  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setHasMounted(true); // safe: only render countdown after mount

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!hasMounted) return null; // 🧠 render kosong dulu sampe ready

  return (
    <div className="text-center flex gap-4">
      <h2 className="text-xl font-bold mb-2">Voting End in:</h2>
      <div className="flex mx-2 justify-center text-lg">
        <div className="px-1">{timeLeft.days}d</div>
        <div className="px-1">{timeLeft.hours}h</div>
        <div className="px-1">{timeLeft.minutes}m</div>
        <div className="px-1">{timeLeft.seconds}s</div>
      </div>
    </div>
  );
};

export default Countdown;
