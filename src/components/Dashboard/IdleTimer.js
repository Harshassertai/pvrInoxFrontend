import React, { useState, useEffect } from "react";

const useIdleTimer = (timeout = 900000) => {
  // 900000ms = 15 minutes
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timer;
    const resetTimer = () => {
      clearTimeout(timer);
      setIsIdle(false);
      timer = setTimeout(() => setIsIdle(true), timeout);
    };

    // Set up event listeners for various user actions
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("mousedown", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("touchstart", resetTimer);

    // Set initial timer
    resetTimer();

    return () => {
      // Clean up
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("mousedown", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
    };
  }, [timeout]); // Reset only if timeout changes

  return isIdle;
};
