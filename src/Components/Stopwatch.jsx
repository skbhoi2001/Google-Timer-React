import { useEffect, useRef, useState } from "react";
import styles from "./Stopwatch.module.css";
function Stopwatch() {
  const [time, setTime] = useState(0);
  const [timerstart, setTimerstart] = useState(false);
  const timer = useRef(null);
  useEffect(
    (timer) => {
      if (timerstart) {
        timer = setInterval(() => {
          setTime((p) => p + 1);
        }, 10);
      } else if (!timerstart) {
        clearInterval(timer);
      }
      return () => {
        clearInterval(timer);
      };
    },
    [timerstart]
  );
  const handleStart = () => {
    setTimerstart(true);
  };
  const handleStop = () => {
    setTime(0);
    setTimerstart(false);
  };
  const handlePause = () => {
    setTimerstart(false);
  };
  return (
    <div>
      <h1>Stopwatch</h1>
      <div ref={timer} className={styles.timerDisplay}>
        <h2 style={{ marginRight: "10px", width: "100px" }}>
          Hour: {Math.floor(time / 360000) % 60}
        </h2>
        <h2 style={{ marginRight: "10px", width: "100px" }}>
          Min: {Math.floor(time / 6000) % 60}
        </h2>
        <h2 style={{ marginRight: "10px", width: "100px" }}>
          S: {Math.floor(time / 100) % 60}
          <small>s</small>{" "}
        </h2>
        <h2 style={{ marginLeft: "10px", width: "100px" }}>MS: {time % 100}</h2>
      </div>
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleStop}>Stop</button>
      </div>
    </div>
  );
}

export { Stopwatch };
