import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [countdown, setCountdown] = useState(0);
  const [deadline, setDeadline] = useState(null);

  useEffect(() => {
    let savedDeadline = localStorage.getItem("fearCountdownDeadline");
    if (!savedDeadline) {
      const newDeadline = Date.now() + 12 * 60 * 60 * 1000;
      localStorage.setItem("fearCountdownDeadline", newDeadline);
      savedDeadline = newDeadline;
    }
    setDeadline(Number(savedDeadline));

    const interval = setInterval(() => {
      const now = Date.now();
      let diff = Number(savedDeadline) - now;
      if (diff <= 0) {
        const newDeadline = Date.now() + 12 * 60 * 60 * 1000;
        localStorage.setItem("fearCountdownDeadline", newDeadline);
        setDeadline(newDeadline);
        diff = newDeadline - now;
      }
      setCountdown(diff > 0 ? diff : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (ms) => {
    if (ms <= 0) return { hours: "00", minutes: "00", seconds: "00" };
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return { hours, minutes, seconds };
  };

  const { hours, minutes, seconds } = formatCountdown(countdown);

  return (
    <div className='text-center'>
      <h5 className='text-white mb-3'>Promo akan berakhir dalam</h5>

      <div
        className='timer-container p-3 rounded-3'
        style={{ background: "rgba(255, 193, 7, 0.1)" }}
      >
        <div className='d-flex gap-2 justify-content-center'>
          <div className='d-flex align-items-center'>
            <div
              className='bg-warning text-dark fw-bold px-3 py-2 rounded'
              style={{ minWidth: "48px", fontSize: "24px" }}
            >
              {hours}
            </div>
          </div>
          <div className='d-flex align-items-center'>
            <span className='text-warning fw-bold' style={{ fontSize: "24px" }}>
              :
            </span>
          </div>
          <div className='d-flex align-items-center'>
            <div
              className='bg-warning text-dark fw-bold px-3 py-2 rounded'
              style={{ minWidth: "48px", fontSize: "24px" }}
            >
              {minutes}
            </div>
          </div>
          <div className='d-flex align-items-center'>
            <span className='text-warning fw-bold' style={{ fontSize: "24px" }}>
              :
            </span>
          </div>
          <div className='d-flex align-items-center'>
            <div
              className='bg-warning text-dark fw-bold px-3 py-2 rounded'
              style={{
                minWidth: "48px",
                fontSize: "24px",
                animation: "blink 1s steps(1) infinite",
              }}
            >
              {seconds}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 
          50% { opacity: 0.5; } 
        }
        .timer-container {
          background: rgba(255, 193, 7, 0.1);
          backdrop-filter: blur(5px);
        }
      `}</style>
    </div>
  );
};

export default CountdownTimer;
