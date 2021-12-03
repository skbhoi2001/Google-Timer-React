import React, { useEffect, useImperativeHandle, useState } from "react";

function Timer() {
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hrs, setHrs] = useState(0);
  const [timeron, setTimeron] = useState(false);

  useEffect(() => {
    var idhr = null
    var idmin = null
    var idsec = null
    if (timeron) {
        idsec = setInterval(() => {
            setSec((prev) => prev - 1)
            if (sec === 0) {
                clearInterval(idsec);
            }
        }, 1000)
        if (sec === 0 && min !== 0) {
            clearInterval(idsec)
            idmin = setInterval(() => {
                setMin((prev) => prev - 1)
                if (min === 0) {
                    clearInterval(idmin);
                }
                else {
                    setSec(59);
                }
            }, 1000)
        }
        if (min === 0 && hrs !== 0) {
            idhr = setInterval(() => {
                setHrs((prev) => prev - 1)
                if (hrs === 0) {
                    clearInterval(idhr);
                }
                else {
                    setMin(59)
                }
            }, 1000)
        }
        if (hrs === 0) {
            clearInterval(idhr)
        }
        if (hrs === 0 && min === 0 && sec === 0) {
            clearInterval(idhr)
            clearInterval(idmin);
            clearInterval(idsec);
        }
    }
    else {
        clearInterval(idsec);
        clearInterval(idmin);
        clearInterval(idhr);
    }

    return () => {
        clearInterval(idsec);
        clearInterval(idmin);
        clearInterval(idhr);
    }

}, [hrs, min, sec, timeron])

  const handleStart = () => {
    setTimeron(true);
  };
  const handleStop = () => {
    setTimeron(false);
  };
  const handleReset = () => {
    setHrs(0);
    setMin(0);
    setSec(0);
    setTimeron(false);
  };
  return (
    <div>
      <h1>Timer</h1>
      <div>
        <input
          type="number"
          placeholder="00h"
          onChange={(e) => setHrs(parseInt(e.target.value))}
          value={hrs}
        />
        hr :
        <input
          type="number"
          placeholder="00m"
          onChange={(e) => setMin(parseInt(e.target.value))}
          value={min}
        />
        min :
        <input
          type="number"
          placeholder="00s"
          onChange={(e) => setSec(parseInt(e.target.value))}
          value={sec}
        />
        sec
      </div>
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default Timer;
