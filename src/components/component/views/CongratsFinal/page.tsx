"use client";
import { useEffect, useState } from "react";
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import CongratsPage from "../../layout/CongratsComp/page";
export default function CongratsFinal() {
  const [seconds, setSeconds] = useState(10);
  const { width, height } = useWindowSize()

  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <>
      {seconds === 0 ? (
        <>
          <Confetti width={width} height={height} numberOfPieces={600} recycle={false} gravity={0.1} initialVelocityY={15} initialVelocityX={10} tweenDuration={2000} run={true} />
          <CongratsPage />
        </>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-red-500">
          <span className="text-9xl text-white font-bold">{seconds}</span>
        </div>
      )}
    </>
  );
}
