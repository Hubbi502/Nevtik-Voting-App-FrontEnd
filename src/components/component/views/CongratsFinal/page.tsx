"use client";
import { useEffect, useState } from "react";
import CongratsPage from "../../layout/CongratsComp/page";
export default function CongratsFinal() {
  const [seconds, setSeconds] = useState(10);

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
        <CongratsPage />
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-red-500">
          <span className="text-9xl text-white font-bold">{seconds}</span>
        </div>
      )}
    </>
  );
}
