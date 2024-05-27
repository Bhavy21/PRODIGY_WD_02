import React from 'react';

const Buttons = ({ onStartClick, onStopClick, onResetClick, onLapClick, isRunning, hasStarted, time }) => {
  return (
    <div className="buttons">
      <button onClick={onStartClick}>
        {isRunning ? "Resume" : hasStarted ? "Resume" : "Start"}
      </button>
      {hasStarted && <button onClick={onStopClick}>Pause</button>}
      <button onClick={onResetClick}>Reset</button>
      <button onClick={onLapClick} disabled={time === 0}>Lap</button>
    </div>
  );
};

export default Buttons;
