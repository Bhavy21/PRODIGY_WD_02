import React, { useState, useEffect } from 'react';
import Buttons from './Buttons';

const StopWatch = () => {
  const [stopwatchData, setStopwatchData] = useState([
    { id: 0, name: "Timer 1", time: 0, isRunning: false, lap: [], time_started: 0, pause: [] },
  ]);
  const [selectedRow, setSelectedRow] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStopwatchData(stopwatchData.map((stopwatch) => {
        if (stopwatch.isRunning) {
          return { ...stopwatch, time: new Date() - stopwatch.time_started - stopwatch.pause.reduce((a, b) => a + b, 0) };
        }
        return stopwatch;
      }));
    }, 10);
    return () => clearInterval(interval);
  }, [stopwatchData]);

  const handleStart = (id) => {
    setStopwatchData(stopwatchData.map((stopwatch) => {
      if (stopwatch.id === id) {
        setHasStarted(true);
        return { ...stopwatch, isRunning: true, time_started: new Date() - stopwatch.time - stopwatch.pause.reduce((a, b) => a + b, 0) };
      }
      return stopwatch;
    }));
  };

  const handleStop = (id) => {
    setStopwatchData(stopwatchData.map((stopwatch) => {
      if (stopwatch.id === id) {
        return { ...stopwatch, isRunning: false, pause: [...stopwatch.pause, new Date() - stopwatch.time_started - stopwatch.pause.reduce((a, b) => a + b, 0)] };
      }
      return stopwatch;
    }));
  };

  const handleReset = (id) => {
    setHasStarted(false);
    setStopwatchData(stopwatchData.map((stopwatch) => {
      if (stopwatch.id === id) {
        return { ...stopwatch, time: 0, isRunning: false, lap: [], pause: [] };
      }
      return stopwatch;
    }));
  };

  const handleLap = (id) => {
    setStopwatchData(stopwatchData.map((stopwatch) => {
      if (stopwatch.id === id) {
        return { ...stopwatch, lap: [...stopwatch.lap, stopwatch.time] };
      }
      return stopwatch;
    }));
  };

  return (
    <div className="stopwatch-wrapper">
      <main className='container'>
        <div className='digit-container'>
          <div className='digits'>
            <p className='dig'>{stopwatchData[selectedRow]?.time > 0 ? new Date(stopwatchData[selectedRow]?.time).toISOString().slice(11, -1) : "00:00:00.000"}</p>
          </div>
        </div>
        <Buttons
          onStartClick={() => handleStart(stopwatchData[selectedRow].id)}
          onStopClick={() => handleStop(stopwatchData[selectedRow].id)}
          onResetClick={() => handleReset(stopwatchData[selectedRow].id)}
          onLapClick={() => handleLap(stopwatchData[selectedRow].id)}
          isRunning={stopwatchData[selectedRow]?.isRunning}
          hasStarted={hasStarted}
          time={stopwatchData[selectedRow]?.time}
        />
      </main>
      <aside className="laps-container">
        <p className='lap-label'>Laps</p>
        <div className='lap-container'>
          {stopwatchData[selectedRow]?.lap.length > 0 && stopwatchData[selectedRow]?.lap.map((lap, index) => (
            <div style={{ display: "flex", justifyContent: "space-between", width: "200px" }} key={index}>
              <p>Lap {index + 1}</p>
              <p className='lap-time-label'>{new Date(lap).toISOString().slice(11, -1)}</p>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default StopWatch;
