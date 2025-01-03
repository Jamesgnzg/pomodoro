import { Button } from "@/components/ui/button";
import { FC, ReactElement, useState, useEffect } from "react";
import { timeSettings } from "@/enums/time-settings";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const Counter: FC = (): ReactElement => {
  const { POMODORO, SHORT_BREAK, LONG_BREAK } = timeSettings;
  const [timerRunning, setTimer] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(POMODORO.time);
  const [workStatus, setWorkStatus] = useState<string>(POMODORO.label);

  const setTime = (time: number): void => {
    setTimeRemaining(time);
  };

  const completeTimer = (): void => {
    if (workStatus == POMODORO.label) {
      setTimeRemaining(SHORT_BREAK.time);
      setWorkStatus(SHORT_BREAK.label);
    } else {
      setTimeRemaining(POMODORO.time);
      setWorkStatus(POMODORO.label);
    }

    setTimer(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((time) => {
        if (time === 0) {
          clearInterval(timer);
          setTimer(false);
          return 0;
        } else {
          return time - 1;
        }
      });
    }, 1000);

    if (timerRunning) {
      // return clean up function
      return () => clearInterval(timer);
    } else {
      // pause the timer
      clearInterval(timer);
    }
  }, [timerRunning, timeRemaining]);

  return (
    <>
      <div className="block border border-gray-200 max-w-full p-6 rounded-lg">
        <div className="flex flex-row justify-center gap-5">
          <ToggleGroup
            type="single"
            value={workStatus}
            onValueChange={(value) => {
              if (value) setWorkStatus(value);
            }}
            defaultValue={POMODORO.label}
          >
            <ToggleGroupItem
              className="text-lg"
              onClick={() => setTime(POMODORO.time)}
              value={POMODORO.label}
            >
              {POMODORO.label}
            </ToggleGroupItem>
            <ToggleGroupItem
              className="text-lg"
              onClick={() => setTime(SHORT_BREAK.time)}
              value={SHORT_BREAK.label}
            >
              {SHORT_BREAK.label}
            </ToggleGroupItem>
            <ToggleGroupItem
              className="text-lg"
              onClick={() => setTime(LONG_BREAK.time)}
              value={LONG_BREAK.label}
            >
              {LONG_BREAK.label}
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="text-center mt-5">
          <p className="text-9xl">
            {`${Math.floor(timeRemaining / 60)}`.padStart(2, "0")}:
            {`${timeRemaining % 60}`.padStart(2, "0")}
          </p>
          {timerRunning ? (
            <div>
              <Button
                variant="secondary"
                className="mt-10 min-w-52 min-h-16 text-4xl"
                onClick={() => setTimer(false)}
              >
                PAUSE
              </Button>
              <Button
                variant="secondary"
                className="ml-5 mt-10 min-w-52 min-h-16 text-4xl"
                onClick={() => completeTimer()}
              >
                STOP
              </Button>
            </div>
          ) : (
            <Button
              variant="secondary"
              className="mt-10 min-w-52 min-h-16 text-4xl"
              onClick={() => setTimer(true)}
            >
              START
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Counter;
